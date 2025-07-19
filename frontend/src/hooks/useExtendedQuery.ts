import {
    useQuery,
    QueryKey,
    QueryClient,
    QueryFunction,
    UseQueryResult,
    UseQueryOptions,
    useSuspenseQuery,
    UseSuspenseQueryResult,
    UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export type UseExtendedQueryResult<
    TUsesSuspense extends boolean = false,
    TData = unknown,
    TError = Error,
> = TUsesSuspense extends true
    ? UseSuspenseQueryResult<TData, TError>
    : UseQueryResult<TData, TError>;

export type UseExtendedQueryOptions<
    TUsesSuspense extends boolean = false,
    TQueryFnData = unknown,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = readonly unknown[],
> = (TUsesSuspense extends true
    ? UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    : UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) & {
    usesSuspense?: TUsesSuspense;
} & { enabled?: boolean };

export const useExtendedQuery = <
    TUsesSuspense extends boolean = false,
    TQueryFnData = unknown,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = readonly unknown[],
>(
    options: UseExtendedQueryOptions<
        TUsesSuspense,
        TQueryFnData,
        TError,
        TData,
        TQueryKey
    >,
    queryClient?: QueryClient
): UseExtendedQueryResult<TUsesSuspense, TData, TError> => {
    const { queryFn: queryFn_, ...options_ } = options;

    const queryFn: QueryFunction<TQueryFnData | null, TQueryKey> = async (
        context
    ) => {
        if (queryFn_ == null) {
            return null;
        }

        const data = await (queryFn_ as any)(context);
        return data ?? null;
    };

    const query = options.usesSuspense
        ? useSuspenseQuery({ queryFn, ...options_ } as any, queryClient)
        : useQuery({ queryFn, ...options_ } as any, queryClient);

    return query as any;
};
