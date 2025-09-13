import { Model } from "mongoose";
import { RequestHandlerWithID } from "../types";

export function GetDocumentByID<T>(
    model: Model<T>,
    ...fields: Array<`${"" | "+" | "-"}${Exclude<keyof T, symbol>}`>
): RequestHandlerWithID {
    return async (request, response) => {
        try {
            const document = await model
                .findById(request.params.id)
                .select(fields);

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
