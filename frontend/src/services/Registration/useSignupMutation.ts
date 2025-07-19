import { SignupDTO } from "@/schemas/SignupSchema";
import { HTTPManager } from "@/managers/HTTPManager";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const SIGNUP_KEY = "signup";

export const useSignupMutation = (
    options?: Omit<MutationOptions<any, Error, SignupDTO>, "mutationFn">
) =>
    useMutation({
        ...options,
        mutationKey: [SIGNUP_KEY, ...(options?.mutationKey ?? [])],
        mutationFn: ({ "phone-number": phoneNumber, ...data }) =>
            HTTPManager.post<{ accessToken: string }>("/auth/signup", {
                ...Object.omit(
                    data,
                    "confirm-password",
                    "terms-and-conditions"
                ),
                phoneNumber,
            }),
    });
