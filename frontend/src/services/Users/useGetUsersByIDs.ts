import { QueryClient } from "@tanstack/react-query";
import { UserDTO, UserSchema } from "@/schemas/UserSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import users_dummy_data from "@data/users.dummy.json";

export const GET_USERS_BY_IDS_KEY = "get-users-by-ids";

export const useGetUsersByIDs = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<UserDTO>,
>(
    ids: Array<string>,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        UserDTO,
        Array<UserDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<TUsesSuspense, UserDTO, Array<UserDTO>, TTransformFnData>(
        {
            schema: UserSchema,
            queryFn: () =>
                ids
                    .map((id) =>
                        (users_dummy_data as Array<UserDTO>).find(
                            (user) => user.username == id
                        )
                    )
                    .filter((user) => user != null),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [GET_USERS_BY_IDS_KEY, ...(options?.queryKey ?? [])],
        },
        queryClient
    );
