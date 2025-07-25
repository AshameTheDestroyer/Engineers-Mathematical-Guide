import { QueryClient } from "@tanstack/react-query";
import {
    DetailedLearningTrackDTO,
    DetailedLearningTrackSchema,
} from "@/schemas/LearningTrackSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_learningTracks_dummy_data from "@data/detailed_learning_tracks.dummy.json";

export const GET_LEARNING_TRACK_BY_ID_KEY = "get-learning-track-by-id";

export const useGetLearningTrackByID = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = DetailedLearningTrackDTO | undefined,
>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedLearningTrackDTO,
        DetailedLearningTrackDTO | undefined,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedLearningTrackDTO,
        DetailedLearningTrackDTO | undefined,
        TTransformFnData
    >(
        {
            schema: DetailedLearningTrackSchema,
            queryFn: () =>
                detailed_learningTracks_dummy_data.find(
                    (learningTrack) => learningTrack.id == id
                ),
            ...options,
            queryKey: [
                GET_LEARNING_TRACK_BY_ID_KEY,
                id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
