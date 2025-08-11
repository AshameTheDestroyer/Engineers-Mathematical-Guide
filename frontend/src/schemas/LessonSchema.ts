import { z } from "zod";

export enum LessonTypeEnum {
    video = "video",
    reading = "reading",
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
    })
);

export const LessonSchema = z.union([VideoLessonSchema, ReadingLessonSchema]);

export type VideoLessonDTO = z.infer<typeof VideoLessonSchema>;
export type ReadingLessonDTO = z.infer<typeof ReadingLessonSchema>;
export type LessonDTO = z.infer<typeof LessonSchema>;
