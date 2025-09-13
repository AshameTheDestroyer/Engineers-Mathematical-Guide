import { Model } from "mongoose";
import { RequestHandler } from "express";

export function PostDocument<T>(model: Model<T>): RequestHandler {
    return async (request, response) => {
        try {
            const document = await new model(request.body).save();
            return response.status(201).send(document);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    };
}
