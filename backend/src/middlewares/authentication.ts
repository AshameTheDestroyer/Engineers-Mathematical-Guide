import { RequestHandler } from "express";
import { UserModel } from "../services/user";
import Jwt, { JwtPayload } from "jsonwebtoken";

export const ValidateAuthenticity: RequestHandler = async (
    request,
    response,
    next
) => {
    if (request.headers.authorization == null) {
        response.status(401).send({ message: "User is unauthenticated." });
        return;
    }

    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = Jwt.verify(token, process.env["JWT_KEY"]!);

        const _request = request as typeof request & { userID: string };
        const _payload = payload as (JwtPayload | string) & { userID: string };

        _request["userID"] = _payload["userID"];

        const user = await UserModel.findById(_payload["userID"]);
        if (user == null) {
            return response.status(404).send({ message: "User isn't found." });
        }
        if (user._loginToken == null || user._loginToken != token) {
            return response.status(401).send({ message: "Token isn't valid." });
        }

        next();
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};
