import { HTTPManager } from "@/managers/HTTPManager";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { ForgotPasswordStepsDTO } from "@/schemas/ForgotPasswordSchema";

export const FORGOT_PASSWORD_KEY = "forgot-password";

export const useForgotPasswordMutation = (
    options?: Omit<
        MutationOptions<any, Error, ForgotPasswordStepsDTO["code-request"]>,
        "mutationFn"
    >
) =>
    useMutation({
        ...options,
        mutationKey: [FORGOT_PASSWORD_KEY, options?.mutationKey],
        mutationFn: (data) => HTTPManager.post("/auth/forgot-password", data),
    });
