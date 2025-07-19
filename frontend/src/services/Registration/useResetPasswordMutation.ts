import { HTTPManager } from "@/managers/HTTPManager";
import { ForgotPasswordStepsDTO } from "@/schemas/ForgotPasswordSchema";
import {
    MutationOptions,
    QueryClient,
    useMutation,
} from "@tanstack/react-query";

export const FORGOT_PASSWORD_KEY = "forgot-password";

export const useForgotPasswordMutation = (
    options?: Omit<
        MutationOptions<any, Error, ForgotPasswordStepsDTO["code-request"]>,
        "mutationFn"
    >,
    queryClient?: QueryClient
) =>
    useMutation(
        {
            ...options,
            mutationKey: [FORGOT_PASSWORD_KEY, ...(options?.mutationKey ?? [])],
            mutationFn: (data) =>
                HTTPManager.post("/auth/forgot-password", data),
        },
        queryClient
    );
