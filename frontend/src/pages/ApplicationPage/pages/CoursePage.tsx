import { FC, Fragment } from "react";
import { twJoin } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { Title } from "@/components/Title/Title";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CardSummary } from "../components/CardSummary";
import { BorderedList } from "../components/BorderedList";
import { Separator } from "@/components/Separator/Separator";
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
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import course_enrollment_icon from "@icons/course_enrollment.svg";

import locales from "@localization/courses_page.json";

export const SIMILAR_COURSES_LIMIT = 5;
export const PREREQUISITE_COURSES_LIMIT = 5;
export const POSTREQUISITE_COURSES_LIMIT = 5;

export const CoursePage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    const { courseID } =
        useParams<keyof typeof APPLICATION_ROUTES.base.routes>();

    const { data: course } = useGetCourseByID(courseID, { usesSuspense: true });

    const similarCoursesQuery = useGetSimilarCourses(course, undefined, {
        enabled: course != null,
    });

    const prerequisiteCoursesQuery = useGetPrerequisiteCourses(course, {
        enabled: course != null,
    });

    const postrequisiteCoursesQuery = useGetPostrequisiteCourses(course, {
        enabled: course != null,
    });

    const skeletonArray = new Array(5).fill(null);

    const relatedCourses = [
        {
            query: similarCoursesQuery,
            locales: locales.profile["related-courses"].similar,
        },
        {
            query: prerequisiteCoursesQuery,
            locales: locales.profile["related-courses"].prerequisites,
        },
        {
            query: postrequisiteCoursesQuery,
            locales: locales.profile["related-courses"].postrequisites,
        },
    ];

    if (course == null) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title={GetLocale(locales.display["empty"].title, language)}
                paragraph={GetLocale(
                    locales.display["empty"].paragraph,
                    language
                ).replace(/\*\*([^\*]+)\*\*/, `**"${courseID}"**`)}
            />
        );
    }

    const RenderedRelatedCourses = (
        coursesData: (typeof relatedCourses)[number]
    ) => {
        const errorLocales = locales.profile["related-courses-error"];
        return (
            <Flexbox className="lg:col-span-2" gap="4" direction="column">
                <Locale className="text-lg font-bold" variant="h2">
                    {coursesData.locales.title}
                </Locale>
                <RelatedCoursesDisplay
                    {...coursesData.query}
                    skeletonArray={skeletonArray}
                    errorDisplay={{
                        title: GetLocale(errorLocales.title, language),
                        button: GetLocale(errorLocales.button, language),
                        paragraph: GetLocale(errorLocales.paragraph, language),
                    }}
                    emptyDisplay={{
                        title: GetLocale(
                            coursesData.locales.empty.title,
                            language
                        ),
                        paragraph: GetLocale(
                            coursesData.locales.empty.paragraph,
                            language
                        ).replace(/\*\*([^\*]+)\*\*/, `**"${course.title}"**`),
                    }}
                />
            </Flexbox>
        );
    };

    return (
        <Flexbox variant="main" direction="column" gap="8">
            <Title>{course.title}</Title>
            <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
                <CardSummary
                    className="[&_.icon]:drop-shadow-[3px_3px_1px_#0000007c] [&_.typography]:[text-shadow:2px_2px_2.5px_black]"
                    title={course.title}
                    rating={course.rating}
                    ratingCount={course["rating-count"]}
                    registerCount={course["enrollment-count"]}
                    registerParagraph={GetLocale(
                        locales.card.enrollment,
                        language
                    )}
                    reviewsParagraph={GetLocale(locales.card.reviews, language)}
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
                        source: course_enrollment_icon,
                    }}
                >
                    <Locale>{locales.profile.buttons["enroll-now"]}</Locale>
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
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.introduction}
                        </Locale>
                        <Typography
                            className={direction == "rtl" ? "text-end" : ""}
                            variant="p"
                            dir="ltr"
                        >
                            {course.description}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.description}
                        </Locale>
                        <Typography
                            className="text-justify"
                            dir="ltr"
                            variant="p"
                        >
                            {course["detailed-description"]}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.modules}
                        </Locale>
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
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.tags}
                        </Locale>
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
                            title={GetLocale(
                                locales.profile["top-10-students"],
                                language
                            )}
                            top-10-students={new Array(10)
                                .fill(null)
                                .map(() => ({ username: "", grade: 0 }))}
                        />
                    }
                >
                    <Top10StudentsDisplay
                        top-10-students={course["top-10-students"]}
                        title={GetLocale(
                            locales.profile["top-10-students"],
                            language
                        )}
                    />
                </LazyComponent>

                <Flexbox className="lg:col-span-2" direction="column" gap="4">
                    {relatedCourses.map((coursesData, i) => (
                        <Fragment key={i}>
                            {i > 0 && (
                                <Separator
                                    className="border-background-dark-hover"
                                    thickness="thick"
                                    orientation="horizontal"
                                />
                            )}
                            <RenderedRelatedCourses {...coursesData} />
                        </Fragment>
                    ))}
                </Flexbox>
            </main>
        </Flexbox>
    );
};
