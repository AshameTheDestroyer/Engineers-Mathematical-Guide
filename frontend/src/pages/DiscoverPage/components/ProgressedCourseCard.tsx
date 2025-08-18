import { FC } from "react";
import { useMain } from "@/contexts";
import { CourseCard } from "./CourseCard";
import { useShadow } from "@/hooks/useShadow";
import { useNavigate } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { useGetCourseByID } from "@/services/Courses/useGetCourseByID";
import { useGetModulesByIDs } from "@/services/Modules/useGetModulesByIDs";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { BlurredContainer } from "@/components/BlurredContainer/BlurredContainer";
import { useGetEnrollmentByID } from "@/services/Enrollments/useGetEnrollmentByID";

import flag_icon from "@icons/flag.svg";
import check_icon from "@icons/variant_success.svg";

import locales from "@localization/learning_tracks_page.json";

export type ProgressedCourseCardProps =
    ChildlessComponentProps<HTMLDivElement> & {
        courseID: string;
    };

export const ProgressedCourseCard: FC<ProgressedCourseCardProps> = ({
    id,
    ref,
    courseID,
    className,
}) => {
    const shadow = useShadow();
    const Navigate = useNavigate();

    const { myUser } = useMain();
    const { isDarkThemed } = useThemeMode();

    const {
        refetch,
        isError,
        isLoading,
        data: course,
    } = useGetCourseByID(courseID, { usesSuspense: true });

    const { data: enrollment } = useGetEnrollmentByID(
        course?.id,
        myUser?.username,
        { enabled: course != null, usesSuspense: true }
    );

    const { data: modules } = useGetModulesByIDs(course?.modules ?? [], {
        enabled: course != null,
        usesSuspense: true,
    });

    const finishedLessons =
        enrollment?.progress.reduce(
            (accumulator, progress) =>
                accumulator + progress["finished-lessons"],
            0
        ) ?? 0;

    const lessonCount = modules.reduce(
        (accumulator, module) => accumulator + module["lesson-count"],
        0
    );

    const grade =
        enrollment != null &&
        enrollment.progress.every((progress) => progress.grade != null)
            ? enrollment.progress.reduce(
                  (accumulator, progress) => accumulator + progress.grade!,
                  0
              ) / enrollment.progress.length
            : undefined;

    const haveIEnrolled = enrollment != null;
    const haveIFinished = finishedLessons == lessonCount && grade != null;

    if (isLoading || course == null) {
        return <CourseCard className="aspect-square" isSkeleton />;
    }

    if (isError) {
        return (
            <Button onClick={(_e) => refetch()}>
                <Locale>{locales.profile.courses.error.button}</Locale>
            </Button>
        );
    }

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                "border-background-darker relative cursor-pointer rounded-lg border-2 p-6 text-white transition duration-200 [&:is(:hover,:focus-within)]:scale-105",
                isDarkThemed
                    ? "bg-background-normal/50"
                    : "bg-foreground-darker/75",
                className
            )}
            gap="8"
            direction="column"
            style={{ boxShadow: shadow }}
            onClick={(_e) =>
                Navigate(
                    DISCOVER_ROUTES.base.routes.courseID.MapVariable(course.id)
                )
            }
        >
            {grade != null && (
                <span className="z-1 bg-vibrant-green-normal border-vibrant-green-dark absolute left-2.5 top-2.5 flex aspect-square min-w-[calc(5ch+0.75rem)] -translate-x-1/2 -translate-y-1/2 place-content-center place-items-center rounded-full border-2 text-center font-bold text-white">
                    <p className="scale-80">
                        {Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }).format(grade)}
                        %
                    </p>
                </span>
            )}

            <BlurredContainer
                className="-m-6 aspect-square h-auto w-auto rounded-lg"
                blurType={myUser == null ? "none" : "bottom"}
            >
                <CourseCard
                    className="[&:is(:hover,:focus-within)]:scale-100! h-full w-full rounded-lg"
                    course={course}
                />
            </BlurredContainer>

            {haveIEnrolled ? (
                <Flexbox
                    className="grow"
                    direction="column"
                    gap="4"
                    placeContent="end"
                >
                    <Typography className="text-lg font-bold" variant="h4">
                        <Locale>{locales.profile.courses.progress}</Locale> (
                        {finishedLessons}/{lessonCount})
                    </Typography>
                    <ProgressBar
                        className={twJoin(
                            "my-4 w-[calc(100%-3rem)] place-self-center max-md:[&_[data-checkpoint]:not(:nth-of-type(2))]:scale-75 md:[&_[data-checkpoint]:nth-of-type(2)]:scale-125",
                            finishedLessons != lessonCount &&
                                finishedLessons > 0
                                ? "[&_[data-checkpoint]:nth-of-type(2)]:z-1"
                                : "[&_[data-checkpoint]:last-of-type]:z-1"
                        )}
                        minimum={0}
                        maximum={lessonCount}
                        value={finishedLessons}
                        variant={
                            haveIFinished
                                ? "success"
                                : haveIEnrolled
                                  ? "secondary"
                                  : "default"
                        }
                        checkpoints={[
                            finishedLessons,
                            {
                                value: 0,
                                icon: { source: flag_icon },
                            },
                            !haveIFinished
                                ? lessonCount
                                : {
                                      icon: {
                                          source: check_icon,
                                      },
                                      value: lessonCount,
                                  },
                        ]}
                    />
                </Flexbox>
            ) : (
                myUser != null && (
                    <Flexbox direction="column" gap="4">
                        <Locale
                            className="text-lg font-bold"
                            variant="h4"
                            gender={myUser.gender}
                        >
                            {locales.profile.courses.unenrollment.title}
                        </Locale>
                        <Locale variant="p" gender={myUser.gender}>
                            {locales.profile.courses.unenrollment.paragraph}
                        </Locale>
                    </Flexbox>
                )
            )}
        </Flexbox>
    );
};
