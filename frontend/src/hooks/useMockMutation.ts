import { useEffect } from "react";
import { MutationKey, useMutation } from "@tanstack/react-query";

export type UseMockMutationProps<
    TMutationKey extends MutationKey = readonly unknown[],
> = {
    resetTime?: number;
    requestTime?: number;
    onError?: () => void;
    onSuccess?: () => void;
    mutationKey: TMutationKey;
};

export const useMockMutation = <
    TMutationKey extends MutationKey = readonly unknown[],
>(
    props?: UseMockMutationProps
) => {
    const {
        onError,
        onSuccess,
        resetTime = 2000,
        requestTime = 2000,
        mutationKey = [] as unknown as TMutationKey,
    } = props ?? {};

    const mutation = useMutation({
        mutationKey,
        mutationFn: () =>
            new Promise((resolve, reject) =>
                setTimeout(Math.random() > 0.5 ? resolve : reject, requestTime)
            ),
    });

    useEffect(() => {
        if (!mutation.isSuccess) {
            return;
        }

        onSuccess?.();
        setTimeout(mutation.reset, resetTime);
    }, [mutation.isSuccess]);

    useEffect(() => {
        if (!mutation.isError) {
            return;
        }

        onError?.();
        setTimeout(mutation.reset, resetTime);
    }, [mutation.isError]);

    return mutation;
};
