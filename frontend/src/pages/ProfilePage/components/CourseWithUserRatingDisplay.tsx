import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { CourseCard } from "@/pages/ApplicationPage/components/CourseCard";
import { CourseDTO } from "@/schemas/CourseSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Rating } from "@/components/Rating/Rating";
import { Typography } from "@/components/Typography/Typography";

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
                <Flexbox direction="column" gap="2  ">
                    <CourseCard
                        key={isSkeleton ? i : course!.id}
                        className="aspect-square transform rounded-bl-none rounded-br-none transition-transform group-hover:scale-125"
                        isSkeleton={isSkeleton}
                        course={course as CourseDTO}
                    />
                    {items && (
                        //add here when hover on previous element this element will also scaled at the same amount
                        <Flexbox
                            placeContent="space-between"
                            placeItems="center"
                            variant="p"
                            className="bg-lagoon-background-darker rounded-bl-4xl rounded-br-4xl w-full transform p-3 px-4 font-bold text-white transition-transform group-hover:scale-125"
                        >
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
                        </Flexbox>
                    )}
                </Flexbox>
            ))}
        </div>
    );
};
