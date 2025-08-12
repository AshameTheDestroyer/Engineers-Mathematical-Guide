import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { FC, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@/components/Icon/Icon";
import { Title } from "@/components/Title/Title";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { LessonButton } from "../components/LessonButton";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { useGetLessons } from "@/services/Lessons/useGetLessons";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useGetModuleByID } from "@/services/Modules/useGetModuleByID";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { GenerateZigZagSequence } from "@/functions/GenerateZigZagSequence";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useGetEnrollmentByID } from "@/services/Enrollments/useGetEnrollmentByID";
import { MathParallaxScene } from "@/components/MathParallaxScene/MathParallaxScene";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import arrow_icon from "@icons/arrow.svg";

import locales from "@localization/modules_page.json";

export const ModulePage: FC = () => {
    const { myUser } = useMain();
    const { orientation } = useScreenSize();
    const { language, GetLocale } = useLocalization();

    const { courseID, moduleID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { data: module } = useGetModuleByID(courseID, moduleID, {
        usesSuspense: true,
    });

    const { data: lessons } = useGetLessons(courseID, moduleID, {
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

    const mainContainerReference = useRef<HTMLDivElement>(null);
    const mainContainerInformation = useElementInformation(
        mainContainerReference
    );

    const zigZagSequence = useMemo(
        () =>
            courseID != null && moduleID != null
                ? GenerateZigZagSequence({
                      gap: 20,
                      startAtCenter: true,
                      seed: moduleID.hash(),
                      length: lessons.length,
                  })
                : [],
        [courseID, moduleID]
    );

    if (courseID == null || moduleID == null || module == null) {
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

    if (lessons.length == 0) {
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

    return (
        <Flexbox
            ref={mainContainerReference}
            className={twJoin(
                "-m-page relative grow",
                orientation == "landscape"
                    ? "overflow-x-auto overflow-y-hidden p-[calc(var(--spacing-page)*2)]"
                    : "p-page"
            )}
            variant="main"
            placeItems="start"
            placeContent="start"
            gap={orientation == "landscape" ? "8" : "4"}
            direction={orientation == "landscape" ? "row" : "column"}
        >
            <Title>{module.title}</Title>
            {lessons.map((lesson, i) => (
                <LessonButton
                    key={i}
                    lesson={lesson}
                    buttonProps={{
                        variant:
                            enrollment == null
                                ? "default"
                                : moduleEnrollment == null
                                  ? "default"
                                  : i < moduleEnrollment["finished-lessons"]
                                    ? "success"
                                    : i > moduleEnrollment["finished-lessons"]
                                      ? "default"
                                      : "secondary",
                        disabled:
                            enrollment == null
                                ? true
                                : moduleEnrollment == null
                                  ? true
                                  : i < moduleEnrollment["finished-lessons"]
                                    ? false
                                    : i > moduleEnrollment["finished-lessons"]
                                      ? true
                                      : false,
                    }}
                    style={{
                        transform:
                            orientation == "landscape"
                                ? `translateY(calc((${mainContainerInformation.height}px - var(--spacing-page) * 4 - 100%) * ${zigZagSequence[i] / 100}))`
                                : `translateX(calc((${mainContainerInformation.width}px - var(--spacing-page) * 2 - 100%) * ${zigZagSequence[i] / 100}))`,
                    }}
                    RendersArrow={() =>
                        i < lessons.length - 1 && (
                            <Icon
                                className="text-tertiary-light stroke-tertiary-light-active h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] [&>svg]:h-full [&>svg]:w-full"
                                thickness={1.5}
                                source={arrow_icon}
                                style={{
                                    transform:
                                        orientation == "landscape"
                                            ? `rotate(${zigZagSequence[i + 1] > zigZagSequence[i] ? "135" : "45"}deg)`
                                            : `rotate(${zigZagSequence[i + 1] > zigZagSequence[i] ? "145" : "215"}deg)`,
                                }}
                            />
                        )
                    }
                />
            ))}

            <DoubleCogIcon
                className="text-background-dark -left-page -bottom-1/10 fixed z-[-1]"
                size={400}
            />
            <CogIcon
                className="text-background-dark -right-page fixed top-0 z-[-1] translate-x-1/4 translate-y-2/3 [animation-direction:reverse]"
                size={250}
            />

            <MathParallaxScene className="-z-2 fixed inset-0" />
        </Flexbox>
    );
};
