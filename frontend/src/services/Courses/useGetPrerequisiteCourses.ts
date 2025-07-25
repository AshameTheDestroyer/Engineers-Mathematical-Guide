import { QueryClient } from "@tanstack/react-query";
import { useGetCoursesByIDs } from "./useGetCoursesByIDs";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";
import { CourseDTO, DetailedCourseDTO } from "@/schemas/CourseSchema";

export const GET_PREREQUISITE_COURSES_KEY = "get-prerequisite-courses";

export const useGetPrerequisiteCourses = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<CourseDTO>,
>(
    course: DetailedCourseDTO | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useGetCoursesByIDs(
        course?.prerequisites ?? [],
        {
            ...(options ?? ({} as typeof options & {})),
            queryKey: [
                GET_PREREQUISITE_COURSES_KEY,
                course?.id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
