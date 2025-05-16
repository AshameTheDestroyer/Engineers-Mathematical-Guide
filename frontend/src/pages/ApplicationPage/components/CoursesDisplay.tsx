import { FC } from "react";
import { CourseCard } from "./CourseCard";
import { CourseSchema } from "@/schemas/CourseSchema";
import { useExtendedQuery } from "@/hooks/useExtendedQuery";
import { useSchematicQuery } from "@/hooks/useSchematicQuery";

import courses_dummy_data from "../pages/courses.dummy.json";

export type CoursesDisplayProps = {};

export const CoursesDisplay: FC<CoursesDisplayProps> = ({}) => {
    const { data: courses } = useSchematicQuery({
        usesSuspense: true,
        schema: CourseSchema,
        queryKey: ["courses"],
        queryFn: () => courses_dummy_data,
        parseFn: (data, schema) => data?.map((datum) => schema.parse(datum)),
    });

    const { data: images } = useExtendedQuery({
        queryKey: ["courses-images"],
        queryFn: () =>
            Promise.all(
                courses.map(
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
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    className="aspect-square"
                    course={{ ...course, image: images?.[course.id] }}
                />
            ))}
        </div>
    );
};
