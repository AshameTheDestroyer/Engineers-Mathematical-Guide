import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { CourseCard } from "@/pages/ApplicationPage/components/CourseCard";
import { CourseDTO } from "@/schemas/CourseSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Rating } from "@/components/Rating/Rating";

export type CourseWithUserRatingDisplayProps =
    ChildlessComponentProps<HTMLDivElement> &
        Either<
            {
                isSkeleton?: false;
                courses: Array<CourseDTO>;
            },
            {
                isSkeleton: true;
                courses: Array<Partial<CourseDTO> | undefined>;
            }
        >;

export const CourseWithUserRatingDisplay: FC<
    CourseWithUserRatingDisplayProps
> = ({ id, ref, courses, items, studentRatingName, className, isSkeleton }) => {
    const arr = [1, 2, 4, 5, 3];

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
                <Flexbox direction="column" gap="5">
                    <CourseCard
                        key={isSkeleton ? i : course!.id}
                        className="aspect-square"
                        isSkeleton={isSkeleton}
                        course={course as CourseDTO}
                    />
                    {items && (
                        <p className="bg-lagoon-background-darker flex w-full place-content-center place-items-center justify-between rounded-xl p-1 px-4 font-bold">
                            {studentRatingName}'s rating:{" "}
                            {
                                <Rating
                                    iconProps={{
                                        width: 20,
                                        height: 20,
                                        stroke: "black",
                                    }}
                                    value={arr[i]}
                                />
                            }
                        </p>
                    )}
                </Flexbox>
            ))}
        </div>
    );
};
