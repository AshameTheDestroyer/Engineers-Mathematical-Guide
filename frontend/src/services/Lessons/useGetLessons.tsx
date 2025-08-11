import { LESSONS } from "@/constants/Lessons";
import { QueryClient } from "@tanstack/react-query";
import { LessonDTO, LessonSchema } from "@/schemas/LessonSchema";
import {
    useSchematicQuery,
    InheritableQueryOptions,
} from "@/hooks/useSchematicQuery";

export const GET_LESSONS_KEY = "get-lessons";

export const useGetLessons = <
    TUsesSuspense extends boolean = false,
    TTransformFnData = Array<LessonDTO>,
>(
    courseID: string | undefined,
    moduleID: string | undefined,
    options?: InheritableQueryOptions<
        TUsesSuspense,
        LessonDTO,
        Array<LessonDTO>,
        TTransformFnData
    >,
    queryClient?: QueryClient
) =>
    useSchematicQuery<
        TUsesSuspense,
        LessonDTO,
        Array<LessonDTO>,
        TTransformFnData
    >(
        {
            schema: LessonSchema,
            enabled: courseID != null && moduleID != null,
            queryFn: () =>
                (
                    LESSONS[
                        courseID! as keyof typeof LESSONS
                    ] as Array<LessonDTO>
                ).filter((lesson) =>
                    lesson.id.startsWith(
                        courseID!
                            .split("-")
                            .map((word) => word[0])
                            .join("") +
                            "-" +
                            moduleID
                    )
                ),
            parseFn: (data, schema) =>
                data?.map((datum) => schema.parse(datum)) ?? [],
            ...options,
            queryKey: [
                GET_LESSONS_KEY,
                courseID,
                moduleID,
                ...(options?.queryKey ?? []),
            ],
        },
        queryClient
    );
