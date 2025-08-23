import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import check_icon from "@icons/check.svg";
import check_filled_icon from "@icons/check_filled.svg";

import locales from "@localization/modules_page.json";

export type VideoLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.video };
    enrollment: "passed" | "enrolled" | "unenrolled";
};

export const VideoLesson: FC<VideoLessonProps> = ({ lesson, enrollment }) => {
    const { isDarkThemed } = useThemeMode();
    const { language, GetLocale } = useLocalization();

    return (
        <Flexbox className="grow" gap="8" direction="column">
            <Flexbox gap="4" placeItems="end" placeContent="space-between">
                <Typography
                    className="text-xl font-bold max-sm:text-lg"
                    variant="h1"
                >
                    {lesson.title}{" "}
                    <span>
                        {`(${Intl.DateTimeFormat("en-US", { minute: "2-digit", second: "2-digit" }).format(new Date(0, 0, 0, 0, 0, lesson.duration - 1))})`}
                    </span>
                </Typography>
            </Flexbox>
            <Flexbox
                className={twJoin(
                    "sm:border-background-darker relative min-h-[60dvh] grow max-sm:-mx-10 sm:rounded-2xl sm:border-2 sm:p-4",
                    isDarkThemed
                        ? "sm:bg-background-normal/50"
                        : "sm:bg-background-dark/50"
                )}
            >
                <Flexbox
                    className="-translate-1/2 absolute left-1/2 top-1/2"
                    gap="4"
                    direction="column"
                    placeItems="center"
                >
                    <SearchResultDisplay
                        iconType="loading"
                        title={GetLocale(
                            locales.lessons.video.loading.title,
                            language
                        )}
                        paragraph={GetLocale(
                            locales.lessons.video.loading.paragraph,
                            language
                        )}
                    />
                </Flexbox>
                <iframe
                    className="z-1 w-full sm:rounded-2xl"
                    allow="fullscreen"
                    src={
                        lesson.url +
                        "?" +
                        new URLSearchParams({
                            rel: "0",
                            hl: language,
                            modestbranding: "1",
                            cc_load_policy: "1",
                            cc_lang_pref: language,
                        })
                    }
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
