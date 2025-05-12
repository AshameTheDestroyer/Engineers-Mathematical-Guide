import {
    useQuery,
    QueryKey,
    QueryClient,
    UseQueryResult,
    UseQueryOptions,
    useSuspenseQuery,
    UseSuspenseQueryOptions,
    UseSuspenseQueryResult,
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
};

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
    const { staleTime = 3000 * 60 * 10, ...options_ } = options;

    const query = options.usesSuspense
        ? useSuspenseQuery({ staleTime, ...options_ } as any, queryClient)
        : useQuery({ staleTime, ...options }, queryClient);

    return query as any;
};
