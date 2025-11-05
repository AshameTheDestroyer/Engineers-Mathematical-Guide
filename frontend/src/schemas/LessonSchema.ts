import { z } from "zod";
import { QuestionSchema } from "./QuestionSchema";

export enum LessonTypeEnum {
    video = "video",
    reading = "reading",
    examination = "examination",
}

export type LessonType = ExtractEnumValue<LessonTypeEnum>;

const BaseLessonSchema = z.object({
    id: z.string("required"),
    title: z.string("required"),
});

export const VideoLessonSchema = z.intersection(
    BaseLessonSchema,
    z.object({
        type: z.enum(Object.pick(LessonTypeEnum, "video"), "required"),
        url: z.url("required"),
        duration: z
            .number("required")
            .int("integer")
            .nonnegative("nonnegative"),
    })
);

export const ReadingLessonSchema = z.intersection(
    BaseLessonSchema,
    z.object({
        type: z.enum(Object.pick(LessonTypeEnum, "reading"), "required"),
        "estimated-reading-time": z
            .number("required")
            .int("integer")
            .nonnegative("nonnegative")
            .default(0),
    })
);

export const ExaminationLessonSchema = z.intersection(
    BaseLessonSchema,
    z.object({
        type: z.enum(Object.pick(LessonTypeEnum, "examination"), "required"),
        questions: z.array(QuestionSchema),
        time: z.number("required").int("integer").nonnegative("nonnegative"),
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
