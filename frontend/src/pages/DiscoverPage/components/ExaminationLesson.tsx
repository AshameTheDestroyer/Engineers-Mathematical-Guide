import { z } from "zod";
import { useMain } from "@/contexts";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { QuestionTypeEnum } from "@/schemas/QuestionSchema";
import { Typography } from "@/components/Typography/Typography";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { QuestionContainer, QuestionContainerProps } from "./QuestionContainer";
import { useExamination } from "@/components/ExaminationProvider/ExaminationProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import arrow_icon from "@icons/arrow.svg";
import warning_icon from "@icons/warning.svg";

import locales from "@localization/modules_page.json";

export const ExaminationLessonQueryParamsSchema = z.object({
    tab: z
        .string({ required_error: "required" })
        .regex(/\d*/, "pattern")
        .default("0"),
});

export type ExaminationLessonProps = {
    courseID: string;
    moduleID: string;
    lessonID: string;
    showCorrectAnswers: boolean;
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

export const ExaminationLesson: FC<ExaminationLessonProps> = ({
    lesson,
    courseID,
    moduleID,
    lessonID,
    showCorrectAnswers,
}) => {
    const { myUser } = useMain();
    const { direction, language, GetGenderedLocale } = useLocalization();

    const { queryParams, setQueryParams } = useSchematicQueryParams(
        ExaminationLessonQueryParamsSchema
    );

    const {
        StoreTab,
        StartExamination,
        examinationInformation,
        SetExaminationChosenAnswers,
    } = useExamination();

    const [tab, setTab] = useState(
        examinationInformation?.["last-tab"] ?? +queryParams.tab
    );

    useEffect(() => {
        StoreTab(tab);
        setQueryParams((queryParams) => ({
            ...queryParams,
            tab: `${tab + 1}`,
        }));
    }, [tab]);

    const CreateSetChosenAnswer = (tab: number) =>
        ((chosenAnswer) =>
            SetExaminationChosenAnswers((allChosenAnswers) =>
                allChosenAnswers.with(
                    tab,
                    typeof chosenAnswer == "number"
                        ? chosenAnswer
                        : chosenAnswer?.(
                              allChosenAnswers[tab] as number | undefined
                          )
                )
            )) as (QuestionContainerProps & {
            type: QuestionTypeEnum.choose;
        })["setChosenAnswer"];

    const CreateSetChosenAnswers = (tab: number) =>
        ((chosenAnswers) =>
            SetExaminationChosenAnswers((allChosenAnswers) =>
                allChosenAnswers.with(
                    tab,
                    Array.isArray(chosenAnswers)
                        ? chosenAnswers
                        : chosenAnswers?.(
                              allChosenAnswers[tab] as Array<number>
                          )
                )
            )) as (QuestionContainerProps & {
            type: QuestionTypeEnum.select;
        })["setChosenAnswers"];

    return (
        <div className="p-[inherit] max-sm:w-full sm:absolute sm:inset-0 sm:overflow-auto">
            {examinationInformation == null ? (
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
                        <Button
                            thickness="thick"
                            onClick={(_e) =>
                                StartExamination({
                                    courseID,
                                    lessonID,
                                    moduleID,
                                    "last-tab": 0,
                                    finalized: false,
                                    "attempt-counter": 0,
                                    "finishes-at": new Date(
                                        Date.now() + 90 * 60 * 1000
                                    ).toISOString(),
                                    "chosen-answers": lesson.questions.map(
                                        (question) => {
                                            switch (question.type) {
                                                case QuestionTypeEnum.choose:
                                                    return undefined;
                                                case QuestionTypeEnum.select:
                                                    return [];
                                            }
                                        }
                                    ),
                                })
                            }
                        >
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
                    {(() => {
                        switch (lesson.questions[tab].type) {
                            case QuestionTypeEnum.choose:
                                return (
                                    <QuestionContainer
                                        index={tab + 1}
                                        {...lesson.questions[tab]}
                                        showCorrectAnswers={showCorrectAnswers}
                                        setChosenAnswer={CreateSetChosenAnswer(
                                            tab
                                        )}
                                        chosenAnswer={
                                            examinationInformation[
                                                "chosen-answers"
                                            ][tab] as number | undefined
                                        }
                                    />
                                );
                            case QuestionTypeEnum.select:
                                return (
                                    <QuestionContainer
                                        index={tab + 1}
                                        {...lesson.questions[tab]}
                                        showCorrectAnswers={showCorrectAnswers}
                                        setChosenAnswers={CreateSetChosenAnswers(
                                            tab
                                        )}
                                        chosenAnswers={
                                            examinationInformation[
                                                "chosen-answers"
                                            ][tab] as Array<number>
                                        }
                                    />
                                );
                        }
                    })()}
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
