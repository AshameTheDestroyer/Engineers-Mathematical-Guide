import { useGetCourses } from "./useGetCourses";
import { CourseDTO } from "@/schemas/CourseSchema";
import { QueryClient } from "@tanstack/react-query";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";

export const SIMILAR_COURSES_LIMIT = 5;
export const GET_SIMILAR_COURSES_KEY = "get-similar-courses";

export const useGetSimilarCourses = <TUsesSuspense extends boolean = false>(
    course: CourseDTO,
    limit: number = SIMILAR_COURSES_LIMIT,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>
    >,
    queryClient?: QueryClient
) => {
    const { data: courses, ...result } = useGetCourses(
        course.tags.join(" "),
        {
            ...(options ?? ({} as typeof options & {})),
            queryKey: [
                GET_SIMILAR_COURSES_KEY,
                course.id,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );

    return {
        data: courses
            ?.filter((course_) => course_.id != course.id)
            ?.slice(0, limit),
        ...result,
    };
};
