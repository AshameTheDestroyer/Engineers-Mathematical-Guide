import { twMerge } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";

import video_icon from "@icons/video.svg";
import reading_icon from "@icons/reading.svg";

export type LessonButtonProps = {
    lesson: LessonDTO;
    buttonProps?: Omit<IconButtonProps, "icon" | "link">;
    RendersArrow?: () => PropsWithChildren["children"];
} & ChildlessComponentProps<HTMLDivElement> &
    Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const LessonButton: FC<LessonButtonProps> = ({
    id,
    ref,
    lesson,
    className,
    buttonProps,
    RendersArrow,
    ...props
}) => {
    const { orientation } = useScreenSize();

    const { courseID, moduleID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge("gap-4 sm:gap-8", className)}
            direction={orientation == "landscape" ? "row" : "column"}
            placeItems={orientation == "landscape" ? "baseline" : "center"}
            {...props}
        >
            <Flexbox
                gap="8"
                direction="column"
                placeItems="center"
                placeContent="center"
            >
                <IconButton
                    className={twMerge(
                        "max-w-28 sm:active:[&>[data-content]]:translate-y-2.5 sm:[&>[data-thickness]]:translate-y-1",
                        buttonProps?.className
                    )}
                    thickness="thick"
                    icon={{
                        className:
                            "sm:w-[64px] sm:h-[64px] w-[40px] h-[40px] [&>svg]:w-full [&>svg]:h-full",
                        source:
                            lesson.type == LessonTypeEnum.video
                                ? video_icon
                                : reading_icon,
                    }}
                    link={DISCOVER_ROUTES.base.routes.lessonID.MapVariables({
                        courseID: courseID!,
                        moduleID: moduleID!,
                        lessonID: lesson.id.replace(/^[^]*-/, ""),
                    })}
                    {...(buttonProps != null
                        ? Object.omit(buttonProps, "className")
                        : {})}
                />

                <Flexbox className="border-3 bg-tertiary-light border-tertiary-light-active max-w-40 rounded-2xl p-2 sm:max-w-64 sm:p-4">
                    <Typography
                        className="text-center font-bold sm:text-lg"
                        variant="h3"
                    >
                        {lesson.title}
                    </Typography>
                </Flexbox>
            </Flexbox>

            {RendersArrow?.()}
        </Flexbox>
    );
};
