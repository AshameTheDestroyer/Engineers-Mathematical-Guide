import { z } from "zod";

export enum LessonTypeEnum {
    video = "video",
    reading = "reading",
    examination = "examination",
}

export type LessonType = ExtractEnumValue<LessonTypeEnum>;

const BaseLessonSchema = z.object({
    id: z.string({ required_error: "required" }),
    title: z.string({ required_error: "required" }),
});

export const VideoLessonSchema = z.intersection(
    BaseLessonSchema,
    z.object({
        type: z.nativeEnum(Object.pick(LessonTypeEnum, "video"), {
            errorMap: () => ({ message: "required" }),
        }),
        duration: z
            .number({ required_error: "required" })
            .nonnegative("nonnegative")
            .int("integer"),
        url: z.string({ required_error: "required" }).url("pattern"),
    })
);

export const ReadingLessonSchema = z.intersection(
    BaseLessonSchema,
    z.object({
        type: z.nativeEnum(Object.pick(LessonTypeEnum, "reading"), {
            errorMap: () => ({ message: "required" }),
        }),
        "estimated-reading-time": z
            .number({ required_error: "required" })
            .nonnegative("nonnegative")
            .int("integer")
            .default(0),
    })
);

// export const ExaminationLessonSchema = z.intersection(
//     BaseLessonSchema,
//     z.object({
//         type: z.nativeEnum(Object.pick(LessonTypeEnum, "examination"), {
//             errorMap: () => ({ message: "required" }),
//         }),
//     }),
//     z.array(z.object({}))
// );

export const ExaminationLessonSchema = z.intersection(
    BaseLessonSchema,
    z.object({
        type: z.nativeEnum(Object.pick(LessonTypeEnum, "examination"), {
            errorMap: () => ({ message: "required" }),
        }),
        time: z.number(),
        questions: z.array(
            z.object({
                question: z.string(),
                type: z.literal("choose"),
                //either choose or write
                options: z.array(z.string()).min(2),
                correctAnswer: z.string(),
                points: z.number().int().positive(),
            })
        ),
    })
);

export const LessonSchema = z.union([
    VideoLessonSchema,
    ReadingLessonSchema,
    ExaminationLessonSchema,
]);

export type VideoLessonDTO = z.infer<typeof VideoLessonSchema>;
export type ReadingLessonDTO = z.infer<typeof ReadingLessonSchema>;
export type ExaminationLessonDTO = z.infer<typeof ExaminationLessonSchema>;
export type LessonDTO = z.infer<typeof LessonSchema>;
