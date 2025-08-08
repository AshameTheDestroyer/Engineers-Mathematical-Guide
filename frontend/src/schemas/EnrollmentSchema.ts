import { z } from "zod";

export const EnrollmentSchema = z.object({
    course: z.string({ required_error: "required" }),
    username: z.string({ required_error: "required" }),
    progress: z.array(
        z.object({
            module: z.string({ required_error: "required" }),
            grade: z.number().min(0, "minimum").max(100, "maximum").optional(),
            "finished-lessons": z
                .number({ required_error: "required" })
                .min(0, "minimum")
                .int("int"),
        })
    ),
});

export type EnrollmentDTO = z.infer<typeof EnrollmentSchema>;
