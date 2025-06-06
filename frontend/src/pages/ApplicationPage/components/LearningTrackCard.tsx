import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import React from "react";
import { Image } from "@/components/Image/Image";
import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import { Button } from "@/components/Button/Button";
import { CardSummary } from "./CardSummary";
import { useNavigate } from "react-router-dom";
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
                learningTrack: Partial<LearningTrackDTO>;
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

    const handleSpecialize = () => {
        Navigate(
            APPLICATION_ROUTES.base.routes.learningTrackID.absolute.replace(
                ":learningTrackID",
                learningTrack.id!
            )
        );
    };

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                isSkeleton && "animate-pulse",
                "h-65 relative flex overflow-hidden rounded-lg bg-gray-800 align-middle shadow-md",
                className
            )}
            style={{ boxShadow: shadow }}
        >
            <Flexbox className="flex items-start text-white">
                <div className="relative mr-4 h-full w-1/2 overflow-hidden">
                    {!isSkeleton && (
                        <Image
                            source={learningTrack.image}
                            alternative={`Image of ${learningTrack.title} Course`}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>

                <Flexbox className="flex h-full w-full grow flex-row justify-between gap-10 py-5">
                    <Flexbox className="w-70 flex flex-col justify-between">
                        {!isSkeleton && (
                            <Typography variant="p">
                                {learningTrack.description}
                            </Typography>
                        )}
                        {!isSkeleton && (
                            <Typography
                                variant="p"
                                className="text-vibrant-red-normal"
                            >
                                Contains {learningTrack["courses-count"]}{" "}
                                Courses
                            </Typography>
                        )}
                    </Flexbox>
                    {!isSkeleton && (
                        <Flexbox
                            gap="5"
                            className="w-1/2 flex-col place-self-end pr-5"
                        >
                            <CardSummary
                                className="static place-items-end [&_.typography:last-child]:text-right"
                                title={learningTrack.title}
                                rating={learningTrack.rating}
                                registerParagraph="Specialized Student"
                                ratingCount={learningTrack["rating-count"]}
                                registerCount={
                                    learningTrack["specialized-count"]
                                }
                            />
                            <Button
                                variant="primary"
                                onClick={handleSpecialize}
                            >
                                Specialize
                            </Button>
                        </Flexbox>
                    )}
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
};
