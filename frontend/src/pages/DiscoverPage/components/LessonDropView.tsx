import { useMain } from "@/contexts";
import { twMerge } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { LessonButton } from "./LessonButton";
import { Icon } from "@/components/Icon/Icon";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { FC, useImperativeHandle, useMemo, useRef } from "react";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useGetLessons } from "@/services/Lessons/useGetLessons";
import { useElementInformation } from "@/hooks/useElementInformation";
import { useGetModuleByID } from "@/services/Modules/useGetModuleByID";
import { GenerateZigZagSequence } from "@/functions/GenerateZigZagSequence";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useGetEnrollmentByID } from "@/services/Enrollments/useGetEnrollmentByID";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import arrow_icon from "@icons/arrow.svg";

import locales from "@localization/modules_page.json";

export type LessonDropViewProps = {
    orientation?: Orientation;
} & ChildlessComponentProps<HTMLDivElement>;

export const LessonDropView: FC<LessonDropViewProps> = ({
    id,
    ref,
    className,
    orientation: _orientation,
}) => {
    const { myUser } = useMain();
    const { language, GetLocale } = useLocalization();

    const { orientation: screenOrientation } = useScreenSize();
    const orientation = _orientation ?? screenOrientation;

    const dropViewReference = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => dropViewReference.current!);

    const dropViewInformation = useElementInformation(dropViewReference);

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
            id={id}
            ref={dropViewReference}
            className={twMerge(
                "relative grow",
                orientation == "landscape"
                    ? "overflow-x-auto overflow-y-hidden p-[calc(var(--spacing-page)*2)]"
                    : "p-page",
                className
            )}
            dir="ltr"
            placeItems="start"
            placeContent="start"
            gap={orientation == "landscape" ? "8" : "4"}
            direction={orientation == "landscape" ? "row" : "column"}
        >
            {lessons.map((lesson, i) => (
                <LessonButton
                    key={i}
                    lesson={lesson}
                    orientation={orientation}
                    enrollment={
                        enrollment == null
                            ? "unenrolled"
                            : moduleEnrollment == null
                              ? "unenrolled"
                              : i < moduleEnrollment["finished-lessons"]
                                ? "passed"
                                : i > moduleEnrollment["finished-lessons"]
                                  ? "unenrolled"
                                  : "enrolled"
                    }
                    style={{
                        transform:
                            orientation == "landscape"
                                ? `translateY(calc((${dropViewInformation.height}px - var(--spacing-page) * 4 - 100%) * ${zigZagSequence[i] / 100}))`
                                : `translateX(calc((${dropViewInformation.width}px - var(--spacing-page) * 2 - 100%) * ${zigZagSequence[i] / 100}))`,
                    }}
                    RendersArrow={(enrollment) =>
                        i < lessons.length - 1 && (
                            <div
                                className={twMerge(
                                    "text-tertiary-light stroke-tertiary-light-active h-[32px] w-[32px] sm:h-[48px] sm:w-[48px] [&>svg]:h-full [&>svg]:w-full",
                                    enrollment == "passed" &&
                                        "text-vibrant-green-normal stroke-vibrant-green-dark",
                                    enrollment == "enrolled" &&
                                        "text-secondary-normal stroke-secondary-dark",
                                    enrollment == "unenrolled"
                                        ? "grayscale-25 saturate-75 contrast-85"
                                        : "animate-bounce"
                                )}
                            >
                                <Icon
                                    thickness={1.5}
                                    source={arrow_icon}
                                    style={{
                                        transform:
                                            orientation == "landscape"
                                                ? `rotate(${zigZagSequence[i + 1] > zigZagSequence[i] ? "135" : "45"}deg)`
                                                : `rotate(${zigZagSequence[i + 1] > zigZagSequence[i] ? "145" : "215"}deg)`,
                                    }}
                                />
                            </div>
                        )
                    }
                />
            ))}
        </Flexbox>
    );
};
