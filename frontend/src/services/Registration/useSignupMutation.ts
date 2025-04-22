import { HTTPInstance } from "../HTTPInstance";
import { SignupDTO } from "@/schemas/SignupSchema";
import { useMutation } from "@tanstack/react-query";

export const SIGNUP_KEY = "signup";

export const useSignupMutation = () =>
    useMutation({
        mutationKey: [SIGNUP_KEY],
        mutationFn: ({ "phone-number": phoneNumber, ...data }: SignupDTO) =>
            HTTPInstance.post<{ token: string }>("/auth/signup", {
                ...Object.omit(
                    data,
                    "confirm-password",
                    "terms-and-conditions"
                ),
                phoneNumber,
            }),
    });
