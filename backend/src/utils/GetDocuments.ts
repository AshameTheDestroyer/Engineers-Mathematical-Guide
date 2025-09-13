import { Model } from "mongoose";
import { RequestHandler } from "express";
import { GetSortOptions } from "./GetSortOptions";
import { GetSearchOptions } from "./GetSearchOptions";
import { GetPaginationOptions } from "./GetPaginationOptions";

export function GetDocuments<T>(
    model: Model<T>,
    ...fields: Array<`${"" | "+" | "-"}${Exclude<keyof T, symbol>}`>
): RequestHandler {
    return async (request, response) => {
        try {
            const indexes = await model.listIndexes();
            const documents = await model
                .find(
                    GetSearchOptions(request, indexes),
                    {},
                    GetPaginationOptions(request)
                )
                .select(fields)
                .sort(GetSortOptions(request));

            const totalCount = await model.countDocuments();
            return response.send({ totalCount, data: documents });
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    };
}
