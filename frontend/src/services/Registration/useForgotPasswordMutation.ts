import { useMutation } from "@tanstack/react-query";
import { HTTPManager } from "@/managers/HTTPManager";
import { ForgotPasswordStepsDTO } from "@/schemas/ForgotPasswordSchema";

export const RESET_PASSWORD_KEY = "reset-password";

export const useResetPasswordMutation = () =>
    useMutation({
        mutationKey: [RESET_PASSWORD_KEY],
        mutationFn: (data: ForgotPasswordStepsDTO["reset-password"]) =>
            HTTPManager.post(
                "/auth/reset-password",
                Object.omit(data, "confirm-password")
            ),
    });
