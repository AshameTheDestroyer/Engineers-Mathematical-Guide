import { z } from "zod";

export const CourseSchema = z.object({
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
    "enrollment-count": z
        .number({ required_error: "required" })
        .nonnegative("nonnegative")
        .int("integer"),
    tags: z.array(z.string({ required_error: "required" }), {
        required_error: "required",
    }),
    locked: z.boolean({ required_error: "required" }),
});

export const DetailedCourseSchema = z.intersection(
    CourseSchema,
    z.object({
        modules: z.array(z.string(), { required_error: "required" }),
        "detailed-description": z.string({ required_error: "required" }),
        prerequisites: z.array(z.string(), { required_error: "required" }),
        postrequisites: z.array(z.string(), { required_error: "required" }),
        "exam-xp": z
            .number({ required_error: "required" })
            .nonnegative("nonnegative"),
        "exam-duration": z
            .number({ required_error: "required" })
            .min(10, "minimum")
            .max(90, "maximum"),
        "top-10-students": z
            .array(
                z.object({
                    username: z.string({ required_error: "required" }),
                    grade: z
                        .number({ required_error: "required" })
                        .min(0, "minimum")
                        .max(100, "maximum"),
                })
            )
            .transform((students) =>
                students.toSorted(
                    (student1, student2) => student2.grade - student1.grade
                )
            ),
    })
);

export type CourseDTO = z.infer<typeof CourseSchema>;
export type DetailedCourseDTO = z.infer<typeof DetailedCourseSchema>;
