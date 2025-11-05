import { z } from "zod";
import { ZodInferNested } from "src/types/Zod.InferNested";

export const ForgotPasswordStepSchemas = {
    "code-request": z.object({
        email: z.email("required"),
    }),
    "code-verification": z.object({
        code: z.string("required").length(6, "length"),
    }),
    "reset-password": z
        .object({
            password: z.string("required").min(8, "minimum").max(20, "maximum"),
            "confirm-password": z.string("required"),
        })
        .refine((data) => data.password == data["confirm-password"], {
            message: "match",
            path: ["confirm-password"],
        }),
};

export type ForgotPasswordStepsDTO = ZodInferNested<
    typeof ForgotPasswordStepSchemas
>;
