import { z } from "zod";

export enum MathEquationLevelEnum {
    basic = "basic",
    advanced = "advanced",
    intermediate = "intermediate",
}

export type MathEquationLevel = ExtractEnumValue<MathEquationLevelEnum>;

export const MathEquationSchema = z.object({
    id: z.string({ required_error: "required" }),
    title: z.string({ required_error: "required" }),
    equation: z.string({ required_error: "required" }),
    description: z.string({ required_error: "required" }),
    level: z.nativeEnum(MathEquationLevelEnum, {
        errorMap: () => ({ message: "required" }),
    }),
});

export const DetailedMathEquationSchema = z.intersection(
    MathEquationSchema,
    z.object({
        discoverer: z.string({ required_error: "required" }),
        "related-courses": z.array(z.string({ required_error: "required" }), {
            required_error: "required",
        }),
    })
);

export type MathEquationDTO = z.infer<typeof MathEquationSchema>;
export type DetailedMathEquationDTO = z.infer<
    typeof DetailedMathEquationSchema
>;
