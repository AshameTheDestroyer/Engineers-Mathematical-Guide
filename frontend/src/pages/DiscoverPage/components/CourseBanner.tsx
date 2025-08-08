import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { CardSummary } from "./CardSummary";
import { Image } from "@/components/Image/Image";
import { CourseDTO } from "@/schemas/CourseSchema";
import { ComponentProps } from "@/types/ComponentProps";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/courses_page.json";

export type CourseBannerProps = ComponentProps<HTMLDivElement> & {
    course: CourseDTO;
};

export const CourseBanner: FC<CourseBannerProps> = ({
    id,
    ref,
    course,
    children,
    className,
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
                title={course.title}
                rating={course.rating}
                ratingCount={course["rating-count"]}
                registerCount={course["enrollment-count"]}
                registerParagraph={GetLocale(locales.card.enrollment, language)}
                reviewsParagraph={GetLocale(locales.card.reviews, language)}
            />
            {children}
            <Image
                className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                source={course.image}
                alternative={`Image of ${course.title} Course.`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
        </figure>
    );
};
