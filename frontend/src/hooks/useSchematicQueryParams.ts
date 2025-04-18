import { z } from "zod";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useSchematicQueryParams = <T extends z.ZodRawShape>(
    schema: z.ZodObject<T>
) => {
    const location = useLocation();
    const Navigate = useNavigate();
    const [searchParams, _setSearchParams] = useSearchParams();
    const {
        error,
        success,
        data: queryParams,
    } = schema.safeParse(
        Object.keys(schema._def.shape()).reduce(
            (accumulator, key) => ({
                ...accumulator,
                [key]: searchParams.get(key),
            }),
            {}
        )
    );

    function setQueryParams<U extends z.infer<z.ZodObject<T>>>(
        predicate: (data?: U) => U
    ) {
        const data = predicate(queryParams as U | undefined);
        Navigate(
            location.pathname +
                "?" +
                new URLSearchParams(data as unknown as Record<string, string>),
            { replace: true }
        );
    }

    return { queryParams, error, success, setQueryParams };
};
