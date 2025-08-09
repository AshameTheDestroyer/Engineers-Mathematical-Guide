import { FC } from "react";
import { useMain } from "@/contexts";
import { CardSummary } from "./CardSummary";
import { Icon } from "@/components/Icon/Icon";
import { useShadow } from "@/hooks/useShadow";
import { useNavigate } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { CourseDTO } from "@/schemas/CourseSchema";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { IconButton } from "@/components/IconButton/IconButton";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locked_icon from "@icons/locked.svg";
import add_bookmark_icon from "@icons/bookmark_plus.svg";
import remove_bookmark_icon from "@icons/bookmark_minus.svg";

import locales from "@localization/courses_page.json";
import { Flexbox } from "@/components/Flexbox/Flexbox";

export type CourseCardProps = ChildlessComponentProps<HTMLDivElement> &
    Either<
        {
            isSkeleton?: false;
            course: CourseDTO;
        },
        {
            isSkeleton: true;
            course?: Partial<CourseDTO>;
        }
    >;

export const CourseCard: FC<CourseCardProps> = ({
    id,
    ref,
    course,
    className,
    isSkeleton,
}) => {
    const shadow = useShadow();
    const Navigate = useNavigate();

    const { GetLocale, language } = useLocalization();

    const { myUser } = useMain();
    const haveIBookmarked =
        !isSkeleton && myUser?.["bookmarked-courses"].includes(course.id);

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                isSkeleton
                    ? "animate-pulse"
                    : "cursor-pointer transition duration-200 [&:is(:hover,:focus-within)]:scale-105",
                "bg-background-normal relative isolate flex overflow-hidden rounded-2xl p-8 text-start text-white [&_.icon]:drop-shadow-[3px_3px_1px_#0000007c] [&_.typography]:[text-shadow:2px_2px_2.5px_black]",
                className
            )}
            role="region"
            style={{ boxShadow: shadow }}
            tabIndex={isSkeleton ? -1 : 0}
            aria-label={isSkeleton ? undefined : course.title}
            onClick={(_e) =>
                !isSkeleton &&
                Navigate(
                    DISCOVER_ROUTES.base.routes.courseID.MapVariable(course.id)
                )
            }
        >
            {!isSkeleton && (
                <Typography className="mr-8" variant="p" dir="ltr">
                    {course.description}
                </Typography>
            )}
            <figure className="absolute inset-0 z-[-1]">
                {!isSkeleton && (
                    <CardSummary
                        title={course.title}
                        rating={course.rating}
                        ratingCount={course["rating-count"]}
                        registerCount={course["enrollment-count"]}
                        registerParagraph={GetLocale(
                            locales.card.enrollment,
                            language
                        )}
                        reviewsParagraph={GetLocale(
                            locales.card.reviews,
                            language
                        )}
                    />
                )}
                {!isSkeleton && myUser != null && (
                    <Flexbox
                        className="absolute right-3 top-3 z-[1]"
                        gap="4"
                        direction="column"
                        placeItems="center"
                        placeContent="center"
                    >
                        <IconButton
                            isSquare
                            className="[&_.icon]:drop-shadow-none"
                            variant={haveIBookmarked ? "error" : "success"}
                            icon={{
                                source: haveIBookmarked
                                    ? remove_bookmark_icon
                                    : add_bookmark_icon,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        {course.locked && (
                            <Icon
                                className="text-vibrant-red-normal stroke-vibrant-red-dark aspect-square w-[24px] [&>svg]:h-full [&>svg]:w-full"
                                thickness={32}
                                source={locked_icon}
                            />
                        )}
                    </Flexbox>
                )}
                {!isSkeleton && course.image != null && (
                    <Image
                        className={twJoin(
                            // course.locked && "blur-xs grayscale",
                            "absolute inset-0 [&>img]:h-full [&>img]:object-cover [&>img]:blur-[1px]"
                        )}
                        source={course.image}
                        alternative={`Image of ${course.title} Course.`}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>
        </div>
    );
};
