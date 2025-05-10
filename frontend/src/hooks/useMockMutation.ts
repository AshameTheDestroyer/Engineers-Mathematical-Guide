import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

export type UseMockMutationProps = {
    resetTime?: number;
    requestTime?: number;
    onError?: () => void;
    onSuccess?: () => void;
};

export const useMockMutation = (props?: UseMockMutationProps) => {
    const {
        onError,
        onSuccess,
        resetTime = 2000,
        requestTime = 2000,
    } = props ?? {};

    const mutation = useMutation({
        mutationKey: [],
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
