import { QueryClient } from "@tanstack/react-query";
import { useGetCoursesByIDs } from "./useGetCoursesByIDs";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";
import { CourseDTO, DetailedCourseDTO } from "@/schemas/CourseSchema";

export const GET_POSTREQUISITE_COURSES_KEY = "get-postrequisite-courses";

export const useGetPostrequisiteCourses = <
    TUsesSuspense extends boolean = false,
>(
    course: DetailedCourseDTO,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>
    >,
    queryClient?: QueryClient
) =>
    useGetCoursesByIDs(
        course.postrequisites,
        {
            ...(options ?? ({} as typeof options & {})),
            queryKey: [
                GET_POSTREQUISITE_COURSES_KEY,
                course.id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
