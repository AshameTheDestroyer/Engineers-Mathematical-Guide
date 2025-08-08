import { z } from "zod";

export const ModuleSchema = z.object({
    id: z.string({ required_error: "required" }),
    title: z.string({ required_error: "required" }),
    description: z.string({ required_error: "required" }),
    "lesson-count": z
        .number({ required_error: "required" })
        .nonnegative("nonnegative")
        .int("int"),
});

export type ModuleDTO = z.infer<typeof ModuleSchema>;
