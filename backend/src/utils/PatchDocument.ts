import { Model } from "mongoose";
import { RequestHandlerWithID } from "../types";

export function PatchDocument<T>(model: Model<T>): RequestHandlerWithID {
    return async (request, response) => {
        try {
            const document = await model.findByIdAndUpdate(
                request.params.id,
                request.body,
                { new: true }
            );

            if (document == null) {
                return response
                    .status(404)
                    .send({ message: `${model.modelName} isn't found.` });
            }

            return response.send(document);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    };
}
