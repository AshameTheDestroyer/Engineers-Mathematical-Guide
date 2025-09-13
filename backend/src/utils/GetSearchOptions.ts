import { Request } from "express";
import { FilterQuery } from "mongoose";

export function GetSearchOptions<T>(
    request: Request,
    indexes: Array<{ weights?: Record<string, any> }>
) {
    const search = request.query["search"] as string;
    const _case = request.query["case"] as "sensitive" | "insensitive";

    if (search == null) {
        return {};
    }

    return indexes
        .filter((index) => index.weights != null)
        .reduce(
            (accumulator, index) => ({
                ...accumulator,
                $or: Object.keys(index.weights!).map(
                    (key) =>
                        ({
                            [key]: {
                                $regex: new RegExp(
                                    search,
                                    _case == "sensitive" ? "" : "i"
                                ),
                            },
                        } as FilterQuery<T>)
                ),
            }),
            {} as FilterQuery<T>
        );
}
