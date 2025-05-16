import { FC, Fragment } from "react";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Image } from "@/components/Image/Image";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CourseSummary } from "../components/CourseSummary";
import { DetailedCourseSchema } from "@/schemas/CourseSchema";
import { useSchematicQuery } from "@/hooks/useSchematicQuery";
import { Typography } from "@/components/Typography/Typography";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { Top10StudentsDisplay } from "../components/Top10StudentsDisplay";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import enrollment_icon from "@icons/enrollment.svg";
import detailed_courses_dummy_data from "./detailed_courses.dummy.json";

export const CoursePage: FC = () => {
    const { direction } = useLocalization();

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
        <Flexbox variant="main" direction="column" gap="8">
            <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
                <CourseSummary course={course} />
                <Button
                    className={twJoin(
                        direction == "ltr" ? "right-[6vw]" : "left-[6vw]",
                        "absolute bottom-0 z-[1] translate-y-1/2"
                    )}
                    thickness="thick"
                    variant="primary"
                    icon={{
                        placement: "left",
                        source: enrollment_icon,
                    }}
                >
                    Enroll Now
                </Button>
                <Image
                    className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    source={course.image}
                    alternative={`Image of ${course.title} Course.`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>

            <main className="gap-page grid grid-cols-2 max-lg:grid-cols-1">
                <Flexbox variant="section" direction="column" gap="8">
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Introduction
                        </Typography>
                        <Typography variant="p">
                            {course.description}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Description
                        </Typography>
                        <Typography className="text-justify" variant="p">
                            {course["detailed-description"]}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Modules
                        </Typography>
                        <Flexbox
                            className="bg-background-normal border-background-darker rounded-lg border-2 p-4"
                            variant="ol"
                            direction="column"
                            gap="2"
                        >
                            {course.modules.map((module, i, array) => (
                                <Fragment key={i}>
                                    {i > 0 && (
                                        <hr className="border-background-darker border" />
                                    )}
                                    <Flexbox variant="li">
                                        <button
                                            className={twJoin(
                                                "active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover grow cursor-pointer p-4 text-start text-lg transition duration-200",
                                                i == 0
                                                    ? "rounded-t-lg"
                                                    : i == array.length - 1
                                                      ? "rounded-b-lg"
                                                      : ""
                                            )}
                                        >
                                            {module}
                                        </button>
                                    </Flexbox>
                                </Fragment>
                            ))}
                        </Flexbox>
                    </Flexbox>
                </Flexbox>
                <LazyComponent
                    skeleton={
                        <Top10StudentsDisplay
                            isSkeleton
                            top-10-students={new Array(10)
                                .fill(null)
                                .map(() => ({ username: "", grade: 0 }))}
                        />
                    }
                >
                    <Top10StudentsDisplay
                        top-10-students={course["top-10-students"]}
                    />
                </LazyComponent>
            </main>
        </Flexbox>
    );
};
