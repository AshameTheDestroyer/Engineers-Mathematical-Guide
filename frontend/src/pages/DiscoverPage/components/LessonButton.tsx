import { useParams } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { LessonDTO, LessonType } from "@/schemas/LessonSchema";
import { IconButton } from "@/components/IconButton/IconButton";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";

import video_icon from "@icons/video.svg";
import reading_icon from "@icons/reading.svg";
import examination_icon from "@icons/examination.svg";

export type LessonButtonProps = {
    lesson: LessonDTO;
    orientation?: Orientation;
    enrollment: "enrolled" | "unenrolled" | "passed";
    RendersArrow?: (
        enrollment: "enrolled" | "unenrolled" | "passed"
    ) => PropsWithChildren["children"];
} & ChildlessComponentProps<HTMLDivElement> &
    Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const LessonButton: FC<LessonButtonProps> = ({
    id,
    ref,
    lesson,
    className,
    enrollment,
    RendersArrow,
    orientation: _orientation,
    ...props
}) => {
    const { orientation: screenOrientation } = useScreenSize();

    const orientation = _orientation ?? screenOrientation;

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
                    className="max-w-28 sm:active:[&>[data-content]]:translate-y-2.5 sm:[&>[data-thickness]]:translate-y-1"
                    thickness="thick"
                    disabled={enrollment == "unenrolled"}
                    link={DISCOVER_ROUTES.base.routes.lessonID.MapVariables({
                        courseID: courseID!,
                        moduleID: moduleID!,
                        lessonID: lesson.id.replace(/^[^]*-/, ""),
                    })}
                    icon={{
                        className:
                            "sm:w-[64px] sm:h-[64px] w-[40px] h-[40px] [&>svg]:w-full [&>svg]:h-full",
                        source: (
                            {
                                video: video_icon,
                                reading: reading_icon,
                                examination: examination_icon,
                            } as Record<LessonType, string>
                        )[lesson.type],
                    }}
                    variant={
                        (
                            {
                                passed: "success",
                                unenrolled: "default",
                                enrolled: "secondary",
                            } as Record<typeof enrollment, Variant>
                        )[enrollment]
                    }
                />

                <Flexbox
                    className={twJoin(
                        "border-3 bg-tertiary-light border-tertiary-light-active max-w-40 rounded-2xl p-2 sm:max-w-64 sm:p-4",
                        enrollment == "passed" &&
                            "bg-vibrant-green-normal border-vibrant-green-dark",
                        enrollment == "enrolled" &&
                            "bg-secondary-normal border-secondary-dark"
                    )}
                >
                    <Typography
                        className="text-center font-bold sm:text-lg"
                        variant="h3"
                    >
                        {lesson.title}
                    </Typography>
                </Flexbox>
            </Flexbox>

            {RendersArrow?.(enrollment)}
        </Flexbox>
    );
};
