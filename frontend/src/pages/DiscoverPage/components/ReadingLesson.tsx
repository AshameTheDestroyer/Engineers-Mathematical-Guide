import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Markdown } from "@/components/Markdown/Markdown";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { useGetMarkdownByID } from "@/services/Markdown/useGetMarkdownByID";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { JumpToStartButton } from "@/components/JumpToStartButton/JumpToStartButton";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import check_icon from "@icons/check.svg";
import check_filled_icon from "@icons/check_filled.svg";

import locales from "@localization/modules_page.json";

export type ReadingLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.reading };
    enrollment: "passed" | "enrolled" | "unenrolled";
};

export const ReadingLesson: FC<ReadingLessonProps> = ({
    lesson,
    enrollment,
}) => {
    const { isDarkThemed } = useThemeMode();
    const { language, GetLocale } = useLocalization();

    const { data: markdowns } = useGetMarkdownByID(lesson.id, {
        usesSuspense: true,
    });

    return (
        <Flexbox className="grow" gap="8" direction="column">
            <Flexbox gap="4" placeItems="end" placeContent="space-between">
                <Typography
                    className="text-xl font-bold max-sm:text-lg"
                    variant="h1"
                >
                    {lesson.title}{" "}
                    <span>
                        {`(${Intl.DateTimeFormat("en-US", { minute: "numeric" }).format(new Date(0, 0, 0, 0, 0, lesson["estimated-reading-time"]))} minutes)`}
                    </span>
                </Typography>
            </Flexbox>
            <Flexbox
                className={twJoin(
                    "sm:border-background-darker grow overflow-auto sm:h-[60dvh] sm:rounded-2xl sm:border-2 sm:p-8 max-sm:[&::-webkit-scrollbar]:hidden",
                    isDarkThemed
                        ? "sm:bg-background-normal/50"
                        : "sm:bg-background-dark/50"
                )}
                gap="8"
                direction="column"
            >
                {markdowns.length > 0 ? (
                    markdowns.map((markdown, i) => (
                        <Markdown key={i} {...markdown} />
                    ))
                ) : (
                    <SearchResultDisplay
                        className="-translate-1/2 absolute left-1/2 top-1/2"
                        iconType="empty"
                        title={GetLocale(
                            locales.lessons.reading.empty.title,
                            language
                        )}
                        paragraph={GetLocale(
                            locales.lessons.reading.empty.paragraph,
                            language
                        ).replace(/\*\*([^\*]+)\*\*/, `**"${lesson.title}"**`)}
                    />
                )}

                <JumpToStartButton
                    className="right-0! left-0! bottom-0! place-self-end"
                    isContainerized
                    orientation="vertical"
                />
            </Flexbox>
            <ButtonBox direction="reverse-row">
                <Button
                    className={twJoin(
                        enrollment == "passed" && "font-bold",
                        enrollment == "unenrolled" &&
                            "pointer-events-none opacity-0"
                    )}
                    thickness="thick"
                    variant={enrollment == "passed" ? "success" : "default"}
                    disabled={enrollment != "enrolled"}
                    tabIndex={enrollment != "enrolled" ? 0 : -1}
                    icon={{
                        placement: "right",
                        source:
                            enrollment == "passed"
                                ? check_filled_icon
                                : check_icon,
                    }}
                >
                    <Locale>
                        {
                            locales.lessons.buttons[
                                enrollment == "passed"
                                    ? "completed"
                                    : "mark-completeness"
                            ]
                        }
                    </Locale>
                </Button>
            </ButtonBox>
        </Flexbox>
    );
};
