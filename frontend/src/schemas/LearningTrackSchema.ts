import { z } from "zod";

export const LearningTrackSchema = z.object({
    image: z.string().optional(),
    id: z.string("required"),
    title: z.string("required"),
    description: z.string("required"),
    "detailed-description": z.string("required"),
    rating: z.number("required").min(0, "minimum").max(5, "maximum"),
    "rating-count": z
        .number("required")
        .nonnegative("nonnegative")
        .int("integer"),
    "courses-count": z
        .number("required")
        .nonnegative("nonnegative")
        .int("integer"),
    "specialized-count": z
        .number("required")
        .nonnegative("nonnegative")
        .int("integer"),
    tags: z.array(z.string("required"), "required"),
});

export const DetailedLearningTrackSchema = z.intersection(
    LearningTrackSchema,
    z.object({
        courses: z.array(z.string("required"), "required"),
    })
);

export type LearningTrackDTO = z.infer<typeof LearningTrackSchema>;
export type DetailedLearningTrackDTO = z.infer<
    typeof DetailedLearningTrackSchema
>;
