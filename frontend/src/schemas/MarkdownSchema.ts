import { z } from "zod";

const BaseMarkdownSchema = z.object({
    element: z.string(),
    props: z
        .record(
            z.union([
                z.string(),
                z.number(),
                z.boolean(),
                z.null(),
                z.undefined(),
            ])
        )
        .optional(),
});

type BaseMarkdownDTO = z.infer<typeof BaseMarkdownSchema>;
export type MarkdownDTO = BaseMarkdownDTO & {
    children?: string | Array<MarkdownDTO>;
};

export const MarkdownSchema: z.ZodType<MarkdownDTO> = z.intersection(
    BaseMarkdownSchema,
    z.lazy(() =>
        z.object({
            children: z
                .union([
                    z.string().optional(),
                    z.array(MarkdownSchema).optional(),
                ])
                .optional(),
        })
    )
);
