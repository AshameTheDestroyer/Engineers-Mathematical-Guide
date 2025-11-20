import { LessonDTO } from "@/schemas/LessonSchema";
import calculus_i_lessons from "@data/lessons/calculus_i_lessons.dummy.json";
import calculus_ii_lessons from "@data/lessons/calculus_ii_lessons.dummy.json";
import linear_algebra_lessons from "@data/lessons/linear_algebra_lessons.dummy.json";

export const LESSONS = {
    "calculus-i": calculus_i_lessons,
    "calculus-ii": calculus_ii_lessons,
    "linear-algebra": linear_algebra_lessons,
} as Record<string, Array<LessonDTO>>;
