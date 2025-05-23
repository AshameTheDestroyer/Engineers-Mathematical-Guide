import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { CourseCard } from "./CourseCard";
import { CourseDTO } from "@/schemas/CourseSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type CoursesDisplayProps = ChildlessComponentProps<HTMLDivElement> &
    Either<
        {
            isSkeleton?: false;
            courses: Array<CourseDTO>;
        },
        {
            isSkeleton: true;
            courses: Array<Partial<CourseDTO>>;
        }
    >;

export const CoursesDisplay: FC<CoursesDisplayProps> = ({
    id,
    ref,
    courses,
    className,
    isSkeleton,
}) => {
    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "grid grow grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8",
                className
            )}
        >
            {courses.map((course, i) => (
                <CourseCard
                    key={isSkeleton ? i : course.id}
                    className="aspect-square"
                    isSkeleton={isSkeleton}
                    course={course as CourseDTO}
                />
            ))}
        </div>
    );
};
