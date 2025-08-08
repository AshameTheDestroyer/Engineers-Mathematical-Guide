import { FC } from "react";
import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
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

import locales from "@localization/modules_page.json";

export const ModulesPage: FC = () => {
    const { courseID } = useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { orientation } = useScreenSize();
    const { direction, language, GetLocale } = useLocalization();

    const { myUser } = useMain();

    const {
        data: course,
        isError: isCourseError,
        refetch: refetchCourse,
    } = useGetCourseByID(courseID, { usesSuspense: true });

    const {
        data: modules,
        isError: isModulesError,
        refetch: refetchModules,
    } = useGetModulesByIDs(course?.modules ?? [], {
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

    const modulesCheckpoints = modules.reduce(
        (accumulator, module, i) => {
            accumulator.array.push({
                value: (accumulator.counter += module["lesson-count"]),
                label: `M${i + 1}`,
            });
            return accumulator;
        },
        { array: [] as Array<{ value: number; label: string }>, counter: 0 }
    ).array;

    if (isCourseError || isModulesError) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="error"
                title={GetLocale(locales.display.error.title, language)}
                paragraph={GetLocale(locales.display.error.paragraph, language)}
                buttons={
                    <Button
                        onClick={(_e) =>
                            isCourseError
                                ? refetchCourse()
                                : isModulesError
                                  ? refetchModules()
                                  : {}
                        }
                    >
                        <Locale>{locales.display.error.button}</Locale>
                    </Button>
                }
            />
        );
    }

    if (course == null || modules.length == 0) {
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

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <Title>{`Modules of ${course.title}`}</Title>
            <CourseBanner course={course} />

            <Locale className="order-2 text-2xl font-bold" variant="h1">
                {locales.title}
            </Locale>
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
                        className="flex-1"
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

                    <Typography
                        className="text-xl font-bold max-md:text-lg"
                        variant="h1"
                    >
                        <Locale>{locales["total-progress"]}</Locale> (
                        {totalFinishedLessons}/{totalLessonCount})
                    </Typography>
                    <ProgressBar
                        className={twJoin(
                            "my-4 w-[calc(100%-2rem)] place-self-center max-md:[&_[data-checkpoint]:not(:nth-of-type(2))]:scale-75 md:[&_[data-checkpoint]:nth-of-type(2)]:scale-125",
                            totalFinishedLessons != totalLessonCount &&
                                totalFinishedLessons > 0
                                ? "[&_[data-checkpoint]:nth-of-type(2)]:z-1"
                                : "[&_[data-checkpoint]:last-of-type]:z-1"
                        )}
                        minimum={0}
                        maximum={totalLessonCount}
                        value={totalFinishedLessons}
                        checkpoints={[
                            totalFinishedLessons,
                            { value: 0, icon: { source: flag_icon } },
                            ...modulesCheckpoints,
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
