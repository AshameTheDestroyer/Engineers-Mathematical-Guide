import { useGetCoursesByIDs } from "./useGetCoursesByIDs";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";
import { CourseDTO, DetailedCourseDTO } from "@/schemas/CourseSchema";

export const useGetPostrequisiteCourses = <
    TUsesSuspense extends boolean = false,
>(
    course: DetailedCourseDTO,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>
    >
) =>
    useGetCoursesByIDs(course.postrequisites, {
        ...(options ?? ({} as typeof options & {})),
        queryKey: [
            "postrequisite-courses",
            course.id,
            ...(options?.queryKey ?? []),
        ],
    });
