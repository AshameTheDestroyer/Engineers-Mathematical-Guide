import { CourseCard } from "./CourseCard";
import { FC, PropsWithChildren } from "react";
import { QueryFunction } from "@tanstack/react-query";
import { useExtendedQuery } from "@/hooks/useExtendedQuery";
import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";
import {
    useSchematicQuery,
    UseSchematicQueryOptions,
} from "@/hooks/useSchematicQuery";

export type CoursesDisplayProps = Either<
    {
        isSkeleton: true;
    },
    {
        isSkeleton?: boolean;
        queryFn: QueryFunction<Array<CourseDTO>>;
        emptyQueryDisplay?: PropsWithChildren["children"];
    } & Partial<Pick<UseSchematicQueryOptions<CourseDTO>, "queryKey">>
>;

export const CoursesDisplay: FC<CoursesDisplayProps> = ({
    queryFn,
    queryKey,
    isSkeleton,
    emptyQueryDisplay,
}) => {
    const { data: courses } = useSchematicQuery({
        queryFn,
        enabled: !isSkeleton,
        schema: CourseSchema,
        usesSuspense: !isSkeleton,
        queryKey: ["courses", ...(queryKey ?? [""])],
        parseFn: (data, schema) =>
            isSkeleton ? [] : data?.map((datum) => schema.parse(datum)),
    });

    const { data: images } = useExtendedQuery({
        enabled: !isSkeleton,
        queryKey: ["courses-images", courses, ...(queryKey ?? [""])],
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

    const coursesArray = isSkeleton ? new Array(20).fill(null) : courses!;

    if (coursesArray.length == 0) {
        return emptyQueryDisplay;
    }

    return (
        <div className="grid grow grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8">
            {coursesArray.map((course, i) => (
                <CourseCard
                    key={isSkeleton ? i : course.id}
                    isSkeleton={isSkeleton}
                    className="aspect-square"
                    course={{ ...course, image: images?.[course.id] }}
                />
            ))}
        </div>
    );
};
