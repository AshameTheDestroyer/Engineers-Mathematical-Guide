import { useEffect } from "react";
import { useExtendedQuery } from "./useExtendedQuery";

export type useMockQueryProps<T, TUsesSuspense extends boolean = false> = {
    dummyData?: T;
    requestTime?: number;
    onError?: () => void;
    onSuccess?: () => void;
    usesSuspense?: TUsesSuspense;
};

export const useMockQuery = <T, TUsesSuspense extends boolean = false>(
    props?: useMockQueryProps<T, TUsesSuspense>
) => {
    const {
        onError,
        onSuccess,
        dummyData,
        usesSuspense,
        requestTime = 2000,
    } = props ?? {};

    const query = useExtendedQuery<TUsesSuspense, unknown, Error, T>({
        usesSuspense,
        queryKey: [],
        queryFn: () =>
            new Promise<typeof dummyData>((resolve, reject) =>
                setTimeout(
                    Math.random() > 0.5 ? () => resolve(dummyData) : reject,
                    requestTime
                )
            ),
    });

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
