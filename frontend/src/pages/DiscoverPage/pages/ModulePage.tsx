import { FC, useMemo, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { LessonTypeEnum } from "@/schemas/LessonSchema";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { IconButton } from "@/components/IconButton/IconButton";
import { useGetLessons } from "@/services/Lessons/useGetLessons";
import { useElementInformation } from "@/hooks/useElementInformation";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";

import video_icon from "@icons/video.svg";
import reading_icon from "@icons/reading.svg";
import { GenerateZigZagSequence } from "@/functions/GenerateZigZagSequence";

export const ModulePage: FC = () => {
    const { orientation } = useScreenSize();

    const { courseID, moduleID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { data: lessons } = useGetLessons(courseID, moduleID, {
        usesSuspense: true,
    });

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

    if (courseID == null || moduleID == null) {
        return <></>;
    }

    if (lessons.length == 0) {
        return <></>;
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
            gap={orientation == "landscape" ? "32" : "16"}
            direction={orientation == "landscape" ? "row" : "column"}
        >
            {lessons.map((lesson, i) => (
                <IconButton
                    key={i}
                    className="active:[&>[data-content]]:translate-y-2.5 [&>[data-thickness]]:translate-y-1"
                    thickness="thick"
                    icon={{
                        width: 64,
                        height: 64,
                        source:
                            lesson.type == LessonTypeEnum.video
                                ? video_icon
                                : reading_icon,
                    }}
                    style={{
                        transform:
                            orientation == "landscape"
                                ? `translateY(calc((${mainContainerInformation.height}px - var(--spacing-page) * 4 - 100%) * ${zigZagSequence[i] / 100}))`
                                : `translateX(calc((${mainContainerInformation.width}px - var(--spacing-page) * 2 - 100%) * ${zigZagSequence[i] / 100}))`,
                    }}
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
        </Flexbox>
    );
};
