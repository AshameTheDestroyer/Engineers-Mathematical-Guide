import { QueryClient } from "@tanstack/react-query";
import { useGetUsersByIDs } from "./useGetUsersByIDs";
import { UserDTO, DetailedUserDTO } from "@/schemas/UserSchema";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";

export const GET_FOLLOWEES_KEY = "get-followees";

export const useGetFollowees = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<UserDTO>,
>(
    user: DetailedUserDTO,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        UserDTO,
        Array<UserDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useGetUsersByIDs(
        user.followees,
        {
            ...(options ?? ({} as typeof options & {})),
            queryKey: [
                GET_FOLLOWEES_KEY,
                user.username,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
