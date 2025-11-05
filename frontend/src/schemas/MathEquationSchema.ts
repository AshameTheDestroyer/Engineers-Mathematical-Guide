import { z } from "zod";

export enum MathEquationLevelEnum {
    basic = "basic",
    advanced = "advanced",
    intermediate = "intermediate",
}

export type MathEquationLevel = ExtractEnumValue<MathEquationLevelEnum>;

export const MathEquationSchema = z.object({
    id: z.string("required"),
    title: z.string("required"),
    equation: z.string("required"),
    description: z.string("required"),
    level: z.enum(MathEquationLevelEnum, "required"),
});

export const DetailedMathEquationSchema = z.intersection(
    MathEquationSchema,
    z.object({
        discoverer: z.string("required"),
        "related-courses": z.array(z.string("required"), "required"),
    })
);

export type MathEquationDTO = z.infer<typeof MathEquationSchema>;
export type DetailedMathEquationDTO = z.infer<
    typeof DetailedMathEquationSchema
>;
