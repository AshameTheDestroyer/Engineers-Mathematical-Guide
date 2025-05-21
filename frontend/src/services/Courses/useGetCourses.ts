import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";
import { FilterBySearchQuery } from "@/pages/ApplicationPage/functions/FilterBySearchQuery";
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
            courses_dummy_data.filter((course) =>
                FilterBySearchQuery(course, searchQuery)
            ),
        parseFn: (data, schema) => data?.map((datum) => schema.parse(datum)),
        ...options,
        queryKey: ["courses", ...options.queryKey],
    });
