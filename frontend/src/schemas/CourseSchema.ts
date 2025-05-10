import { z } from "zod";

export const CourseSchema = z.object({
    id: z.string({ required_error: "required" }),
    title: z.string({ required_error: "required" }),
    description: z.string({ required_error: "required" }),
    rating: z
        .number({ required_error: "required" })
        .min(0, "minimum")
        .max(5, "maximum"),
    "rating-count": z
        .number({ required_error: "required" })
        .nonnegative("nonnegative"),
    "enrollment-count": z
        .number({ required_error: "required" })
        .nonnegative("nonnegative"),
});

export const DetailedCourseSchema = z.intersection(
    CourseSchema,
    z.object({
        chapters: z.array(z.string(), { required_error: "required" }),
        prerequisites: z.array(z.string(), { required_error: "required" }),
        postrequisites: z.array(z.string(), { required_error: "required" }),
        "exam-xp": z
            .number({ required_error: "required" })
            .nonnegative("nonnegative"),
        "exam-duration": z
            .number({ required_error: "required" })
            .min(10, "minimum")
            .max(90, "maximum"),
        "top-10-grades": z.array(
            z
                .number({ required_error: "required" })
                .min(0, "minimum")
                .max(100, "maximum")
        ),
    })
);

export type CourseDTO = z.infer<typeof CourseSchema>;
export type DetailedCourseDTO = z.infer<typeof DetailedCourseSchema>;
