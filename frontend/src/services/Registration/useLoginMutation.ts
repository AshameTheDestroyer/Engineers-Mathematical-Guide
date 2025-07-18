import { LoginDTO } from "@/schemas/LoginSchema";
import { HTTPManager } from "@/managers/HTTPManager";
import {
    MutationOptions,
    QueryClient,
    useMutation,
} from "@tanstack/react-query";

export const LOGIN_KEY = "login";

export const useLoginMutation = (
    options?: Omit<MutationOptions<any, Error, LoginDTO>, "mutationFn">,
    queryClient?: QueryClient
) =>
    useMutation(
        {
            ...options,
            mutationKey: [LOGIN_KEY, ...(options?.mutationKey ?? [])],
            mutationFn: (data) =>
                HTTPManager.post<{ accessToken: string }>("/auth/login", data),
        },
        queryClient
    );
