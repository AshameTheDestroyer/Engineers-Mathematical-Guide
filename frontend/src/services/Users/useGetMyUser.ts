import { useGetUserByID } from "./useGetUserByID";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";

const MY_USERNAME = "ashamethedestroyer";

export const GET_MY_USER_KEY = "get-my-user";

export const useGetMyUser = <TUsesSuspense extends boolean = false>(
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedUserDTO,
        DetailedUserDTO | undefined
    >
) => useGetUserByID(MY_USERNAME, options);
