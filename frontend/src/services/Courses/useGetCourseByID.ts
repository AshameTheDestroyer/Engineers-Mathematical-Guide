import {
    DetailedCourseDTO,
    DetailedCourseSchema,
} from "@/schemas/CourseSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_courses_dummy_data from "@data/detailed_courses.dummy.json";

export const COURSE_KEY = "course";

export const useGetCourseByID = <TUsesSuspense extends boolean = false>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedCourseDTO,
        DetailedCourseDTO | undefined
    >
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedCourseDTO,
        DetailedCourseDTO | undefined
    >({
        schema: DetailedCourseSchema,
        queryFn: () =>
            detailed_courses_dummy_data.find((course) => course.id == id),
        parseFn: (data, schema) => (data != null ? schema.parse(data) : data),
        ...options,
        queryKey: [COURSE_KEY, id, ...(options?.queryKey ?? [])],
    });
