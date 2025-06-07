import { useGetCoursesByIDs } from "./useGetCoursesByIDs";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";
import { CourseDTO, DetailedCourseDTO } from "@/schemas/CourseSchema";

export const GET_PREREQUISITE_COURSES_KEY = "get-prerequisite-courses";

export const useGetPrerequisiteCourses = <
    TUsesSuspense extends boolean = false,
>(
    course: DetailedCourseDTO,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        CourseDTO,
        Array<CourseDTO>
    >
) =>
    useGetCoursesByIDs(course.prerequisites, {
        ...(options ?? ({} as typeof options & {})),
        queryKey: [
            GET_PREREQUISITE_COURSES_KEY,
            course.id,
            ...(options?.queryKey ?? []),
        ],
    });
