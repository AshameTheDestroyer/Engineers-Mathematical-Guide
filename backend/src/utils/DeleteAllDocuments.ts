import { Model } from "mongoose";
import { RequestHandler } from "express";

export function DeleteAllDocuments<T>(model: Model<T>): RequestHandler {
    return async (_request, response) => {
        try {
            const result = await model.deleteMany();
            return response.send({
                message:
                    result.deletedCount +
                    ` ${model.modelName.toLowerCase()}(s) has been deleted successfully.`,
            });
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    };
}
