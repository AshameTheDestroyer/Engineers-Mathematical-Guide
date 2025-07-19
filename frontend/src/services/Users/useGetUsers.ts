import { QueryClient } from "@tanstack/react-query";
import { UserDTO, UserSchema } from "@/schemas/UserSchema";
import { CreateFilterFunction } from "@/functions/CreateFilterFunction";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import users_dummy_data from "@data/users.dummy.json";

export const GET_USERS_KEY = "get-users";

export const useGetUsers = <TUsesSuspense extends boolean = false>(
    searchQuery: string | undefined,
    options?: InheritableQueryOptions<TUsesSuspense, UserDTO, Array<UserDTO>>,
    queryClient?: QueryClient
) =>
    useSchematicQuery<TUsesSuspense, UserDTO, Array<UserDTO>>(
        {
            schema: UserSchema,
            queryFn: () =>
                (users_dummy_data as Array<UserDTO>).filter(
                    CreateFilterFunction<UserDTO>(searchQuery, {
                        gender: (user, term) =>
                            user.gender.toLowerCase() == term,
                        username: (user, term) =>
                            user.username.toLowerCase() == term,
                        country: (user, term) =>
                            user.country.toLowerCase().includes(term),
                        surname: (user, term) =>
                            user.username.toLowerCase().includes(term),
                        "phone-number": (user, term) =>
                            user["phone-number"].toLowerCase() == term,
                        name: (user, term) =>
                            (user.name + " " + user.surname)
                                .toLowerCase()
                                .includes(term),
                    })
                ),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [
                GET_USERS_KEY,
                searchQuery,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
