import { z } from "zod";

export function ZodGetDefaults<Schema extends z.ZodObject>(schema: Schema) {
    return Object.fromEntries(
        Object.entries(schema.shape).map(([key, value]) =>
            value instanceof z.ZodDefault
                ? [key, value.def.defaultValue]
                : [key, undefined]
        )
    ) as z.infer<Schema>;
}
