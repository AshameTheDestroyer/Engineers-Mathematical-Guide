import { HTTPInstance } from "../HTTPInstance";
import { LoginDTO } from "@/schemas/LoginSchema";
import { useMutation } from "@tanstack/react-query";

export const LOGIN_KEY = "login";

export const useLoginMutation = () =>
    useMutation({
        mutationKey: [LOGIN_KEY],
        mutationFn: (data: LoginDTO) =>
            HTTPInstance.post<{ token: string }>("/auth/login", data),
    });
