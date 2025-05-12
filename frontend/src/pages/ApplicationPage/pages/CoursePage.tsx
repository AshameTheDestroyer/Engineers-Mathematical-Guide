import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Image } from "@/components/Image/Image";
import { useMockQuery } from "@/hooks/useMockQuery";
import { APPLICATION_ROUTES } from "@/routes/application.routes";

import dummy_data from "./dummy_data.json";
import { CourseSummary } from "../components/CourseSummary";

export const CoursePage: FC = () => {
    const { courseID } =
        useParams<keyof typeof APPLICATION_ROUTES.base.routes>();

    const { data } = useMockQuery({
        requestTime: 0,
        usesSuspense: true,
        queryKey: ["course"],
        dummyData: dummy_data,
    });

    const course = useMemo(
        () => data.find((datum) => datum.id == courseID),
        [data]
    );

    if (course == null) {
        throw new Error("Course not found.");
    }

    return (
        <main>
            <figure className="border-background-dark absolute inset-0 bottom-auto border-b-2 text-white">
                <CourseSummary course={course} />
                <Image
                    className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    source={course.image}
                    alternative={`Image of ${course.title} Course.`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>
        </main>
    );
};
