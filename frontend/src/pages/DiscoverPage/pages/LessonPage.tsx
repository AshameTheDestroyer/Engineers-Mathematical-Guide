import { FC } from "react";
import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { ModulePage } from "./ModulePage";
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
import { LessonButtonProps } from "../components/LessonButton";
import { Typography } from "@/components/Typography/Typography";
import { ExaminationLesson } from "../components/ExaminationLesson";
import { useGetLessonByID } from "@/services/Lessons/useGetLessonByID";
import { useGetModuleByID } from "@/services/Modules/useGetModuleByID";
import { useGetEnrollmentByID } from "@/services/Enrollments/useGetEnrollmentByID";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
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

    if (lesson == null) {
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

    return (
        <Flexbox
            className="grow"
            gap="8"
            variant="main"
            direction={isScreenSize["max-lg"] ? "column-reverse" : "row"}
        >
            <Title>{lesson.title}</Title>

            <ModulePage
                className="m-0 lg:max-h-[calc(100dvh-var(--spacing-page)*2-var(--spacing)*16)] lg:min-w-[32rem] lg:max-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden"
                withoutMathematicalEquations
                orientation={
                    isScreenSize["max-sm"] || isScreenSize.lg
                        ? "portrait"
                        : "landscape"
                }
            />

            <Flexbox className="grow" gap="8" direction="column">
                <Typography className="text-xl font-bold" variant="h1">
                    {lesson.title}{" "}
                    {lesson.type == LessonTypeEnum.video
                        ? `(${Intl.DateTimeFormat("en-US", { minute: "2-digit", second: "2-digit" }).format(new Date(0, 0, 0, 0, 0, lesson.duration - 1))})`
                        : ""}
                </Typography>

                {(() => {
                    switch (lesson.type) {
                        case LessonTypeEnum.video:
                            return <VideoLesson lesson={lesson} />;
                        case LessonTypeEnum.reading:
                            return <ReadingLesson lesson={lesson} />;
                        case LessonTypeEnum.examination:
                            return <ExaminationLesson lesson={lesson} />;
                    }
                })()}

                <ButtonBox direction="reverse-row">
                    <Button
                        className={twJoin(
                            enrollment_ == "passed" && "font-bold",
                            enrollment_ == "unenrolled" &&
                                "pointer-events-none opacity-0"
                        )}
                        thickness="thick"
                        disabled={enrollment_ != "enrolled"}
                        tabIndex={enrollment_ != "enrolled" ? 0 : -1}
                        variant={
                            enrollment_ == "passed" ? "success" : "default"
                        }
                        icon={{
                            placement: "right",
                            source:
                                enrollment_ == "passed"
                                    ? check_filled_icon
                                    : check_icon,
                        }}
                    >
                        <Locale>
                            {
                                locales.lessons.buttons[
                                    enrollment_ == "passed"
                                        ? "completed"
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
