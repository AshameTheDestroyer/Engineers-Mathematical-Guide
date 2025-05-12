import { FC } from "react";
import { useParams } from "react-router-dom";
import { Image } from "@/components/Image/Image";
import { CourseSummary } from "../components/CourseSummary";
import { DetailedCourseSchema } from "@/schemas/CourseSchema";
import { useSchematicQuery } from "@/hooks/useSchematicQuery";
import { Typography } from "@/components/Typography/Typography";
import { APPLICATION_ROUTES } from "@/routes/application.routes";

import detailed_courses_dummy_data from "./detailed_courses.dummy.json";

export const CoursePage: FC = () => {
    const { courseID } =
        useParams<keyof typeof APPLICATION_ROUTES.base.routes>();

    const { data: course } = useSchematicQuery({
        usesSuspense: true,
        queryKey: ["course"],
        schema: DetailedCourseSchema,
        queryFn: () => detailed_courses_dummy_data,
        parseFn: (data, schema) => {
            const course = data?.find((datum) => datum.id == courseID);
            if (course == null) {
                throw new Error("Course Not Found");
            }
            return schema.parse(course);
        },
    });

    return (
        <main className="flex flex-col gap-8">
            <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
                <CourseSummary course={course} />
                <Image
                    className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    source={course.image}
                    alternative={`Image of ${course.title} Course.`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>
            <Typography variant="p">{course.description}</Typography>
            <Typography variant="p">
                {course["detailed-description"]}
            </Typography>
        </main>
    );
};
