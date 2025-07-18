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
    TParseFnData = undefined,
    TUsesSuspense extends boolean = false,
    TError = Error,
> = UseExtendedQueryResult<
    TUsesSuspense,
    Exclude<
        TParseFnData extends undefined
            ? TSchema
            : Exclude<TParseFnData, undefined>,
        TParseFnData extends undefined
            ? never
            : TSchema extends TParseFnData
              ? never
              : TSchema
    >,
    TError
>;

export type UseSchematicQueryOptions<
    TUsesSuspense extends boolean = false,
    TSchema extends FieldValues = Record<string, any>,
    TParseFnData = TSchema,
    TQueryFnData = TParseFnData,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = readonly unknown[],
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
};

export type InheritableQueryOptions<
    TUsesSuspense extends boolean = false,
    TSchema extends FieldValues = Record<string, any>,
    TParseFnData = TSchema,
    TQueryFnData = TParseFnData,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = readonly unknown[],
> = Omit<
    UseSchematicQueryOptions<
        TUsesSuspense,
        TSchema,
        TParseFnData,
        TQueryFnData,
        TError,
        TData,
        TQueryKey
    >,
    "schema" | "queryFn" | "parseFn" | "queryKey"
> & {
    queryKey?: QueryKey;
};

export const useSchematicQuery = <
    TUsesSuspense extends boolean = false,
    TSchema extends FieldValues = Record<string, any>,
    TParseFnData = TSchema,
    TQueryFnData = TParseFnData,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = readonly unknown[],
>(
    options: UseSchematicQueryOptions<
        TUsesSuspense,
        TSchema,
        TParseFnData,
        TQueryFnData,
        TError,
        TData,
        TQueryKey
    >,
    queryClient?: QueryClient
): UseSchematicQueryResult<TSchema, TParseFnData, TUsesSuspense, TError> => {
    const { data: _data, ...query } = useExtendedQuery(options, queryClient);

    const data = (() => {
        if (!options.usesSuspense && query.isLoading && _data == null) {
            return _data;
        }

        if (options.parseFn != null) {
            return options.parseFn?.(_data, options.schema);
        }

        if (_data != null) {
            return options.schema.parse(_data);
        }

        return null;
    })();

    return { data, ...query } as any;
};
