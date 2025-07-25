import { QueryClient } from "@tanstack/react-query";
import { useGetUsersByIDs } from "./useGetUsersByIDs";
import { UserDTO, DetailedUserDTO } from "@/schemas/UserSchema";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";

export const GET_FOLLOWERS_KEY = "get-followers";

export const useGetFollowers = <
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
        user.followers,
        {
            ...(options ?? ({} as typeof options & {})),
            queryKey: [
                GET_FOLLOWERS_KEY,
                user.username,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
