import { z } from "zod";

export function ZodGetKeys(schema: z.ZodType) {
    let keys = [] as Array<string>;

    if ("shape" in schema.def) {
        keys = [...Object.keys((schema.def.shape as any)())];
    }

    if ("left" in schema.def) {
        keys = [...keys, ...ZodGetKeys(schema.def.left as any)];
    }

    if ("right" in schema.def) {
        keys = [...keys, ...ZodGetKeys(schema.def.right as any)];
    }

    return keys;
}
