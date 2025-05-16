import { FC } from "react";
import { CourseCard } from "./CourseCard";
import { useExtendedQuery } from "@/hooks/useExtendedQuery";
import { useSchematicQuery } from "@/hooks/useSchematicQuery";
import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";

import courses_dummy_data from "../pages/courses.dummy.json";

export type CoursesDisplayProps = {
    isSkeleton?: boolean;
    searchQuery?: string;
};

export const CoursesDisplay: FC<CoursesDisplayProps> = ({
    isSkeleton,
    searchQuery,
}) => {
    const { data: courses } = useSchematicQuery({
        enabled: !isSkeleton,
        schema: CourseSchema,
        queryKey: ["courses", searchQuery],
        _optimisticResults: "optimistic",
        usesSuspense: !isSkeleton,
        queryFn: () =>
            Promise.wait(2000, courses_dummy_data.filter(FilterBySearchQuery)),
        parseFn: (data, schema) =>
            isSkeleton ? [] : data?.map((datum) => schema.parse(datum)),
    });

    const { data: images } = useExtendedQuery({
        enabled: !isSkeleton,
        queryKey: ["courses-images", searchQuery],
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

    function FilterBySearchQuery(course: CourseDTO) {
        if (searchQuery == null || searchQuery == "") {
            return true;
        }

        const terms = searchQuery.toLowerCase().split(" ");
        return terms.some(
            (term) =>
                course.title.toLowerCase().includes(term) ||
                course.tags.some((tag) =>
                    tag
                        .toLocaleLowerCase()
                        .split(" ")
                        .some((word) => word.includes(term))
                )
        );
    }

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
