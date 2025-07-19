import { HTTPManager } from "@/managers/HTTPManager";
import { ForgotPasswordStepsDTO } from "@/schemas/ForgotPasswordSchema";
import {
    MutationOptions,
    QueryClient,
    useMutation,
} from "@tanstack/react-query";

export const RESET_PASSWORD_KEY = "reset-password";

export const useResetPasswordMutation = (
    options?: Omit<
        MutationOptions<any, Error, ForgotPasswordStepsDTO["reset-password"]>,
        "mutationFn"
    >,
    queryClient?: QueryClient
) =>
    useMutation(
        {
            ...options,
            mutationKey: [RESET_PASSWORD_KEY, ...(options?.mutationKey ?? [])],
            mutationFn: (data) =>
                HTTPManager.post(
                    "/auth/reset-password",
                    Object.omit(data, "confirm-password")
                ),
        },
        queryClient
    );
