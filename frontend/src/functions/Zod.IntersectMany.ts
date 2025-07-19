import { z, ZodEffects, ZodObject, ZodRawShape } from "zod";

export function ZodIntersectMany<
    T extends [
        ZodEffects<ZodObject<ZodRawShape>> | ZodObject<ZodRawShape>,
        ...Array<ZodEffects<ZodObject<ZodRawShape>> | ZodObject<ZodRawShape>>,
    ],
>(...schemas: T): z.ZodSchema<UnionToIntersection<z.infer<T[number]>>> {
    return schemas.reduceRight(z.intersection as any) as any;
}
