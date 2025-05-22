import { z } from "zod";

export const DetailedLearningTrackSchema = z.object({
    id: z.string({ required_error: "ID is required" }),
    image: z.string().optional(), // Optional unless specified
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Description is required" }),
    "detailed-description": z.string({
        required_error: "Detailed description is required",
    }),
    rating: z
        .number({ required_error: "Rating is required" })
        .min(0, { message: "Rating must be at least 0" })
        .max(5, { message: "Rating must be at most 5" }),
    "rating-count": z
        .number({ required_error: "Rating count is required" })
        .int()
        .nonnegative({
            message: "Rating count must be a non-negative integer",
        }),
    "courses-count": z
        .number({ required_error: "Courses count is required" })
        .int()
        .nonnegative({
            message: "Courses count must be a non-negative integer",
        }),
    "specialized-count": z
        .number({ required_error: "Specialized count is required" })
        .int()
        .nonnegative({
            message: "Specialized count must be a non-negative integer",
        }),
    tags: z.array(z.string({ required_error: "Each tag must be a string" }), {
        required_error: "Tags are required",
    }),
    courses: z.array(
        z.string({ required_error: "Each course must be a string" }),
        { required_error: "Courses are required" }
    ),
});
