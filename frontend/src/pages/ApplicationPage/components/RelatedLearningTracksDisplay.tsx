import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { LearningTracksDisplay } from "./LearningTracksDisplay";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import {
    SearchResultDisplay,
    SearchResultDisplayProps,
} from "@/components/SearchResultDisplay/SearchResultDisplay";

export type RelatedLearningTracksDisplayProps = QueryProps<
    Array<LearningTrackDTO> | undefined
> & {
    skeletonArray: Array<Partial<LearningTrackDTO>>;
    emptyDisplay: Pick<SearchResultDisplayProps, "title" | "paragraph">;
    errorDisplay: Pick<SearchResultDisplayProps, "title" | "paragraph"> & {
        button: string;
    };
};

export const RelatedLearningTracksDisplay: FC<
    RelatedLearningTracksDisplayProps
> = ({
    isError,
    isLoading,
    isSuccess,
    errorDisplay,
    emptyDisplay,
    refetch: Refetch,
    skeletonArray,
    data: relatedLearningTracks,
}) => {
    if (isLoading || relatedLearningTracks == null) {
        return (
            <LearningTracksDisplay isSkeleton learningTracks={skeletonArray} />
        );
    }

    if (isError) {
        return (
            <SearchResultDisplay
                className="place-items-start!"
                {...errorDisplay}
                iconType="error"
                buttons={
                    <Button onClick={(_e) => Refetch()}>
                        {errorDisplay.button}
                    </Button>
                }
            />
        );
    }

    if (isSuccess && relatedLearningTracks.length == 0) {
        return (
            <SearchResultDisplay
                className="place-items-start! [&>h2.typography]:text-lg [&>h2.typography]:font-normal"
                iconType="none"
                {...emptyDisplay}
            />
        );
    }

    return <LearningTracksDisplay learningTracks={relatedLearningTracks} />;
};
