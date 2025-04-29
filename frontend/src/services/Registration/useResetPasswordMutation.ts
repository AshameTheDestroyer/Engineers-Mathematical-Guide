import { useMutation } from "@tanstack/react-query";
import { HTTPManager } from "@/managers/HTTPManager";
import { ForgotPasswordStepsDTO } from "@/schemas/ForgotPasswordSchema";

export const FORGOT_PASSWORD_KEY = "forgot-password";

export const useForgotPasswordMutation = () =>
    useMutation({
        mutationKey: [FORGOT_PASSWORD_KEY],
        mutationFn: (data: ForgotPasswordStepsDTO["code-request"]) =>
            HTTPManager.post("/auth/forgot-password", data),
    });
