import { LoginDTO } from "@/schemas/LoginSchema";
import { useMutation } from "@tanstack/react-query";
import { HTTPManager } from "@/managers/HTTPManager";

export const LOGIN_KEY = "login";

export const useLoginMutation = () =>
    useMutation({
        mutationKey: [LOGIN_KEY],
        mutationFn: (data: LoginDTO) =>
            HTTPManager.post<{ accessToken: string }>("/auth/login", data),
    });
