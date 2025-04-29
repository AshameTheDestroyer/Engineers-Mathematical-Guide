import { SignupDTO } from "@/schemas/SignupSchema";
import { useMutation } from "@tanstack/react-query";
import { HTTPManager } from "@/managers/HTTPManager";

export const SIGNUP_KEY = "signup";

export const useSignupMutation = () =>
    useMutation({
        mutationKey: [SIGNUP_KEY],
        mutationFn: ({ "phone-number": phoneNumber, ...data }: SignupDTO) =>
            HTTPManager.post<{ accessToken: string }>("/auth/signup", {
                ...Object.omit(
                    data,
                    "confirm-password",
                    "terms-and-conditions"
                ),
                phoneNumber,
            }),
    });
