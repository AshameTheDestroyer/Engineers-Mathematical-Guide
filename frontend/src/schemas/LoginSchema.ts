import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email("required"),
    password: z.string("required").min(8, "minimum").max(20, "maximum"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
