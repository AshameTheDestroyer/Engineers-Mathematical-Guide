import { FC } from "react";
import { CourseCard } from "./CourseCard";
import { QueryFunction } from "@tanstack/react-query";
import { useExtendedQuery } from "@/hooks/useExtendedQuery";
import { useSchematicQuery } from "@/hooks/useSchematicQuery";
import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";

export type CoursesDisplayProps = Either<
    {
        isSkeleton: true;
    },
    {
        isSkeleton?: boolean;
        queryFn: QueryFunction<Array<CourseDTO>>;
    }
>;

export const CoursesDisplay: FC<CoursesDisplayProps> = ({
    queryFn,
    isSkeleton,
}) => {
    const { data: courses } = useSchematicQuery({
        queryFn,
        enabled: !isSkeleton,
        schema: CourseSchema,
        queryKey: ["courses"],
        usesSuspense: !isSkeleton,
        parseFn: (data, schema) =>
            isSkeleton ? [] : data?.map((datum) => schema.parse(datum)),
    });

    const { data: images } = useExtendedQuery({
        enabled: !isSkeleton,
        queryKey: ["courses-images", courses],
        queryFn: () =>
            Promise.all(
                courses!.map(
                    async (course) =>
                        [
                            course.id,
                            course.image != null
                                ? (await fetch(course.image)).url
                                : undefined,
                        ] as const
                )
            ).then((entries) => Object.fromEntries(entries)),
    });

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8">
            {(isSkeleton ? new Array(20).fill(null) : courses!).map(
                (course, i) => (
                    <CourseCard
                        key={isSkeleton ? i : course.id}
                        isSkeleton={isSkeleton}
                        className="aspect-square"
                        course={{ ...course, image: images?.[course.id] }}
                    />
                )
            )}
        </div>
    );
};
