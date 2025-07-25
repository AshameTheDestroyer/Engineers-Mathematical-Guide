import { ZodSchema } from "zod";
import { FieldValues } from "react-hook-form";
import { QueryClient, QueryKey } from "@tanstack/react-query";
import {
    useExtendedQuery,
    UseExtendedQueryResult,
    UseExtendedQueryOptions,
} from "./useExtendedQuery";

export type UseSchematicQueryResult<
    TSchema extends FieldValues,
    TParseFnData = TSchema,
    TTransformFnData = TParseFnData,
    TUsesSuspense extends boolean = false,
    TError = Error,
> = UseExtendedQueryResult<TUsesSuspense, TTransformFnData, TError>;

export type UseSchematicQueryOptions<
    TUsesSuspense extends boolean = false,
    TSchema extends FieldValues = Record<string, any>,
    TParseFnData = TSchema,
    TQueryFnData = TParseFnData,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TTransformFnData = TParseFnData,
> = UseExtendedQueryOptions<
    TUsesSuspense,
    TQueryFnData,
    TError,
    TData,
    TQueryKey
> & {
    schema: ZodSchema<TSchema>;
    parseFn?: (
        data: TData | undefined,
        schema: ZodSchema<TSchema>
    ) => TParseFnData;
    transform?: (data: TParseFnData) => TTransformFnData;
};

export type InheritableQueryOptions<
    TUsesSuspense extends boolean = false,
    TSchema extends FieldValues = Record<string, any>,
    TParseFnData = TSchema,
    TTransformFnData = TParseFnData,
    TQueryFnData = TParseFnData,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
> = Omit<
    UseSchematicQueryOptions<
        TUsesSuspense,
        TSchema,
        TParseFnData,
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TTransformFnData
    >,
    "schema" | "queryFn" | "parseFn" | "queryKey" | "select"
> & {
    queryKey?: QueryKey;
};

export const useSchematicQuery = <
    TUsesSuspense extends boolean = false,
    TSchema extends FieldValues = Record<string, any>,
    TParseFnData = TSchema,
    TTransformFnData = TParseFnData,
    TQueryFnData = TParseFnData,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    options: UseSchematicQueryOptions<
        TUsesSuspense,
        TSchema,
        TParseFnData,
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TTransformFnData
    >,
    queryClient?: QueryClient
): UseSchematicQueryResult<
    TSchema,
    TParseFnData,
    TTransformFnData,
    TUsesSuspense,
    TError
> => {
    const { data: _data, ...query } = useExtendedQuery<
        TUsesSuspense,
        TQueryFnData,
        TError,
        TData,
        TQueryKey
    >(options, queryClient);

    const data = (() => {
        if (!options.usesSuspense && query.isLoading && _data == null) {
            return _data;
        }

        let parsed;

        if (options.parseFn != null) {
            parsed = options.parseFn(_data, options.schema);
        } else if (_data != null) {
            parsed = options.schema.parse(_data) as any;
        } else {
            parsed = null as unknown as TParseFnData;
        }

        return options.transform != null ? options.transform(parsed) : parsed;
    })();

    return {
        data,
        ...query,
    } as any;
};
