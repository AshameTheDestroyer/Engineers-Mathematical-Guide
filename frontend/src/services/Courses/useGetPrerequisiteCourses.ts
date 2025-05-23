import { useGetCoursesByIDs } from "./useGetCoursesByIDs";
import { InheritableQueryOptions } from "@/hooks/useSchematicQuery";
import { CourseDTO, DetailedCourseDTO } from "@/schemas/CourseSchema";

export const PREREQUISITE_COURSES_KEY = "prerequisite-courses";

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
            PREREQUISITE_COURSES_KEY,
            course.id,
            ...(options?.queryKey ?? []),
        ],
    });
