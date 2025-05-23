import {
    DetailedLearningTrackDTO,
    DetailedLearningTrackSchema,
} from "@/schemas/LearningTrackSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_learningTracks_dummy_data from "@data/detailed_learning_tracks.dummy.json";

export const LEARNING_TRACK_KEY = "learning-track";

export const useGetLearningTrackByID = <TUsesSuspense extends boolean = false>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedLearningTrackDTO,
        DetailedLearningTrackDTO | undefined
    >
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedLearningTrackDTO,
        DetailedLearningTrackDTO | undefined
    >({
        schema: DetailedLearningTrackSchema,
        queryFn: () =>
            detailed_learningTracks_dummy_data.find(
                (learningTrack) => learningTrack.id == id
            ),
        parseFn: (data, schema) => (data != null ? schema.parse(data) : data),
        ...options,
        queryKey: [LEARNING_TRACK_KEY, id, ...(options?.queryKey ?? [])],
    });
