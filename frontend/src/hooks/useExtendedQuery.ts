import {
    useQuery,
    QueryKey,
    QueryClient,
    UseQueryOptions,
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from "@tanstack/react-query";

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
): TUsesSuspense extends true
    ? ReturnType<
          typeof useSuspenseQuery<TQueryFnData, TError, TData, TQueryKey>
      >
    : ReturnType<typeof useQuery<TQueryFnData, TError, TData, TQueryKey>> => {
    const { staleTime = 3000 * 60 * 10, ...options_ } = options;

    const query = options.usesSuspense
        ? useSuspenseQuery({ staleTime, ...options_ } as any, queryClient)
        : useQuery({ staleTime, ...options }, queryClient);

    return query as any;
};
