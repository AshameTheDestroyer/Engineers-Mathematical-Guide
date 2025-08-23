import { FC } from "react";
import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { LessonTypeEnum } from "@/schemas/LessonSchema";
import { VideoLesson } from "../components/VideoLesson";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { ReadingLesson } from "../components/ReadingLesson";
import { LessonDropView } from "../components/LessonDropView";
import { LessonButtonProps } from "../components/LessonButton";
import { ExaminationLesson } from "../components/ExaminationLesson";
import { useGetLessonByID } from "@/services/Lessons/useGetLessonByID";
import { useGetModuleByID } from "@/services/Modules/useGetModuleByID";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useGetEnrollmentByID } from "@/services/Enrollments/useGetEnrollmentByID";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useExamination } from "@/components/ExaminationProvider/ExaminationProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/modules_page.json";

export const LessonPage: FC = () => {
    const { myUser } = useMain();
    const { isDarkThemed } = useThemeMode();
    const { isScreenSize } = useScreenSize();
    const { language, GetLocale } = useLocalization();

    const { courseID, moduleID, lessonID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { examinationInformation } = useExamination();

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

    return (
        <Flexbox
            className="grow"
            gap="8"
            variant="main"
            direction={isScreenSize["max-xl"] ? "column-reverse" : "row"}
        >
            <Title>{lesson.title}</Title>

            <LessonDropView
                className={twJoin(
                    "border-background-darker rounded-2xl border-2 xl:max-h-[calc(100dvh-var(--spacing-page)*2-var(--spacing)*16)] xl:min-w-[32rem] xl:max-w-[32rem] xl:overflow-y-auto xl:overflow-x-hidden",
                    isDarkThemed
                        ? "bg-background-normal/50"
                        : "bg-background-dark/50"
                )}
                orientation={
                    isScreenSize["max-sm"] || isScreenSize.xl
                        ? "portrait"
                        : "landscape"
                }
            />

            {(() => {
                switch (lesson.type) {
                    case LessonTypeEnum.video:
                        return (
                            <VideoLesson
                                lesson={lesson}
                                enrollment={enrollment_}
                            />
                        );
                    case LessonTypeEnum.reading:
                        return (
                            <ReadingLesson
                                lesson={lesson}
                                enrollment={enrollment_}
                            />
                        );
                    case LessonTypeEnum.examination:
                        return (
                            <ExaminationLesson
                                key={`${examinationInformation?.finalized ?? false}${examinationInformation?.["check-my-answers"] ?? false}`}
                                lesson={lesson}
                                enrollment={enrollment_}
                                {...{ courseID, moduleID, lessonID }}
                            />
                        );
                }
            })()}
        </Flexbox>
    );
};
