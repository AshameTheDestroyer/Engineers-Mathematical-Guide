import { CreateFilterFunction } from "@/functions/CreateFilterFunction";
import {
    LearningTrackDTO,
    LearningTrackSchema,
} from "@/schemas/LearningTracksSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import learningTracks_dummy_data from "@data/learning_tracks.dummy.json";

export const LEARNING_TRACKS_KEY = "learning-tracks";

export const useGetLearningTracks = <TUsesSuspense extends boolean = false>(
    searchQuery: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        LearningTrackDTO,
        Array<LearningTrackDTO>
    >
) =>
    useSchematicQuery<TUsesSuspense, LearningTrackDTO, Array<LearningTrackDTO>>(
        {
            schema: LearningTrackSchema,
            queryFn: () =>
                learningTracks_dummy_data.filter(
                    CreateFilterFunction<LearningTrackDTO>(searchQuery, {
                        title: (learningTrack, term) =>
                            learningTrack.title.toLowerCase().includes(term),
                        tags: (learningTrack, term) =>
                            learningTrack.tags.some((tag) =>
                                tag.includes(term)
                            ),
                    })
                ),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [LEARNING_TRACKS_KEY, ...(options?.queryKey ?? [])],
        }
    );
