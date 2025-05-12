import {
    useExtendedQuery,
    UseExtendedQueryResult,
    UseExtendedQueryOptions,
} from "./useExtendedQuery";
import { ZodSchema } from "zod";
import { FieldValues } from "react-hook-form";
import { QueryClient, QueryKey } from "@tanstack/react-query";

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
    TSchema extends FieldValues,
    TParseFnData = undefined,
    TUsesSuspense extends boolean = false,
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
    TSchema extends FieldValues,
    TParseFnData = undefined,
    TUsesSuspense extends boolean = false,
    TQueryFnData = unknown,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = readonly unknown[],
>(
    options: UseSchematicQueryOptions<
        TSchema,
        TParseFnData,
        TUsesSuspense,
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
