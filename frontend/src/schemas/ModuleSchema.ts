import { z } from "zod";

export const ModuleSchema = z.object({
    id: z.string("required"),
    title: z.string("required"),
    description: z.string("required"),
    "lesson-count": z
        .number("required")
        .nonnegative("nonnegative")
        .int("integer"),
});

export type ModuleDTO = z.infer<typeof ModuleSchema>;
