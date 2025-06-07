import { z } from "zod";

export const LearningTrackSchema = z.object({
    image: z.string().optional(),
    id: z.string({ required_error: "required" }),
    title: z.string({ required_error: "required" }),
    description: z.string({ required_error: "required" }),
    rating: z
        .number({ required_error: "required" })
        .min(0, "minimum")
        .max(5, "maximum"),
    "rating-count": z
        .number({ required_error: "required" })
        .nonnegative("nonnegative")
        .int("integer"),
    "courses-count": z
        .number({ required_error: "required" })
        .nonnegative("nonnegative")
        .int("integer"),
    "specialized-count": z
        .number({ required_error: "required" })
        .nonnegative("nonnegative")
        .int("integer"),
    tags: z.array(z.string({ required_error: "required" }), {
        required_error: "required",
    }),
});

export const DetailedLearningTrackSchema = z.intersection(
    LearningTrackSchema,
    z.object({
        "detailed-description": z.string({
            required_error: "required",
        }),
        courses: z.array(z.string({ required_error: "required" }), {
            required_error: "required",
        }),
    })
);

export type LearningTrackDTO = z.infer<typeof LearningTrackSchema>;
export type DetailedLearningTrackDTO = z.infer<
    typeof DetailedLearningTrackSchema
>;
