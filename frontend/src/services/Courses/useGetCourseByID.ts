import { QueryClient } from "@tanstack/react-query";
import {
    DetailedCourseDTO,
    DetailedCourseSchema,
} from "@/schemas/CourseSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import detailed_courses_dummy_data from "@data/detailed_courses.dummy.json";

export const GET_COURSE_BY_ID_KEY = "get-course-by-id";

export const useGetCourseByID = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = DetailedCourseDTO | undefined,
>(
    id: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        DetailedCourseDTO,
        DetailedCourseDTO | undefined,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        DetailedCourseDTO,
        DetailedCourseDTO | undefined,
        TTransformFnData
    >(
        {
            schema: DetailedCourseSchema,
            queryFn: () =>
                detailed_courses_dummy_data.find((course) => course.id == id),
            ...options,
            queryKey: [GET_COURSE_BY_ID_KEY, id, ...(options?.queryKey ?? [])],
        },
        queryClient
    );
