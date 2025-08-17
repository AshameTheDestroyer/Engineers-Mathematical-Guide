import { z } from "zod";
import { useDebounce } from "./useDebounce";
import { useEffect, useState } from "react";
import { useSchematicQueryParams } from "./useSchematicQueryParams";
import { SearchQueryParamsSchema } from "@/schemas/SearchQueryParamsSchema";

export const useSchematicSearch = <
    T extends { query: string },
    TZodObject extends { query: z.ZodDefault<z.ZodOptional<z.ZodString>> },
>(
    schema?: z.ZodObject<
        TZodObject,
        z.UnknownKeysParam,
        z.ZodTypeAny,
        T,
        Partial<T>
    >
) => {
    const { queryParams, setQueryParams } = useSchematicQueryParams<TZodObject>(
        (schema ?? SearchQueryParamsSchema) as any
    );

    const [searchQuery, setSearchQuery] = useState<string>(queryParams.query!);
    const debouncedSearchQuery = useDebounce(searchQuery);

    useEffect(() => {
        setQueryParams((queryParams) => ({
            ...queryParams,
            query: debouncedSearchQuery.trimAll(),
        }));
    }, [debouncedSearchQuery]);

    return {
        searchQuery,
        queryParams,
        setSearchQuery,
        setQueryParams,
        debouncedSearchQuery,
    };
};
