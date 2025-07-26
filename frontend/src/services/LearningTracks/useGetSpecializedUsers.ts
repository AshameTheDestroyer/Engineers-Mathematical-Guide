import { QueryClient } from "@tanstack/react-query";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import { DetailedUserDTO, DetailedUserSchema } from "@/schemas/UserSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_users_dummy_data from "@data/detailed_users.dummy.json";

export const GET_SPECIALIZED_USERS_KEY = "get-specialized-users";

export const useGetSpecializedUsers = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<DetailedUserDTO>,
>(
    learningTrack: LearningTrackDTO | undefined,
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
                learningTrack == null
                    ? []
                    : (
                          detailed_users_dummy_data as Array<DetailedUserDTO>
                      ).filter(
                          (user) => user.specialization == learningTrack.id
                      ),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [
                GET_SPECIALIZED_USERS_KEY,
                learningTrack?.id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
