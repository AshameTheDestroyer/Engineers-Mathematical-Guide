import { FC } from "react";
import { CourseDTO } from "@/schemas/CourseSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { Typography } from "@/components/Typography/Typography";

export type CourseCardProps = ChildlessComponentProps<HTMLElement> & {
    course: CourseDTO;
};

export const CourseCard: FC<CourseCardProps> = ({
    id,
    ref,
    course,
    className,
}) => {
    return (
        <article
            id={id}
            ref={ref}
            className={className}
            role="region"
            aria-label={course.title}
        >
            <Typography variant="h3">{course.title}</Typography>
            <Typography variant="p">{course.description}</Typography>
        </article>
    );
};
