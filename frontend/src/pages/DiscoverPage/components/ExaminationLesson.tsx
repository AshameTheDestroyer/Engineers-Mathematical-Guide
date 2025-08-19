import { useMain } from "@/contexts";
import { FC, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { QuestionContainer } from "./QuestionContainer";
import { Typography } from "@/components/Typography/Typography";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import arrow_icon from "@icons/arrow.svg";
import warning_icon from "@icons/warning.svg";

import locales from "@localization/modules_page.json";

export type ExaminationLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

export const ExaminationLesson: FC<ExaminationLessonProps> = ({ lesson }) => {
    const { myUser } = useMain();
    const [tab, setTab] = useState<number>();
    const { direction, language, GetGenderedLocale } = useLocalization();

    return (
        <div className="p-[inherit] max-sm:w-full sm:absolute sm:inset-0 sm:overflow-auto">
            {tab == null ? (
                <SearchResultDisplay
                    className="sm:-translate-1/2 sm:absolute sm:left-1/2 sm:top-1/2"
                    iconType="custom"
                    iconProps={{ source: warning_icon }}
                    title={GetGenderedLocale(
                        locales.lessons.examination.disclaimer.title,
                        language,
                        myUser!.gender
                    )}
                    paragraph={GetGenderedLocale(
                        locales.lessons.examination.disclaimer.paragraph,
                        language,
                        myUser!.gender
                    ).replace(/\*\*([^\*]+)\*\*/g, (text) =>
                        text.startsWith("**#")
                            ? `**${lesson.time}**`
                            : text.startsWith("**@")
                              ? `**${lesson.attempts}**`
                              : text
                    )}
                    buttons={
                        <Button thickness="thick" onClick={(_e) => setTab(0)}>
                            <Locale gender={myUser!.gender}>
                                {
                                    locales.lessons.examination.disclaimer
                                        .buttons.proceed
                                }
                            </Locale>
                        </Button>
                    }
                />
            ) : (
                <Flexbox
                    className="h-full w-full sm:p-4"
                    gap="8"
                    direction="column"
                >
                    <QuestionContainer
                        key={tab}
                        index={tab + 1}
                        {...lesson.questions[tab]}
                    />
                    <Flexbox className="mt-auto" placeContent="space-between">
                        <Button
                            className="min-w-[calc(8ch+1rem)]"
                            disabled={tab == 0}
                            icon={{
                                placement: "left",
                                source: arrow_icon,
                                className:
                                    direction == "ltr"
                                        ? "rotate-270"
                                        : "rotate-90",
                            }}
                            onClick={(_e) => setTab((tab) => tab! - 1)}
                        >
                            <Locale>
                                {
                                    locales.lessons.examination.question.buttons
                                        .previous
                                }
                            </Locale>
                        </Button>
                        <Typography
                            className="bg-tertiary-normal text-tertiary-light min-w-[calc(3ch+2rem)] place-self-start text-nowrap rounded-full px-4 py-2 text-center font-bold"
                            variant="p"
                        >
                            {tab + 1}
                        </Typography>
                        <Button
                            className="min-w-[calc(8ch+1rem)]"
                            disabled={tab == lesson.questions.length - 1}
                            icon={{
                                placement: "right",
                                source: arrow_icon,
                                className:
                                    direction == "ltr"
                                        ? "rotate-90"
                                        : "rotate-270",
                            }}
                            onClick={(_e) => setTab((tab) => tab! + 1)}
                        >
                            <Locale>
                                {
                                    locales.lessons.examination.question.buttons
                                        .next
                                }
                            </Locale>
                        </Button>
                    </Flexbox>
                </Flexbox>
            )}
        </div>
    );
};
