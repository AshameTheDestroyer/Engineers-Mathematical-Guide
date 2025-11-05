import { z } from "zod";

export const CourseSchema = z.object({
    image: z.string().optional(),
    id: z.string("required"),
    title: z.string("required"),
    description: z.string("required"),
    rating: z.number("required").min(0, "minimum").max(5, "maximum"),
    "rating-count": z
        .number("required")
        .nonnegative("nonnegative")
        .int("integer"),
    "enrollment-count": z
        .number("required")
        .nonnegative("nonnegative")
        .int("integer"),
    tags: z.array(z.string("required"), "required"),
    locked: z.boolean("required"),
});

export const DetailedCourseSchema = z.intersection(
    CourseSchema,
    z.object({
        modules: z.array(z.string(), "required"),
        "detailed-description": z.string("required"),
        prerequisites: z.array(z.string(), "required"),
        postrequisites: z.array(z.string(), "required"),
        "exam-xp": z.number("required").nonnegative("nonnegative"),
        "exam-duration": z
            .number("required")
            .min(10, "minimum")
            .max(90, "maximum"),
        "top-10-students": z
            .array(
                z.object({
                    username: z.string("required"),
                    grade: z
                        .number("required")
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
