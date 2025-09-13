import crypto from "crypto";
import Jwt from "jsonwebtoken";
import { UserModel } from "../users";
import { RequestHandler } from "express";
import { CheckPassword, HashPassword } from "../../utils";

export const EmendUserBody = (
    body: Record<string, any>,
    hashedPassword?: string
) => ({
    ...body,
    password: hashedPassword,
    role: Boolean(process.env["ALLOW_ROLE_KEY"]) ? body["role"] : undefined,

    _loginToken: undefined,
    _resetToken: undefined,
    _resetTokenExpirationDate: undefined,
});

export const Signup: RequestHandler = async (request, response) => {
    try {
        const user = await UserModel.findOne({ email: request.body["email"] });
        if (user != null) {
            return response
                .status(400)
                .send({ message: "Email is already taken." });
        }

        const hashedPassword = await HashPassword(request.body["password"]);
        await new UserModel(EmendUserBody(request.body, hashedPassword)).save();

        return response.status(201).send({
            message: "User has signed up successfully.",
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const Login: RequestHandler = async (request, response) => {
    try {
        const user = await UserModel.findOne({ email: request.body["email"] });
        if (user == null) {
            return response
                .status(401)
                .send({ message: "Email isn't registered." });
        }

        const isPasswordCorrect = await CheckPassword(
            request.body["password"],
            user.password
        );

        if (!isPasswordCorrect) {
            return response.status(401).send({
                message: `Password is incorrect.`,
            });
        }

        const token = (user._loginToken = Jwt.sign(
            { userID: user._id },
            process.env["JWT_KEY"]!
        ));

        await user.save();
        return response.send({ token });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const Logout: RequestHandler = async (request, response) => {
    try {
        const _request = request as typeof request & { userID: string };
        const user = await UserModel.findById(_request["userID"]);

        if (user == null) {
            return response.status(404).send({ message: "User isn't found." });
        }

        user._loginToken = undefined;
        await user.save();

        return response.status(201).send({
            message: "User has logged out successfully.",
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send(error);
    }
};

export const ForgotPassword: (
    resetTokenExpirationTime: number,
    OnGenerateResetToken: (props: { email: string; resetToken: string }) => void
) => RequestHandler = (resetTokenExpirationTime, OnGenerateResetToken) => {
    return async (request, response) => {
        try {
            const user = await UserModel.findOne({
                email: request.body["email"],
            });
            if (user == null) {
                return response
                    .status(401)
                    .send({ message: "Email isn't registered." });
            }

            const resetToken = crypto.randomBytes(20).toString("hex");

            OnGenerateResetToken({ email: user.email, resetToken });

            user._resetToken = resetToken;
            user._resetTokenExpirationDate =
                Date.now() + resetTokenExpirationTime;

            await user.save();
            return response.send({
                message: "Password reset token has been sent.",
            });
        } catch (error) {
            console.error(error);
            return response.status(500).send(error);
        }
    };
};

export const ResetPassword: RequestHandler = async (request, response) => {
    try {
        const user = await UserModel.findOne({
            _resetToken: request.body["reset-token"],
            _resetTokenExpirationDate: { $gt: Date.now() },
        });

        if (user == null) {
            return response
                .status(401)
                .send({ message: "Reset token is either invalid or expired." });
        }

        const hashedPassword = await HashPassword(request.body["password"]);

        user.password = hashedPassword;
        user._resetToken = undefined;
        user._resetTokenExpirationDate = undefined;

        await user.save();
        return response.send({
            message: "Password has been reset successfully.",
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send(error);
    }
};
