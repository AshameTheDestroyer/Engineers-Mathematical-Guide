import { HTTPManager } from "@/managers/HTTPManager";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { ForgotPasswordStepsDTO } from "@/schemas/ForgotPasswordSchema";

export const RESET_PASSWORD_KEY = "reset-password";

export const useResetPasswordMutation = (
    options?: Omit<
        MutationOptions<any, Error, ForgotPasswordStepsDTO["reset-password"]>,
        "mutationFn"
    >
) =>
    useMutation({
        ...options,
        mutationKey: [RESET_PASSWORD_KEY, options?.mutationKey],
        mutationFn: (data) =>
            HTTPManager.post(
                "/auth/reset-password",
                Object.omit(data, "confirm-password")
            ),
    });
