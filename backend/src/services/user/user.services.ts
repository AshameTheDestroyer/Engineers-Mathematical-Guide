import { Handler } from "express";
import { connection } from "mongoose";
import { UserModel } from "./user.model";
import { PostFile } from "src/utils/PostFile";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { DeleteFileByID } from "src/utils/DeleteFileByID";

export const GetMyUser: Handler = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = Jwt.verify(token, process.env["JWT_KEY"]!);

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        const user = await UserModel.findById(_payload["userID"]).select([
            "-password",
            "-_loginToken",
            "-_resetToken",
            "-_resetTokenExpirationDate",
        ]);

        if (user == null) {
            return response.status(404).json({ message: "User isn't found." });
        }

        return response.json(user);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const PatchMyUser: Handler = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = Jwt.verify(token, process.env["JWT_KEY"]!);

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        const user = await UserModel.findByIdAndUpdate(
            _payload["userID"],
            request.body,
            {
                new: true,
                runValidators: true,
            }
        ).select([
            "-password",
            "-_loginToken",
            "-_resetToken",
            "-_resetTokenExpirationDate",
        ]);

        if (user == null) {
            return response.status(404).json({ message: "User isn't found." });
        }

        return response.json(user);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const PatchMyUserAvatar: Handler = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = Jwt.verify(token, process.env["JWT_KEY"]!);

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        const user = await UserModel.findById(_payload["userID"]);

        if (user == null) {
            return response.status(404).json({ message: "User isn't found." });
        }

        if (request.file == null) {
            return response
                .status(400)
                .json({ message: "No file was uploaded." });
        }

        const { avatar } = user;
        if (avatar != null) {
            await DeleteFileByID(avatar, connection.db, {
                suppressError: true,
            });
        }

        const { fileID } = await PostFile(request.file, connection.db);

        user.avatar = fileID;
        await user.save();

        response
            .status(201)
            .json({ message: "User's avatar has been successfully updated." });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const DeleteMyUserAvatar: Handler = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = Jwt.verify(token, process.env["JWT_KEY"]!);

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        const user = await UserModel.findById(_payload["userID"]);

        if (user == null) {
            return response.status(404).json({ message: "User isn't found." });
        }

        const { avatar } = user;
        if (avatar == null) {
            return response
                .status(400)
                .json({ message: "User has no avatar." });
        }

        return await DeleteFileByID(avatar, connection.db)
            .then(async () => {
                user.avatar = undefined;
                await user.save();

                return response
                    .status(204)
                    .send({ message: "Avatar has been deleted." });
            })
            .catch(
                (error) => (
                    console.log(error),
                    response
                        .status(404)
                        .send({ message: "Avatar isn't found." })
                )
            );
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};
