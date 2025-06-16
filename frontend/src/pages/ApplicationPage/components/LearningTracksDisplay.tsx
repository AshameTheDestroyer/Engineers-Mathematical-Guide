import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { LearningTrackCard } from "./LearningTrackCard";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type LearningTracksDisplayProps =
    ChildlessComponentProps<HTMLDivElement> &
        Either<
            {
                isSkeleton?: false;
                learningTracks: Array<LearningTrackDTO>;
            },
            {
                isSkeleton: true;
                learningTracks: Array<Partial<LearningTrackDTO> | undefined>;
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
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "flex flex-col gap-8 max-lg:grid max-lg:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]",
                className
            )}
        >
            {learningTracks.map((learningTrack, i) => (
                <LearningTrackCard
                    key={isSkeleton ? i : learningTrack!.id}
                    className="aspect-square"
                    isSkeleton={isSkeleton}
                    learningTrack={learningTrack as LearningTrackDTO}
                />
            ))}
        </div>
    );
};
