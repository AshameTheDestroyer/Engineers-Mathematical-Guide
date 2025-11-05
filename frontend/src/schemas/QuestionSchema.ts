import { z } from "zod";

export enum QuestionTypeEnum {
    choose = "choose",
    select = "select",
}

export type QuestionType = ExtractEnumValue<QuestionTypeEnum>;

export const QuestionSchema = z.intersection(
    z.object({
        title: z.string("required"),
        options: z
            .array(z.string("required"))
            .min(2, "minimum")
            .max(4, "maximum"),
        points: z.number("required").int("integer").nonnegative("nonnegative"),
    }),
    z.union([
        z.object({
            type: z.enum(Object.pick(QuestionTypeEnum, "choose"), "required"),
            answer: z
                .number("required")
                .int("integer")
                .min(0, "minimum")
                .max(3, "maximum"),
        }),
        z.object({
            type: z.enum(Object.pick(QuestionTypeEnum, "select"), "required"),
            answers: z
                .array(
                    z
                        .number("required")
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
