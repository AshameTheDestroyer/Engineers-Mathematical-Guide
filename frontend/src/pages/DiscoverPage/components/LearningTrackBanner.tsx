import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { CardSummary } from "./CardSummary";
import { Image } from "@/components/Image/Image";
import { ComponentProps } from "@/types/ComponentProps";
import { LearningTrackDTO } from "@/schemas/LearningTrackSchema";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/learning_tracks_page.json";

export type LearningTrackBannerProps = ComponentProps<HTMLDivElement> & {
    learningTrack: LearningTrackDTO;
};

export const LearningTrackBanner: FC<LearningTrackBannerProps> = ({
    id,
    ref,
    children,
    className,
    learningTrack,
}) => {
    const { GetLocale, language } = useLocalization();

    return (
        <figure
            id={id}
            ref={ref}
            className={twMerge(
                "border-background-dark -m-page relative mb-auto border-b-2 text-white",
                className
            )}
        >
            <CardSummary
                className="[&_.icon]:drop-shadow-[3px_3px_1px_#0000007c] [&_.typography]:[text-shadow:2px_2px_2.5px_black]"
                title={learningTrack.title}
                rating={learningTrack.rating}
                ratingCount={learningTrack["rating-count"]}
                registerCount={learningTrack["specialized-count"]}
                reviewsParagraph={GetLocale(locales.card.reviews, language)}
                registerParagraph={GetLocale(
                    locales.card.specialization,
                    language
                )}
            />
            {children}
            <Image
                className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                source={learningTrack.image}
                alternative={`Image of ${learningTrack.title} Learning Track.`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
        </figure>
    );
};
