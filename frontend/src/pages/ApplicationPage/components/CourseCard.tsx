import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { useNavigate } from "react-router-dom";
import { CardSummary } from "./CardSummary";
import { Image } from "@/components/Image/Image";
import { CourseDTO } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { APPLICATION_ROUTES } from "@/routes/application.routes";

export type CourseCardProps = ChildlessComponentProps<HTMLButtonElement> &
    Either<
        {
            isSkeleton?: false;
            course: CourseDTO;
        },
        {
            isSkeleton: true;
            course: Partial<CourseDTO>;
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

    return (
        <button
            id={id}
            ref={ref}
            className={twMerge(
                isSkeleton && "animate-pulse",
                "bg-background-normal group relative isolate flex cursor-pointer overflow-hidden rounded-2xl p-8 text-start text-white transition duration-200 [&:is(hover,:focus-within)]:scale-105 [&_.typography]:[text-shadow:2px_2px_2.5px_black]",
                className
            )}
            role="region"
            style={{ boxShadow: shadow }}
            tabIndex={isSkeleton ? -1 : 0}
            aria-label={isSkeleton ? undefined : course.title}
            onClick={(_e) =>
                !isSkeleton &&
                Navigate(
                    APPLICATION_ROUTES.base.routes.courseID.absolute.replace(
                        ":courseID",
                        course.id!
                    )
                )
            }
        >
            {!isSkeleton && (
                <Typography variant="p">{course.description}</Typography>
            )}
            <figure className="absolute inset-0 z-[-1]">
                {!isSkeleton && (
                    <CardSummary
                        title={course.title}
                        rating={course.rating}
                        registerParagraph="Enrolled Student"
                        ratingCount={course["rating-count"]}
                        registerCount={course["enrollment-count"]}
                    />
                )}
                {!isSkeleton && course.image != null && (
                    <Image
                        className="absolute inset-0 [&>img]:h-full [&>img]:object-cover"
                        source={course.image}
                        alternative={`Image of ${course.title} Course.`}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>
        </button>
    );
};
