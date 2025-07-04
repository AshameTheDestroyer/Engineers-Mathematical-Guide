import { z } from "zod";
import { useEffect, useMemo } from "react";
import { ZodGetDefaults } from "@/functions/Zod.GetDefaults";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export type UseSchematicQueryParamsResult<
    T extends z.ZodRawShape,
    TSafe extends boolean = false,
> = (TSafe extends false
    ? { queryParams: z.infer<z.ZodObject<T>> }
    : {
          queryParams: z.infer<z.ZodObject<T>> | undefined;
          error: z.ZodError<T>;
          success: boolean;
      }) & {
    setQueryParams: <U extends z.infer<z.ZodObject<T>>>(
        predicate: (data: TSafe extends false ? U : U | undefined) => U
    ) => void;
};

export const useSchematicQueryParams = <
    T extends z.ZodRawShape,
    TSafe extends boolean = false,
>(
    schema: z.ZodObject<T>,
    options?: {
        safeParse?: TSafe;
    }
): UseSchematicQueryParamsResult<T, TSafe> => {
    const location = useLocation();
    const Navigate = useNavigate();

    const defaults = ZodGetDefaults(schema);
    const [searchParams, _setSearchParams] = useSearchParams();

    const {
        error,
        success,
        data: queryParams,
    } = useMemo(() => {
        const queryParams = Object.keys(schema._def.shape()).reduce(
            (accumulator, key) => ({
                ...accumulator,
                [key]: searchParams.get(key) ?? defaults[key],
            }),
            {}
        );

        if (options?.safeParse) {
            return schema.safeParse(queryParams);
        }

        const data = schema.parse(queryParams);
        return { data, error: undefined, success: true };
    }, [searchParams, schema, options]);

    useEffect(() => {
        setQueryParams((queryParams) => ({
            ...defaults,
            ...(queryParams ?? {}),
        }));
    }, []);

    function setQueryParams<U extends z.infer<z.ZodObject<T>>>(
        predicate: (data: TSafe extends false ? U : U | undefined) => U
    ) {
        const data = predicate(queryParams as any);
        Navigate(location.pathname + "?" + new URLSearchParams(data), {
            replace: true,
        });
    }

    return { queryParams, error, success, setQueryParams } as any;
};
