import { z } from "zod";

export function ZodGetKeys(schema: z.ZodType) {
    let keys = [] as Array<string>;

    if ("shape" in schema._def) {
        keys = [...Object.keys((schema._def.shape as any)())];
    }

    if ("left" in schema._def) {
        keys = [...keys, ...ZodGetKeys(schema._def.left as any)];
    }

    if ("right" in schema._def) {
        keys = [...keys, ...ZodGetKeys(schema._def.right as any)];
    }

    return keys;
}
