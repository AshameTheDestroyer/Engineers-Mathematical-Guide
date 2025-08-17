import { QueryClient } from "@tanstack/react-query";
import { DetailedUserDTO, DetailedUserSchema } from "@/schemas/UserSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_users_dummy_data from "@data/detailed_users.dummy.json";

export const GET_USERS_BY_IDS_KEY = "get-users-by-ids";

export const useGetUsersByIDs = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<DetailedUserDTO>,
>(
    ids: Array<string>,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedUserDTO,
        Array<DetailedUserDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedUserDTO,
        Array<DetailedUserDTO>,
        TTransformFnData
    >(
        {
            schema: DetailedUserSchema,
            queryFn: () =>
                ids
                    .map((id) =>
                        (
                            detailed_users_dummy_data as Array<DetailedUserDTO>
                        ).find((user) => user.username == id)
                    )
                    .filter((user) => user != null),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [
                GET_USERS_BY_IDS_KEY,
                ...ids,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
