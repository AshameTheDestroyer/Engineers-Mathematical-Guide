import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { useNavigate } from "react-router-dom";
import { CourseSummary } from "./CourseSummary";
import { Image } from "@/components/Image/Image";
import { CourseDTO } from "@/schemas/CourseSchema";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { APPLICATION_ROUTES } from "@/routes/application.routes";

export type CourseCardProps = ChildlessComponentProps<HTMLElement> & {
    course: CourseDTO;
};

export const CourseCard: FC<CourseCardProps> = ({
    id,
    ref,
    course,
    className,
}) => {
    const shadow = useShadow();
    const Navigate = useNavigate();

    return (
        <article
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-normal group relative isolate cursor-pointer overflow-hidden rounded-2xl p-8 text-white transition duration-200 hover:scale-105 [&_.typography]:[text-shadow:2px_2px_2.5px_black]",
                className
            )}
            aria-label={course.title}
            role="region"
            style={{ boxShadow: shadow }}
            onClick={(_e) =>
                Navigate(
                    APPLICATION_ROUTES.base.routes.courseID.absolute.replace(
                        ":courseID",
                        course.id
                    )
                )
            }
        >
            <Typography variant="p">{course.description}</Typography>
            <figure className="absolute inset-0 z-[-1]">
                <CourseSummary course={course} />
                {course.image != null && (
                    <Image
                        className="absolute inset-0 [&>img]:h-full [&>img]:object-cover"
                        source={course.image}
                        alternative={`Image of ${course.title} Course.`}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>
        </article>
    );
};
