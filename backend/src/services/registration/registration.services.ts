import Jwt from "jsonwebtoken";
import { Handler } from "express";
import { RoleEnum, UserModel } from "../user";
import { LoginSchema } from "./schemas/login.schema";
import { SignupSchema } from "./schemas/signup.schema";
import { CheckPassword, HashPassword } from "src/utils";

export const Signup: Handler = async (request, response) => {
    try {
        const payload = SignupSchema.parse(request.body);
        const userByEmail = await UserModel.findOne({ email: payload.email });
        if (userByEmail != null) {
            return response
                .status(400)
                .send({ message: "Email is already taken." });
        }

        const userByUsername = await UserModel.findOne({
            username: payload.username,
        });
        if (userByUsername != null) {
            return response
                .status(400)
                .send({ message: "Username is already taken." });
        }

        const hashedPassword = await HashPassword(payload.password);
        await new UserModel({
            ...payload,
            role: RoleEnum.user,
            password: hashedPassword,
        }).save();

        return response.status(201).send({
            message: "User has signed up successfully.",
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const Login: Handler = async (request, response) => {
    try {
        const payload = LoginSchema.parse(request.body);
        const user = await UserModel.findOne({ email: payload.email });
        if (user == null) {
            return response
                .status(401)
                .send({ message: "Email isn't registered." });
        }

        const isPasswordCorrect = await CheckPassword(
            payload.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return response.status(401).send({
                message: "Password is incorrect.",
            });
        }

        user._loginToken = Jwt.sign(
            { userID: user._id },
            process.env["JWT_KEY"]!
        );

        await user.save();
        return response.send({ token: user._loginToken });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const Logout: Handler = async (request, response) => {
    try {
        const _request = request as typeof request & { userID: string };
        const user = await UserModel.findById(_request.userID);

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
