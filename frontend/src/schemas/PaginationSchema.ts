import { z } from "zod";

export const CreatePaginationSchema = <T extends z.Schema>(schema: T) => {
    return z
        .object({
            items: z.array(schema, { required_error: "required" }),
            page: z
                .number({ required_error: "required" })
                .nonnegative("nonnegative"),
            total: z
                .number({ required_error: "required" })
                .nonnegative("nonnegative"),
            limit: z
                .number({ required_error: "required" })
                .nonnegative("nonnegative"),
        })
        .refine((data) => data.limit <= data.total, {
            path: ["limit"],
            message: "limitation",
        });
};

export type PaginationDTO<T extends z.Schema> = z.infer<
    ReturnType<typeof CreatePaginationSchema<T>>
>;
