import { z, ZodIntersection, ZodObject, ZodRawShape } from "zod";

export type ZodObjectLike =
    | ZodObject<ZodRawShape>
    | ZodIntersection<ZodObject<ZodRawShape>, ZodObject<ZodRawShape>>;

export function ZodIntersectMany<
    T extends [ZodObjectLike, ...Array<ZodObjectLike>]
>(...schemas: T): z.ZodSchema<UnionToIntersection<z.infer<T[number]>>> {
    return schemas.reduceRight(z.intersection as any) as any;
}
