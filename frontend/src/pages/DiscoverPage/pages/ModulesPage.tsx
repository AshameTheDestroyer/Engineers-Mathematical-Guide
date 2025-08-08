import { FC } from "react";
import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { ModuleCard } from "../components/ModuleCard";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CourseBanner } from "../components/CourseBanner";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Typography } from "@/components/Typography/Typography";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { useGetCourseByID } from "@/services/Courses/useGetCourseByID";
import { useGetModulesByIDs } from "@/services/Modules/useGetModulesByIDs";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useGetEnrollmentByID } from "@/services/Enrollments/useGetEnrollmentByID";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import flag_icon from "@icons/flag.svg";
import check_icon from "@icons/variant_success.svg";

export const ModulesPage: FC = () => {
    const { courseID } = useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { direction } = useLocalization();
    const { orientation } = useScreenSize();

    const { myUser } = useMain();
    const { data: course } = useGetCourseByID(courseID, { usesSuspense: true });
    const { data: modules } = useGetModulesByIDs(course?.modules ?? [], {
        usesSuspense: true,
        enabled: courseID != null,
    });
    const { data: enrollment } = useGetEnrollmentByID(
        courseID,
        myUser?.username,
        { usesSuspense: true, enabled: courseID != null && myUser != null }
    );

    const totalFinishedLessons =
        enrollment?.progress.reduce(
            (accumulator, progress) =>
                accumulator + progress["finished-lessons"],
            0
        ) ?? 0;
    const totalLessonCount = modules.reduce(
        (accumulator, module) => accumulator + module["lesson-count"],
        0
    );

    const averageGrade =
        enrollment != null &&
        enrollment.progress.every((progress) => progress.grade != null)
            ? enrollment.progress.reduce(
                  (accumulator, progress) => accumulator + progress.grade!,
                  0
              ) / enrollment.progress.length
            : undefined;

    if (course == null) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title="Course not Found"
                paragraph={`Couldn't find the course **${courseID}**, sorry not sorry.`}
                // title={GetLocale(locales.display["empty"].title, language)}
                // paragraph={GetLocale(
                //     locales.display["empty"].paragraph,
                //     language
                // ).replace(/\*\*([^\*]+)\*\*/, `**"${courseID}"**`)}
            />
        );
    }

    if (modules.length == 0) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title="Modules not Found"
                paragraph={`Couldn't find the modules for the course **${courseID}**, sorry not sorry.`}
                // title={GetLocale(locales.display["empty"].title, language)}
                // paragraph={GetLocale(
                //     locales.display["empty"].paragraph,
                //     language
                // ).replace(/\*\*([^\*]+)\*\*/, `**"${courseID}"**`)}
            />
        );
    }

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <Title>{`Modules of ${course.title}`}</Title>
            <CourseBanner course={course} />

            <Typography className="order-2 text-2xl font-bold" variant="h1">
                Modules
            </Typography>
            <Flexbox
                className={twJoin(
                    "order-3",
                    orientation == "landscape" && "overflow-auto py-6 pb-4"
                )}
                gap={orientation == "landscape" ? 4 : 8}
                direction={orientation == "landscape" ? "row" : "column"}
            >
                {modules.map((module, i) => (
                    <ModuleCard
                        key={i}
                        module={module}
                        courseID={course.id}
                        enrollment={enrollment}
                    />
                ))}
            </Flexbox>

            {enrollment != null && (
                <Flexbox
                    className={twJoin(
                        "bg-background-normal relative rounded-lg p-6",
                        orientation == "portrait" ? "order-1" : "order-4"
                    )}
                    gap="4"
                    direction="column"
                >
                    {totalFinishedLessons == totalLessonCount &&
                        averageGrade != null && (
                            <span
                                className={twJoin(
                                    direction == "ltr"
                                        ? "right-4 translate-x-1/2"
                                        : "left-4 -translate-x-1/2",
                                    "z-1 bg-vibrant-green-normal border-vibrant-green-dark absolute top-4 flex aspect-square min-w-[calc(5ch+1rem)] -translate-y-1/2 place-content-center place-items-center rounded-full border-2 text-center font-bold text-white"
                                )}
                            >
                                <p className="scale-80">
                                    {Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(averageGrade)}
                                    %
                                </p>
                            </span>
                        )}

                    <Typography className="text-xl font-bold" variant="h1">
                        Total Progress
                    </Typography>
                    <ProgressBar
                        className={twJoin(
                            "my-4 w-[calc(100%-2rem)] place-self-center",
                            totalFinishedLessons != totalLessonCount
                                ? "[&_[data-checkpoint]:nth-of-type(2)]:z-1"
                                : "[&_[data-checkpoint]:last-of-type]:z-1"
                        )}
                        minimum={0}
                        maximum={totalLessonCount}
                        value={totalFinishedLessons}
                        checkpoints={[
                            totalFinishedLessons,
                            { value: 0, icon: { source: flag_icon } },
                            totalFinishedLessons != totalLessonCount
                                ? totalLessonCount
                                : {
                                      value: totalLessonCount,
                                      icon: { source: check_icon },
                                  },
                        ]}
                    />
                </Flexbox>
            )}
        </Flexbox>
    );
};
