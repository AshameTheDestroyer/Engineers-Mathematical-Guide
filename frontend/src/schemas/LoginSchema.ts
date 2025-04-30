import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({ required_error: "required" }).email("pattern"),
    password: z
        .string({ required_error: "required" })
        .min(8, "minimum")
        .max(20, "maximum"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
