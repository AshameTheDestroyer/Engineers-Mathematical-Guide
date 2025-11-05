import { z } from "zod";

export const SearchQueryParamsSchema = z.object({
    query: z.string("required").optional().default(""),
});

export type SearchQueryParamsDTO = z.infer<typeof SearchQueryParamsSchema>;
