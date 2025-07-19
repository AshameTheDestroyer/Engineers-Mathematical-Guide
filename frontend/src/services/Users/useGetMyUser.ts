import { useGetUserByID } from "./useGetUserByID";
import { QueryClient } from "@tanstack/react-query";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";

const MY_USERNAME = "ashamethedestroyer";

export const GET_MY_USER_KEY = "get-my-user";

export const useGetMyUser = <TUsesSuspense extends boolean = false>(
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedUserDTO,
        DetailedUserDTO | undefined
    >,
    queryClient?: QueryClient
) => useGetUserByID(MY_USERNAME, options, queryClient);
