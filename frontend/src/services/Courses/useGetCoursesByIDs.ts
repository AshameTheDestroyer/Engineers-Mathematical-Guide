import { QueryClient } from "@tanstack/react-query";
import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import courses_dummy_data from "@data/courses.dummy.json";

export const GET_COURSES_BY_IDS_KEY = "get-courses-by-ids";

export const useGetCoursesByIDs = <TUsesSuspense extends boolean = false>(
    ids: Array<string>,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<TUsesSuspense, CourseDTO, Array<CourseDTO>>(
        {
            schema: CourseSchema,
            queryFn: () =>
                ids
                    .map((id) =>
                        courses_dummy_data.find((course) => course.id == id)
                    )
                    .filter((id) => id != null),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [GET_COURSES_BY_IDS_KEY, ...(options?.queryKey ?? [])],
        },
        queryClient
    );
