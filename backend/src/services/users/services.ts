import { UserModel } from "./schema";
import { RequestHandler } from "express";
import { EmendUserBody } from "../../services/authentication";
import {
    GetDocuments,
    GetDocumentByID,
    DeleteDocumentByID,
    DeleteAllDocuments,
} from "../../utils";

export const GetMyUser: RequestHandler = async (request, response) => {
    try {
        const _request = request as typeof request & { userID: string };
        const user = await UserModel.findById(_request["userID"]).select([
            "-password",
            "-_loginToken",
            "-_resetToken",
            "-_resetTokenExpirationDate",
        ]);

        if (user == null) {
            return response.status(404).send({ message: "User isn't found." });
        }

        return response.send(user);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const GetUsers = GetDocuments(
    UserModel,
    "-password",
    "-_loginToken",
    "-_resetToken",
    "-_resetTokenExpirationDate"
);
export const GetUserByID = GetDocumentByID(
    UserModel,
    "-password",
    "-_loginToken",
    "-_resetToken",
    "-_resetTokenExpirationDate"
);

export const PatchMyUser: RequestHandler = async (request, response) => {
    try {
        const _request = request as typeof request & { userID: string };
        const user = await UserModel.findByIdAndUpdate(
            _request["userID"],
            { ...EmendUserBody(request.body), email: undefined },
            { new: true }
        ).select([
            "-password",
            "-_loginToken",
            "-_resetToken",
            "-_resetTokenExpirationDate",
        ]);

        if (user == null) {
            return response.status(404).send({ message: "User isn't found." });
        }

        return response.send(user);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const DeleteMyUser: RequestHandler = async (request, response) => {
    try {
        const _request = request as typeof request & { userID: string };
        const user = await UserModel.findByIdAndDelete(_request["userID"]);

        if (user == null) {
            return response.status(404).send({ message: "User isn't found." });
        }

        return response.send({
            message: "Your user has been deleted successfully.",
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const DeleteAllUsers = DeleteAllDocuments(UserModel);
export const DeleteUserByID = DeleteDocumentByID(UserModel);
