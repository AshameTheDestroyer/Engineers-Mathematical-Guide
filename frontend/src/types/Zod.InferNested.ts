import { z } from "zod";

export type ZodInferNested<T extends Record<string, z.ZodType<any, any, any>>> =
    {
        [Key in keyof T]: z.infer<T[Key]>;
    };
