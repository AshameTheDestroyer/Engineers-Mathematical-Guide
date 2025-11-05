import { z } from "zod";

export const EnrollmentSchema = z.object({
    course: z.string("required"),
    username: z.string("required"),
    progress: z.array(
        z.object({
            module: z.string("required"),
            grade: z.number().min(0, "minimum").max(100, "maximum").optional(),
            "finished-lessons": z
                .number("required")
                .min(0, "minimum")
                .int("int"),
        })
    ),
});

export type EnrollmentDTO = z.infer<typeof EnrollmentSchema>;
