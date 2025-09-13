import { Request } from "express";

export function GetSortOptions(
    request: Request
): Record<string, "asc" | "desc"> | undefined {
    const sortby = request.query["sortby"] as string;
    const order = request.query["order"] as "asc" | "desc";

    return {
        [sortby ?? "createdAt"]: order ?? "asc",
    };
}
