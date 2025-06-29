import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { Title } from "@/components/Title/Title";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CardSummary } from "../components/CardSummary";
import { BorderedList } from "../components/BorderedList";
import { Typography } from "@/components/Typography/Typography";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { useGetCourseByID } from "@/services/Courses/useGetCourseByID";
import { Top10StudentsDisplay } from "../components/Top10StudentsDisplay";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { RelatedCoursesDisplay } from "../components/RelatedCoursesDisplay";
import { useGetSimilarCourses } from "@/services/Courses/useGetSimilarCourses";
import { useGetPrerequisiteCourses } from "@/services/Courses/useGetPrerequisiteCourses";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { useGetPostrequisiteCourses } from "@/services/Courses/useGetPostrequisiteCourses";

import enrollment_icon from "@icons/enrollment.svg";

export const SIMILAR_COURSES_LIMIT = 5;
export const PREREQUISITE_COURSES_LIMIT = 5;
export const POSTREQUISITE_COURSES_LIMIT = 5;

export const CoursePage: FC = () => {
    const { direction } = useLocalization();

    const { courseID } =
        useParams<keyof typeof APPLICATION_ROUTES.base.routes>();

    const { data: course } = useGetCourseByID(courseID, { usesSuspense: true });

    const similarCoursesQuery = useGetSimilarCourses(course);
    const prerequisiteCoursesQuery = useGetPrerequisiteCourses(course);
    const postrequisiteCoursesQuery = useGetPostrequisiteCourses(course);

    const skeletonArray = new Array(5).fill(null);

    return (
        <Flexbox variant="main" direction="column" gap="8">
            <Title>{course.title}</Title>
            <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
                <CardSummary
                    className="[&_.icon]:drop-shadow-[3px_3px_1px_#0000007c] [&_.typography]:[text-shadow:2px_2px_2.5px_black]"
                    title={course.title}
                    rating={course.rating}
                    ratingCount={course["rating-count"]}
                    registerParagraph="Enrolled Students"
                    registerCount={course["enrollment-count"]}
                />
                <Button
                    className={twJoin(
                        "absolute bottom-0 z-[1] translate-y-1/2",
                        direction == "ltr" ? "right-[6vw]" : "left-[6vw]"
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
                        <BorderedList
                            list={course.modules.map((modules) => ({
                                title: modules,
                                // TODO: Implement this.
                                path: "",
                                // path: APPLICATION_ROUTES.base.routes.courseID.MapVariable(
                                //     modules
                                // ),
                            }))}
                        />
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Tags
                        </Typography>
                        <Flexbox gap="3" wrap="wrap">
                            {course.tags.map((tag, i) => (
                                <Link
                                    key={i}
                                    className="bg-background-dark active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover cursor-pointer rounded-full px-3 py-1 transition duration-200"
                                    to={
                                        APPLICATION_ROUTES.base.routes.courses
                                            .absolute +
                                        "?" +
                                        new URLSearchParams({ query: tag })
                                    }
                                >
                                    {tag}
                                </Link>
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

                <Flexbox className="lg:col-span-2" direction="column" gap="4">
                    <Flexbox
                        className="lg:col-span-2"
                        gap="4"
                        direction="column"
                    >
                        <Typography className="text-lg font-bold" variant="h2">
                            Courses You Need to Finish First
                        </Typography>
                        <RelatedCoursesDisplay
                            {...prerequisiteCoursesQuery}
                            skeletonArray={skeletonArray}
                            errorDisplay={{
                                title: "Error!",
                                paragraph:
                                    "An unexpected error occurred, try refetching.",
                            }}
                            searchOffDisplay={{
                                title: "There Are None",
                                paragraph: `The course **${course.title}** has no prerequisite courses from what we offer.`,
                            }}
                        />
                    </Flexbox>
                    <Flexbox
                        className="lg:col-span-2"
                        gap="4"
                        direction="column"
                    >
                        <Typography className="text-lg font-bold" variant="h2">
                            Courses You Unlock When You Finish
                        </Typography>
                        <RelatedCoursesDisplay
                            {...postrequisiteCoursesQuery}
                            skeletonArray={skeletonArray}
                            errorDisplay={{
                                title: "Error!",
                                paragraph:
                                    "An unexpected error occurred, try refetching.",
                            }}
                            searchOffDisplay={{
                                title: "There Are None",
                                paragraph: `The course **${course.title}** has no postrequisite courses from what we offer.`,
                            }}
                        />
                    </Flexbox>
                    <Flexbox
                        className="lg:col-span-2"
                        gap="4"
                        direction="column"
                    >
                        <Typography className="text-lg font-bold" variant="h2">
                            Similar Courses
                        </Typography>
                        <RelatedCoursesDisplay
                            {...similarCoursesQuery}
                            skeletonArray={skeletonArray}
                            errorDisplay={{
                                title: "Error!",
                                paragraph:
                                    "An unexpected error occurred, try refetching.",
                            }}
                            searchOffDisplay={{
                                title: "There Are None",
                                paragraph: `The course **${course.title}** has no similar courses from what we offer.`,
                            }}
                        />
                    </Flexbox>
                </Flexbox>
            </main>
        </Flexbox>
    );
};
