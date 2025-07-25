import { QueryClient } from "@tanstack/react-query";
import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import courses_dummy_data from "@data/courses.dummy.json";

export const GET_COURSES_BY_IDS_KEY = "get-courses-by-ids";

export const useGetCoursesByIDs = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<CourseDTO>,
>(
    ids: Array<string>,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>,
        TTransformFnData
    >(
        {
            schema: CourseSchema,
            queryFn: () =>
                ids
                    .map((id) =>
                        courses_dummy_data.find((course) => course.id == id)
                    )
                    .filter((course) => course != null),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [GET_COURSES_BY_IDS_KEY, ...(options?.queryKey ?? [])],
        },
        queryClient
    );
