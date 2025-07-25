import { QueryClient } from "@tanstack/react-query";
import { useGetLearningTracks } from "./useGetLearningTracks";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";

export const SIMILAR_LEARNING_TRACKS_LIMIT = 5;
export const GET_SIMILAR_LEARNING_TRACKS_KEY = "get-similar-learning-tracks";

export const useGetSimilarLearningTracks = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<LearningTrackDTO>,
>(
    learningTrack: LearningTrackDTO | undefined,
    limit: number = SIMILAR_LEARNING_TRACKS_LIMIT,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        LearningTrackDTO,
        Array<LearningTrackDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useGetLearningTracks(
        learningTrack?.tags.join(" "),
        {
            transform: (data) =>
                data
                    ?.filter(
                        (learningTrack_) =>
                            learningTrack_.id != learningTrack?.id
                    )
                    ?.slice(0, limit),
            ...(options ?? ({} as typeof options & {})),
            queryKey: [
                GET_SIMILAR_LEARNING_TRACKS_KEY,
                learningTrack?.id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
