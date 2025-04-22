import { HTTPInstance } from "../HTTPInstance";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordStepsDTO } from "@/schemas/ForgotPasswordSchema";

export const FORGOT_PASSWORD_KEY = "forgot-password";

export const useForgotPasswordMutation = () =>
    useMutation({
        mutationKey: [FORGOT_PASSWORD_KEY],
        mutationFn: (data: ForgotPasswordStepsDTO["code-request"]) =>
            HTTPInstance.post("/auth/forgot-password", data),
    });
