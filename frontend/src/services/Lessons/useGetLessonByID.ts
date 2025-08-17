import { LESSONS } from "@/constants/Lessons";
import { QueryClient } from "@tanstack/react-query";
import { LessonDTO, LessonSchema } from "@/schemas/LessonSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

export const GET_LESSON_BY_ID_KEY = "get-lesson-by-id";

export const useGetLessonByID = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = LessonDTO | undefined,
>(
    courseID: string | undefined,
    moduleID: string | undefined,
    lessonID: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        LessonDTO,
        LessonDTO | undefined,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        LessonDTO,
        LessonDTO | undefined,
        TTransformFnData
    >(
        {
            schema: LessonSchema,
            enabled: courseID != null && moduleID != null && lessonID != null,
            queryFn: () =>
                (
                    LESSONS[
                        courseID! as keyof typeof LESSONS
                    ] as Array<LessonDTO>
                ).find(
                    (lesson) =>
                        lesson.id ==
                        courseID!
                            .split("-")
                            .map((word) => word[0])
                            .join("") +
                            "-" +
                            moduleID +
                            "-" +
                            lessonID
                ),
            ...options,
            queryKey: [
                GET_LESSON_BY_ID_KEY,
                courseID,
                moduleID,
                lessonID,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
