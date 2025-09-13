import { Model } from "mongoose";
import { RequestHandlerWithID } from "../types/index";

export function DeleteDocumentByID<T>(model: Model<T>): RequestHandlerWithID {
    return async (request, response) => {
        try {
            const document = await model.findByIdAndDelete(request.params.id);
            if (document == null) {
                return response
                    .status(404)
                    .send({ message: `${model.modelName} isn't found.` });
            }

            return response.send({
                message: `${model.modelName} has been deleted successfully.`,
            });
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    };
}
