import { QueryClient } from "@tanstack/react-query";
import { DetailedUserDTO, DetailedUserSchema } from "@/schemas/UserSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_users_dummy_data from "@data/detailed_users.dummy.json";

export const GET_USER_BY_ID_KEY = "get-user-by-id";

export const useGetUserByID = <TUsesSuspense extends boolean = false>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedUserDTO,
        DetailedUserDTO | undefined
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedUserDTO,
        DetailedUserDTO | undefined
    >(
        {
            schema: DetailedUserSchema,
            queryFn: () =>
                (detailed_users_dummy_data as Array<DetailedUserDTO>).find(
                    (user) => user.username == id
                ),
            ...options,
            queryKey: [GET_USER_BY_ID_KEY, id, ...(options?.queryKey ?? [])],
        },
        queryClient
    );
