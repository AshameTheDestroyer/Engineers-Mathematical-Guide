import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

export const useMockMutation = (requestTime = 2000, resetTime = 2000) => {
    const mutation = useMutation({
        mutationKey: [],
        mutationFn: () =>
            new Promise((resolve, reject) =>
                setTimeout(Math.random() > 0.5 ? resolve : reject, requestTime)
            ),
    });

    useEffect(() => {
        setTimeout(mutation.reset, resetTime);
    }, [mutation.isSuccess, mutation.isError]);

    return mutation;
};
