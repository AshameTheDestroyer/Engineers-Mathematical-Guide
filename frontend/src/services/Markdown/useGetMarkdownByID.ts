import { QueryClient } from "@tanstack/react-query";
import { MarkdownDTO, MarkdownSchema } from "@/schemas/MarkdownSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

export const GET_MARKDOWN_BY_ID_KEY = "get-markdown-by-id";

export const useGetMarkdownByID = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<MarkdownDTO>,
>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        any,
        Array<MarkdownDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<TUsesSuspense, any, Array<MarkdownDTO>, TTransformFnData>(
        {
            schema: MarkdownSchema,
            queryFn: async () => {
                const response = await fetch(`data/lessons/reading/${id}.json`);
                try {
                    return await response.json();
                } catch {
                    return [];
                }
            },
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [
                GET_MARKDOWN_BY_ID_KEY,
                id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
