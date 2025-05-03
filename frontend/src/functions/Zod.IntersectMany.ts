import { z, ZodSchema } from "zod";

export function ZodIntersectMany(...schemas: Array<ZodSchema>) {
    return schemas.reduceRight((accumulator, schema) =>
        z.intersection(accumulator, schema)
    );
}
