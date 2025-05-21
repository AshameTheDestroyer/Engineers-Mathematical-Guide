import { CourseCard } from "./CourseCard";
import { FC, PropsWithChildren } from "react";
import { useExtendedQuery } from "@/hooks/useExtendedQuery";
import { useGetCourses } from "@/services/Courses/useGetCourses";
import { UseSchematicQueryOptions } from "@/hooks/useSchematicQuery";

export type CoursesDisplayProps = Either<
    {
        isSkeleton: true;
        cardLimit?: number;
    },
    {
        searchQuery: string;
        isSkeleton?: boolean;
        emptyQueryDisplay?: PropsWithChildren["children"];
    } & Partial<Pick<UseSchematicQueryOptions, "queryKey">>
>;

export const CoursesDisplay: FC<CoursesDisplayProps> = ({
    queryKey,
    isSkeleton,
    searchQuery,
    cardLimit = 20,
    emptyQueryDisplay,
}) => {
    const { data: courses } = useGetCourses(searchQuery, {
        enabled: !isSkeleton,
        queryKey: queryKey ?? [],
        usesSuspense: !isSkeleton,
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

    const coursesArray = isSkeleton
        ? new Array(cardLimit).fill(null)
        : courses!;

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
