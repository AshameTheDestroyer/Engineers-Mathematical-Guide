import { z } from "zod";
import { QuestionSchema } from "./QuestionSchema";

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
        url: z.string({ required_error: "required" }).url("pattern"),
        duration: z
            .number({ required_error: "required" })
            .int("integer")
            .nonnegative("nonnegative"),
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
            .int("integer")
            .nonnegative("nonnegative")
            .default(0),
    })
);

export const ExaminationLessonSchema = z.intersection(
    BaseLessonSchema,
    z.object({
        type: z.nativeEnum(Object.pick(LessonTypeEnum, "examination"), {
            errorMap: () => ({ message: "required" }),
        }),
        questions: z.array(QuestionSchema),
        time: z
            .number({ required_error: "required" })
            .int("integer")
            .nonnegative("nonnegative"),
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
