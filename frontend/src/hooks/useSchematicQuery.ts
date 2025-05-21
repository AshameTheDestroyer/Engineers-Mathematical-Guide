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
    TParseFnData = undefined,
    TQueryFnData = unknown,
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

export const useSchematicQuery = <
    TUsesSuspense extends boolean = false,
    TSchema extends FieldValues = Record<string, any>,
    TParseFnData = undefined,
    TQueryFnData = unknown,
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

    const data =
        options.parseFn?.(_data, options.schema) ?? options.schema.parse(_data);

    return { data, ...query } as any;
};
