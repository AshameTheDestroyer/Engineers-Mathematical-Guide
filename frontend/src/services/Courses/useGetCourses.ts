import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";
import { CreateFilterFunction } from "@/functions/CreateFilterFunction";
import {
    useSchematicQuery,
    UseSchematicQueryOptions,
} from "@/hooks/useSchematicQuery";

import courses_dummy_data from "@data/courses.dummy.json";

export const useGetCourses = <TUsesSuspense extends boolean = false>(
    searchQuery: string | undefined,
    options: Omit<
        UseSchematicQueryOptions<TUsesSuspense, any, any, Array<CourseDTO>>,
        "schema" | "queryFn" | "parseFn"
    >
) =>
    useSchematicQuery({
        schema: CourseSchema,
        queryFn: () =>
            courses_dummy_data.filter(
                CreateFilterFunction<CourseDTO>(searchQuery, {
                    title: (course, term) =>
                        course.title.toLowerCase().includes(term),
                    tags: (course, term) =>
                        course.tags.some((tag) => tag.includes(term)),
                })
            ),
        parseFn: (data, schema) => data?.map((datum) => schema.parse(datum)),
        ...options,
        queryKey: ["courses", ...options.queryKey],
    });
