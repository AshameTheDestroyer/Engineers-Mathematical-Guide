import { Request } from "express";
import { QueryOptions } from "mongoose";

export const QUERY_LIMIT = 20;
export const MAXIMUM_QUERY_LIMIT = 100;

export function GetPaginationOptions(request: Request): QueryOptions {
    const limit = Math.min(
        parseInt((request.query["limit"] ?? QUERY_LIMIT) as string),
        MAXIMUM_QUERY_LIMIT
    );
    const page = parseInt((request.query["page"] ?? "1") as string);
    const skip = (page - 1) * limit;

    return { skip, limit };
}
