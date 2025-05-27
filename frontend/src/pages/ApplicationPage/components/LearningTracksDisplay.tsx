import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { LearningTrackCard } from "./LearningTrackCard";
import { Flexbox } from "@/components/Flexbox/Flexbox";

export type LearningTracksDisplayProps =
    ChildlessComponentProps<HTMLDivElement> &
        Either<
            {
                isSkeleton?: false;
                learningTracks: Array<LearningTrackDTO>;
            },
            {
                isSkeleton: true;
                learningTracks: Array<Partial<LearningTrackDTO>>;
            }
        >;

export const LearningTracksDisplay: FC<LearningTracksDisplayProps> = ({
    id,
    ref,
    className,
    isSkeleton,
    learningTracks,
}) => {
    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge("flex flex-col gap-5", className)}
        >
            {learningTracks.map((learningTrack, i) => (
                <LearningTrackCard
                    key={isSkeleton ? i : learningTrack.id}
                    className="aspect-square"
                    isSkeleton={isSkeleton}
                    learningTrack={learningTrack as LearningTrackDTO}
                />
            ))}
        </Flexbox>
    );
};
