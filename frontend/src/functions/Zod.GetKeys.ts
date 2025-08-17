import { z } from "zod";

export function ZodGetKeys(schema: z.ZodType) {
    let keys = [] as Array<string>;

    if ("_cached" in schema) {
        keys = [...(schema._cached as any).keys];
    }

    if ("left" in schema._def) {
        keys = [...keys, ...ZodGetKeys(schema._def.left as any)];
    }

    if ("right" in schema._def) {
        keys = [...keys, ...ZodGetKeys(schema._def.right as any)];
    }

    return keys;
}
