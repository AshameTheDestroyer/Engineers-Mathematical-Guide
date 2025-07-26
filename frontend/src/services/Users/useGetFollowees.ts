import { QueryClient } from "@tanstack/react-query";
import { useGetUsersByIDs } from "./useGetUsersByIDs";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";

export const GET_FOLLOWEES_KEY = "get-followees";

export const useGetFollowees = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<DetailedUserDTO>,
>(
    user: DetailedUserDTO,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedUserDTO,
        Array<DetailedUserDTO>,
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
