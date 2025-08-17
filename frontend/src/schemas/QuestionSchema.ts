import { z } from "zod";

export enum QuestionTypeEnum {
    choose = "choose",
    select = "select",
}

export type QuestionType = ExtractEnumValue<QuestionTypeEnum>;

export const QuestionSchema = z.intersection(
    z.object({
        title: z.string({ required_error: "required" }),
        options: z
            .array(z.string({ required_error: "required" }))
            .min(2, "minimum")
            .max(4, "maximum"),
        points: z
            .number({ required_error: "required" })
            .int("integer")
            .nonnegative("nonnegative"),
    }),
    z.union([
        z.object({
            type: z.nativeEnum(Object.pick(QuestionTypeEnum, "choose"), {
                errorMap: () => ({ message: "required" }),
            }),
            answer: z
                .number({ required_error: "required" })
                .int("integer")
                .min(0, "minimum")
                .max(3, "maximum"),
        }),
        z.object({
            type: z.nativeEnum(Object.pick(QuestionTypeEnum, "select"), {
                errorMap: () => ({ message: "required" }),
            }),
            answers: z
                .array(
                    z
                        .number({ required_error: "required" })
                        .int("integer")
                        .min(0, "minimum")
                        .max(3, "maximum")
                )
                .min(1, "minimum")
                .max(4, "maximum"),
        }),
    ])
);

export type QuestionDTO = z.infer<typeof QuestionSchema>;
