import { QueryClient } from "@tanstack/react-query";
import { CourseDTO, CourseSchema } from "@/schemas/CourseSchema";
import { CreateFilterFunction } from "@/functions/CreateFilterFunction";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

import courses_dummy_data from "@data/courses.dummy.json";

export const GET_COURSES_KEY = "get-courses";

export const useGetCourses = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<CourseDTO>,
>(
    searchQuery: string | undefined,
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
                courses_dummy_data.filter(
                    CreateFilterFunction<CourseDTO>(searchQuery, {
                        title: (course, term) =>
                            course.title.toLowerCase().includes(term),
                        tags: (course, term) =>
                            course.tags.some((tag) => tag.includes(term)),
                    })
                ),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [
                GET_COURSES_KEY,
                searchQuery,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
