import { z } from "zod";

export function ZodGetDefaults<Schema extends z.AnyZodObject>(
    schema: Schema
): z.infer<Schema> {
    return Object.fromEntries(
        Object.entries(schema.shape).map(([key, value]) =>
            value instanceof z.ZodDefault
                ? [key, value._def.defaultValue()]
                : [key, undefined]
        )
    );
}
