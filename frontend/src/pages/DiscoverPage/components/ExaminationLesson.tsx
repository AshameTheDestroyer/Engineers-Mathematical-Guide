import { z } from "zod";
import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { QuestionTypeEnum } from "@/schemas/QuestionSchema";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import { useSchematicQueryParams } from "@/hooks/useSchematicQueryParams";
import { QuestionContainer, QuestionContainerProps } from "./QuestionContainer";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useExamination } from "@/components/ExaminationProvider/ExaminationProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import check_icon from "@icons/check.svg";
import arrow_icon from "@icons/arrow.svg";
import warning_icon from "@icons/warning.svg";
import hourglass_icon from "@icons/hourglass.svg";
import check_filled_icon from "@icons/check_filled.svg";

import locales from "@localization/modules_page.json";

import "./examination_lesson.css";

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
    enrollment: "passed" | "enrolled" | "unenrolled";
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

export const ExaminationLesson: FC<ExaminationLessonProps> = ({
    lesson,
    courseID,
    moduleID,
    lessonID,
    enrollment,
}) => {
    const { myUser } = useMain();
    const { isDarkThemed } = useThemeMode();
    const { direction, language, GetGenderedLocale } = useLocalization();

    const { queryParams, setQueryParams } = useSchematicQueryParams(
        ExaminationLessonQueryParamsSchema
    );

    const {
        StoreTab,
        StartExamination,
        FinalizeExamination,
        TerminateExamination,
        examinationInformation,
        SetExaminationChosenAnswers,
    } = useExamination();

    const [timer, setTimer] = useState(CalculateTimeLeft());
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

    useEffect(() => {
        if (examinationInformation == null) {
            return;
        }

        const intervalID = setInterval(() => {
            if (examinationInformation == null) {
                clearInterval(intervalID);
            }

            setTimer(CalculateTimeLeft());
        }, 500);

        return () => {
            clearInterval(intervalID);
        };
    }, [examinationInformation?.["finishes-at"]]);

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

    function CalculateTimeLeft() {
        if (examinationInformation == null) {
            return lesson.time * 60 * 1000;
        }

        return Math.max(
            -1,
            new Date(examinationInformation["finishes-at"]).getTime() -
                Date.now()
        );
    }

    function FormatTimer(timer: number) {
        const totalSeconds = Math.floor(Math.max(0, timer) / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    const isExaminationDue =
        examinationInformation != null &&
        [
            examinationInformation.courseID == courseID,
            examinationInformation.moduleID == moduleID,
            examinationInformation.lessonID == lessonID,
        ].every(Boolean);

    const isExaminationFinished =
        isExaminationDue &&
        (examinationInformation["check-my-answers"] ||
            (!examinationInformation.finalized &&
                examinationInformation["chosen-answers"]
                    .map((answer) =>
                        Array.isArray(answer)
                            ? answer.length > 0
                            : answer != null
                    )
                    .every(Boolean)));

    const showCorrectAnswers =
        isExaminationDue &&
        examinationInformation.finalized &&
        examinationInformation["check-my-answers"];

    return (
        <Flexbox className="grow" gap="8" direction="column">
            <Flexbox gap="4" placeItems="end" placeContent="space-between">
                <Typography
                    className="text-xl font-bold max-sm:text-lg"
                    variant="h1"
                >
                    {lesson.title}
                </Typography>
                {isExaminationDue && timer >= 0 && (
                    <Flexbox
                        className={twJoin(
                            "border-background-darker max-sm:text-md translate-y-2 text-nowrap rounded-2xl border-2 px-4 py-2 text-lg",
                            isDarkThemed
                                ? "bg-background-normal/50"
                                : "bg-background-dark/50"
                        )}
                        gap="2"
                        placeItems="center"
                    >
                        <Icon
                            className="hourglass-icon aspect-square max-sm:w-[24px] [&>svg]:h-full [&>svg]:w-full"
                            source={hourglass_icon}
                        />
                        <span>{FormatTimer(timer)}</span>
                    </Flexbox>
                )}
            </Flexbox>
            <Flexbox
                className={twJoin(
                    "sm:border-background-darker relative min-h-[60dvh] grow p-4 max-sm:-mx-8 max-sm:-mt-4 sm:rounded-2xl sm:border-2",
                    isDarkThemed
                        ? "sm:bg-background-normal/50"
                        : "sm:bg-background-dark/50"
                )}
            >
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
                            text.startsWith("**#") ? `**${lesson.time}**` : text
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
                                        "check-my-answers": false,
                                        "finishes-at": new Date(
                                            Date.now() + lesson.time * 60 * 1000
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
                ) : timer == -1 && examinationInformation != null ? (
                    <SearchResultDisplay
                        className="sm:-translate-1/2 sm:absolute sm:left-1/2 sm:top-1/2"
                        iconType="custom"
                        iconProps={{ source: hourglass_icon }}
                        title={GetGenderedLocale(
                            locales.lessons.examination["times-up"].title,
                            language,
                            myUser!.gender
                        )}
                        paragraph={GetGenderedLocale(
                            locales.lessons.examination["times-up"].paragraph,
                            language,
                            myUser!.gender
                        ).replace(/\*\*([^\*]+)\*\*/g, (text) =>
                            text.startsWith("**#") ? `**${lesson.time}**` : text
                        )}
                        buttons={
                            <Button
                                thickness="thick"
                                onClick={(_e) => (
                                    TerminateExamination(), setTimer(Infinity)
                                )}
                            >
                                <Locale gender={myUser!.gender}>
                                    {
                                        locales.lessons.examination["times-up"]
                                            .buttons.reset
                                    }
                                </Locale>
                            </Button>
                        }
                    />
                ) : (
                    <Flexbox
                        className="w-full sm:p-4"
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
                                            showCorrectAnswers={
                                                showCorrectAnswers
                                            }
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
                                            showCorrectAnswers={
                                                showCorrectAnswers
                                            }
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
                        <Flexbox
                            className="mt-auto"
                            placeContent="space-between"
                        >
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
                                        locales.lessons.examination.question
                                            .buttons.previous
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
                                        locales.lessons.examination.question
                                            .buttons.next
                                    }
                                </Locale>
                            </Button>
                        </Flexbox>
                    </Flexbox>
                )}
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
                    disabled={
                        (timer == 0 && examinationInformation != null) ||
                        enrollment != "enrolled" ||
                        !isExaminationFinished
                    }
                    tabIndex={
                        (timer == 0 && examinationInformation != null) ||
                        enrollment != "enrolled" ||
                        !isExaminationFinished
                            ? 0
                            : -1
                    }
                    icon={
                        isExaminationDue && enrollment != "passed"
                            ? undefined
                            : {
                                  placement: "right",
                                  source:
                                      enrollment == "passed"
                                          ? check_filled_icon
                                          : check_icon,
                              }
                    }
                    onClick={(_e) =>
                        examinationInformation?.["check-my-answers"]
                            ? TerminateExamination()
                            : isExaminationDue
                              ? FinalizeExamination()
                              : undefined
                    }
                >
                    <Locale>
                        {
                            locales.lessons.buttons[
                                enrollment == "passed"
                                    ? "completed"
                                    : isExaminationDue
                                      ? "finish-exam"
                                      : "mark-completeness"
                            ]
                        }
                    </Locale>
                </Button>
            </ButtonBox>
        </Flexbox>
    );
};
