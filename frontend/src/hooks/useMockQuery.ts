import { useEffect } from "react";
import { QueryKey } from "@tanstack/react-query";
import { useExtendedQuery } from "./useExtendedQuery";

export type useMockQueryProps<
    T,
    TUsesSuspense extends boolean = false,
    TQueryKey extends QueryKey = readonly unknown[],
> = {
    dummyData?: T;
    queryKey: TQueryKey;
    requestTime?: number;
    onError?: () => void;
    onSuccess?: () => void;
    usesSuspense?: TUsesSuspense;
};

export const useMockQuery = <
    T,
    TUsesSuspense extends boolean = false,
    TQueryKey extends QueryKey = readonly unknown[],
>(
    props?: useMockQueryProps<T, TUsesSuspense, TQueryKey>
) => {
    const {
        onError,
        onSuccess,
        dummyData,
        usesSuspense,
        requestTime = 2000,
        queryKey = [] as unknown as TQueryKey,
    } = props ?? {};

    const query = useExtendedQuery<TUsesSuspense, unknown, Error, T, TQueryKey>(
        {
            queryKey,
            usesSuspense,
            queryFn: () =>
                new Promise<typeof dummyData>((resolve, reject) =>
                    setTimeout(
                        Math.random() > 0.5 ? () => resolve(dummyData) : reject,
                        requestTime
                    )
                ),
        }
    );

    useEffect(() => {
        if (!query.isSuccess) {
            return;
        }

        onSuccess?.();
    }, [query.isSuccess]);

    useEffect(() => {
        if (!query.isError) {
            return;
        }

        onError?.();
    }, [query.isError]);

    return query;
};
