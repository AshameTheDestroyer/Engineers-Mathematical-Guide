import React from "react";
import { twMerge } from "tailwind-merge";
import { CardSummary } from "./CardSummary";
import { useShadow } from "@/hooks/useShadow";
import { useNavigate } from "react-router-dom";
import { Image } from "@/components/Image/Image";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import { APPLICATION_ROUTES } from "@/routes/application.routes";

export type LearningTrackCardProps =
    ChildlessComponentProps<HTMLButtonElement> &
        Either<
            {
                isSkeleton?: false;
                learningTrack: LearningTrackDTO;
            },
            {
                isSkeleton: true;
                learningTrack?: Partial<LearningTrackDTO>;
            }
        >;

export const LearningTrackCard: React.FC<LearningTrackCardProps> = ({
    id,
    ref,
    className,
    isSkeleton,
    learningTrack,
}) => {
    const shadow = useShadow();
    const Navigate = useNavigate();

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                isSkeleton && "animate-pulse",
                "bg-background-normal relative place-self-stretch rounded-lg p-4 max-lg:flex-col lg:h-64",
                className
            )}
            gap="4"
            style={{ boxShadow: shadow }}
        >
            <div className="max-lg:mb-4 max-lg:h-64 lg:aspect-square">
                <Image
                    className="h-full rounded-lg [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    hideNotFoundIcon
                    source={learningTrack?.image}
                    alternative={
                        learningTrack != null
                            ? `Image of ${learningTrack.title} Course`
                            : ""
                    }
                />
            </div>

            {
                <Flexbox
                    className="lg:grow"
                    gap="4"
                    direction="column"
                    justifyContent="space-between"
                >
                    <Typography
                        className={twMerge(
                            isSkeleton && "animate-pulse",
                            "bg-secondary-normal max-lg:top-63 flex place-items-center gap-2 place-self-start whitespace-nowrap rounded-full p-2 pr-4 font-bold text-white max-lg:absolute"
                        )}
                        variant="p"
                    >
                        <span className="bg-secondary-light-active text-secondary-normal border-secondary-normal -m-4 mr-0 flex aspect-square h-[calc(var(--spacing)*12)] place-content-center place-items-center rounded-full border-4">
                            {learningTrack?.["courses-count"]}
                        </span>{" "}
                        Courses
                    </Typography>
                    {!isSkeleton && (
                        <Typography className="lg:hidden" variant="p">
                            {learningTrack.description}
                        </Typography>
                    )}
                    {!isSkeleton && (
                        <Typography className="max-lg:hidden" variant="p">
                            {learningTrack["detailed-description"]}
                        </Typography>
                    )}
                </Flexbox>
            }

            {!isSkeleton && (
                <Flexbox
                    className="min-w-[max(20%,16rem)] place-self-end max-lg:w-full max-lg:grow"
                    gap="4"
                    direction="column"
                >
                    <CardSummary
                        className="static max-lg:grow lg:place-items-end max-lg:[&>.typography:last-child]:flex max-lg:[&>.typography:last-child]:flex-col max-lg:[&>.typography:last-child]:place-content-end max-lg:[&>.typography]:grow max-lg:[&_.typography:last-child]:whitespace-normal lg:[&_.typography:last-child]:text-right"
                        title={learningTrack.title}
                        rating={learningTrack.rating}
                        registerParagraph="Specialized Student"
                        ratingCount={learningTrack["rating-count"]}
                        registerCount={learningTrack["specialized-count"]}
                    />
                    <Button
                        variant="primary"
                        onClick={(_e) =>
                            Navigate(
                                APPLICATION_ROUTES.base.routes.learningTrackID.MapVariable(
                                    learningTrack.id
                                )
                            )
                        }
                    >
                        Specialize
                    </Button>
                </Flexbox>
            )}
        </Flexbox>
    );
};
