import { FC } from "react";
import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { LessonTypeEnum } from "@/schemas/LessonSchema";
import { VideoLesson } from "../components/VideoLesson";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { ReadingLesson } from "../components/ReadingLesson";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { LessonDropView } from "../components/LessonDropView";
import { LessonButtonProps } from "../components/LessonButton";
import { Typography } from "@/components/Typography/Typography";
import { ExaminationLesson } from "../components/ExaminationLesson";
import { useGetLessonByID } from "@/services/Lessons/useGetLessonByID";
import { useGetModuleByID } from "@/services/Modules/useGetModuleByID";
import { useGetEnrollmentByID } from "@/services/Enrollments/useGetEnrollmentByID";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useExamination } from "@/components/ExaminationProvider/ExaminationProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import check_icon from "@icons/check.svg";
import check_filled_icon from "@icons/check_filled.svg";

import locales from "@localization/modules_page.json";

export const LessonPage: FC = () => {
    const { myUser } = useMain();
    const { isScreenSize } = useScreenSize();
    const { language, GetLocale } = useLocalization();

    const { courseID, moduleID, lessonID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { examinationInformation, FinalizeExamination } = useExamination();

    const { data: module } = useGetModuleByID(courseID, moduleID, {
        usesSuspense: true,
    });

    const { data: lesson } = useGetLessonByID(courseID, moduleID, lessonID, {
        usesSuspense: true,
    });

    const { data: enrollment } = useGetEnrollmentByID(
        courseID,
        myUser?.username,
        { usesSuspense: true, enabled: courseID != null && myUser != null }
    );

    const moduleEnrollment = enrollment?.progress.find(
        (progress) => progress.module == module?.id
    );

    if (courseID == null || moduleID == null) {
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

    if (lessonID == null || lesson == null) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title={GetLocale(locales.lessons["empty"].title, language)}
                paragraph={GetLocale(
                    locales.lessons["empty"].paragraph,
                    language
                ).replace(/\*\*([^\*]+)\*\*/, `**"${moduleID}"**`)}
            />
        );
    }

    const index = Number(lessonID ?? 0) - 1;

    const enrollment_: LessonButtonProps["enrollment"] =
        enrollment == null
            ? "unenrolled"
            : moduleEnrollment == null
              ? "unenrolled"
              : index < moduleEnrollment["finished-lessons"]
                ? "passed"
                : index > moduleEnrollment["finished-lessons"]
                  ? "unenrolled"
                  : "enrolled";

    const isExaminationDue =
        examinationInformation != null &&
        [
            examinationInformation.courseID == courseID,
            examinationInformation.moduleID == moduleID,
            examinationInformation.lessonID == lessonID,
        ].every(Boolean);

    const isExaminationFinished =
        isExaminationDue &&
        !examinationInformation.finalized &&
        examinationInformation["chosen-answers"]
            .map((answer) =>
                Array.isArray(answer) ? answer.length > 0 : answer != null
            )
            .every(Boolean);

    return (
        <Flexbox
            className="grow"
            gap="8"
            variant="main"
            direction={isScreenSize["max-xl"] ? "column-reverse" : "row"}
        >
            <Title>{lesson.title}</Title>

            <LessonDropView
                className="bg-background-normal rounded-2xl xl:max-h-[calc(100dvh-var(--spacing-page)*2-var(--spacing)*16)] xl:min-w-[32rem] xl:max-w-[32rem] xl:overflow-y-auto xl:overflow-x-hidden"
                orientation={
                    isScreenSize["max-sm"] || isScreenSize.xl
                        ? "portrait"
                        : "landscape"
                }
            />

            <Flexbox className="grow" gap="8" direction="column">
                <Typography
                    className="text-xl font-bold max-sm:text-lg"
                    variant="h1"
                >
                    {lesson.title}{" "}
                    <span className="text-lg">
                        {(() => {
                            switch (lesson.type) {
                                case LessonTypeEnum.video:
                                    return `(${Intl.DateTimeFormat("en-US", { minute: "2-digit", second: "2-digit" }).format(new Date(0, 0, 0, 0, 0, lesson.duration - 1))})`;
                                case LessonTypeEnum.reading:
                                    return `(${Intl.DateTimeFormat("en-US", { minute: "numeric" }).format(new Date(0, 0, 0, 0, 0, lesson["estimated-reading-time"]))} minutes of reading)`;
                                case LessonTypeEnum.examination:
                                    return `(${lesson.time}:00 minutes and ${lesson.attempts} attempts left)`;
                            }
                        })()}
                    </span>
                </Typography>

                <Flexbox className="sm:bg-background-normal max-sm:-m-page relative min-h-[60dvh] grow rounded-2xl p-4">
                    {(() => {
                        switch (lesson.type) {
                            case LessonTypeEnum.video:
                                return <VideoLesson lesson={lesson} />;
                            case LessonTypeEnum.reading:
                                return <ReadingLesson lesson={lesson} />;
                            case LessonTypeEnum.examination:
                                return (
                                    <ExaminationLesson
                                        key={`${examinationInformation?.finalized}`}
                                        lesson={lesson}
                                        {...{ courseID, moduleID, lessonID }}
                                        showCorrectAnswers={
                                            isExaminationDue &&
                                            examinationInformation.finalized
                                        }
                                    />
                                );
                        }
                    })()}
                </Flexbox>

                <ButtonBox direction="reverse-row">
                    <Button
                        className={twJoin(
                            enrollment_ == "passed" && "font-bold",
                            enrollment_ == "unenrolled" &&
                                "pointer-events-none opacity-0"
                        )}
                        thickness="thick"
                        variant={
                            enrollment_ == "passed" ? "success" : "default"
                        }
                        disabled={
                            enrollment_ != "enrolled" ||
                            (lesson.type == LessonTypeEnum.examination &&
                                !isExaminationFinished)
                        }
                        tabIndex={
                            enrollment_ != "enrolled" ||
                            (lesson.type == LessonTypeEnum.examination &&
                                !isExaminationFinished)
                                ? 0
                                : -1
                        }
                        icon={
                            isExaminationDue && enrollment_ != "passed"
                                ? undefined
                                : {
                                      placement: "right",
                                      source:
                                          enrollment_ == "passed"
                                              ? check_filled_icon
                                              : check_icon,
                                  }
                        }
                        onClick={(_e) =>
                            isExaminationDue && FinalizeExamination()
                        }
                    >
                        <Locale>
                            {
                                locales.lessons.buttons[
                                    enrollment_ == "passed"
                                        ? "completed"
                                        : isExaminationDue
                                          ? "finish-exam"
                                          : "mark-completeness"
                                ]
                            }
                        </Locale>
                    </Button>
                </ButtonBox>
            </Flexbox>
        </Flexbox>
    );
};
