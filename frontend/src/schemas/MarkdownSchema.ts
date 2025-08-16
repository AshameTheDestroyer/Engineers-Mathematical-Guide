import { z } from "zod";

export const BaseMarkdownSchema = z.object({
    props: z.object({}).optional(),
    element: z.string({ required_error: "required" }),
    children: z.union([z.string(), z.array(z.any())]).optional(),
});

export const MarkdownSchema = z
    .intersection(BaseMarkdownSchema, z.object({}))
    .superRefine(({ children }) => {
        if (children == null) {
            return true;
        }

        if (typeof children == "string") {
            return true;
        }

        return children
            .map((child) => {
                const { error } = BaseMarkdownSchema.safeParse(child);
                if (error) {
                    return false;
                }

                return true;
            })
            .every(Boolean);
    });

export type MarkdownDTO = Omit<
    z.infer<typeof MarkdownSchema>,
    "children" | "props"
> & {
    children?: Array<MarkdownDTO> | string;
    props?: Record<string, Primitive>;
};
