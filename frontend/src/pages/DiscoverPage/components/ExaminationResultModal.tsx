import { FC, useState } from "react";
import { useMain } from "@/contexts";
import { createPortal } from "react-dom";
import { Icon } from "@/components/Icon/Icon";
import { twJoin, twMerge } from "tailwind-merge";
import { Modal } from "@/components/Modal/Modal";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { useGetLessonByID } from "@/services/Lessons/useGetLessonByID";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { QuestionDTO, QuestionTypeEnum } from "@/schemas/QuestionSchema";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { useExamination } from "@/components/ExaminationProvider/ExaminationProvider";

import face_sad_icon from "@icons/face_sad.svg";
import face_happy_icon from "@icons/face_happy.svg";
import face_amazed_icon from "@icons/face_amazed.svg";
import information_icon from "@icons/information.svg";
import face_grimace_icon from "@icons/face_grimace.svg";
import face_straight_icon from "@icons/face_straight.svg";

import locales from "@localization/modules_page.json";

export type ExaminationResultModalProps =
    ChildlessComponentProps<HTMLDivElement>;

export const ExaminationResultModal: FC<ExaminationResultModalProps> = ({
    id,
    ref,
    className,
}) => {
    const { myUser } = useMain();
    const { isDarkThemed } = useThemeMode();
    const { isOnline } = useNetworkStatus();
    const { examinationInformation, TerminateExamination, CheckMyAnswers } =
        useExamination();

    const { data: examination } = useGetLessonByID(
        examinationInformation?.courseID,
        examinationInformation?.moduleID,
        examinationInformation?.lessonID,
        {
            usesSuspense: true,
            transform: (data) =>
                data as LessonDTO & { type: LessonTypeEnum.examination },
        }
    );

    const [results, setResults] = useState<{
        rank: Rank;
        time: string;
        grade: string;
        points: string;
    }>();

    function CalculateTime(
        startedAt: string,
        finishedAt: string,
        examinationTime: number
    ): string {
        const startTime = new Date(startedAt).getTime();
        const finishTime = new Date(finishedAt).getTime();
        const difference = Math.max(0, finishTime - startTime);

        const totalMinutes = Math.floor(difference / 1000 / 60);
        const clampedMinutes = Math.min(totalMinutes, examinationTime);

        return `${clampedMinutes.toString().padStart(2, "0")}:00`;
    }

    function CalculatePoints(
        questions: Array<QuestionDTO>,
        chosenAnswers: Array<number | Array<number>>
    ) {
        const { totalPointsPossible, totalPointsGained } = questions.reduce(
            (accumulator, question, i) => {
                const points = question.points;

                const answers = (() => {
                    switch (examination.questions[i].type) {
                        case QuestionTypeEnum.choose:
                            return [examination.questions[i].answer];
                        case QuestionTypeEnum.select:
                            return examination.questions[i].answers;
                    }
                })();

                const chosenAnswer = Array.isArray(chosenAnswers[i])
                    ? chosenAnswers[i]
                    : [chosenAnswers[i]];

                const correctSelected = chosenAnswer.filter((chosenAnswer) =>
                    answers.includes(chosenAnswer)
                ).length;
                const incorrectSelected = chosenAnswer.filter(
                    (chosenAnswer) => !answers.includes(chosenAnswer)
                ).length;

                const scoreRatio = Math.max(
                    0,
                    (correctSelected - incorrectSelected) /
                        (answers.length || 1)
                );
                const pointsGained = points * scoreRatio;

                return {
                    totalPointsPossible:
                        accumulator.totalPointsPossible + points,
                    totalPointsGained:
                        accumulator.totalPointsGained + pointsGained,
                };
            },
            { totalPointsPossible: 0, totalPointsGained: 0 }
        );

        const points = Number(totalPointsGained.toFixed(2));
        return { points, totalPointsPossible, totalPointsGained };
    }

    function CalculateGrade(
        totalPointsGained: number,
        totalPointsPossible: number
    ) {
        const percentage =
            totalPointsPossible > 0
                ? (totalPointsGained / totalPointsPossible) * 100
                : 100;

        return Number(percentage.toFixed(2));
    }

    function CalculateRank(grade: number) {
        return (
            [
                { limit: 20, rank: "failed" },
                { limit: 40, rank: "close" },
                { limit: 60, rank: "passed" },
                { limit: 80, rank: "good" },
                { limit: Infinity, rank: "excellent" },
            ] as Array<{ limit: number; rank: Rank }>
        ).find((level) => grade < level.limit)!.rank;
    }

    function CalculateResults(
        examination_: typeof examinationInformation & {}
    ): typeof results & {} {
        const finishesAt = new Date(examination_["finishes-at"]);
        const startedAt = new Date(
            finishesAt.getTime() - examination.time * 60 * 1000
        ).toISOString();

        const time = CalculateTime(
            startedAt,
            examination_["finished-at"]!,
            examination.time
        );

        const { points, totalPointsPossible, totalPointsGained } =
            CalculatePoints(
                examination.questions,
                examination_["chosen-answers"] as Array<number | Array<number>>
            );

        const grade = CalculateGrade(totalPointsGained, totalPointsPossible);
        const rank = CalculateRank(grade);

        return {
            time,
            rank,
            grade: `${grade}%`,
            points: `${Math.ceil(points)} XP`,
        };
    }

    function ResultSuspense() {
        return (
            <>
                <Flexbox gap="4">
                    <Icon source={information_icon} />
                    <Locale
                        className="text-lg font-bold"
                        variant="h1"
                        gender={myUser?.gender ?? "male"}
                    >
                        {
                            locales.lessons.examination.modals[
                                "result-suspense"
                            ].title
                        }
                    </Locale>
                </Flexbox>
                <Locale
                    className="max-w-[16rem]"
                    variant="p"
                    gender={myUser?.gender ?? "male"}
                >
                    {
                        locales.lessons.examination.modals["result-suspense"]
                            .paragraph
                    }
                </Locale>
                <Button
                    className="w-full"
                    onClick={(_e) =>
                        setResults(CalculateResults(examinationInformation!))
                    }
                >
                    <Locale>
                        {
                            locales.lessons.examination.modals[
                                "result-suspense"
                            ].buttons["show-results"]
                        }
                    </Locale>
                </Button>
            </>
        );
    }

    function ResultDisplay() {
        return (
            <>
                {createPortal(
                    <Fireworks
                        className="pointer-events-none fixed inset-0 z-[100000] h-screen w-screen"
                        autorun={{
                            speed: (
                                {
                                    failed: 0.1,
                                    close: 0.5,
                                    passed: 1,
                                    good: 2,
                                    excellent: 3,
                                } as Record<Rank, number>
                            )[results!.rank],
                        }}
                        decorateOptions={(options) => ({
                            colors: [
                                document.body
                                    .computedStyleMap()
                                    .get(
                                        (
                                            {
                                                failed: "--color-vibrant-red-normal",
                                                close: "--color-vibrant-yellow-normal",
                                                passed: "--color-vibrant-purple-normal",
                                                good: "--color-vibrant-blue-normal",
                                                excellent:
                                                    "--color-vibrant-green-normal",
                                            } as Record<
                                                ReturnType<
                                                    typeof CalculateRank
                                                >,
                                                string
                                            >
                                        )[results!.rank]
                                    )!
                                    .toString(),
                            ],
                            ...options,
                        })}
                    />,
                    document.body
                )}

                <Icon
                    className={twJoin(
                        "aspect-square w-[128px] place-self-center [&>svg]:h-full [&>svg]:w-full"
                    )}
                    source={
                        (
                            {
                                failed: face_sad_icon,
                                close: face_grimace_icon,
                                passed: face_straight_icon,
                                good: face_happy_icon,
                                excellent: face_amazed_icon,
                            } as Record<Rank, string>
                        )[results!.rank]
                    }
                />
                <Locale
                    className="text-lg font-bold"
                    variant="h1"
                    gender={myUser?.gender ?? "male"}
                >
                    {
                        locales.lessons.examination.modals["result-display"]
                            .title[results!.rank]
                    }
                </Locale>
                <Locale
                    className="max-w-[16rem]"
                    variant="p"
                    gender={myUser?.gender ?? "male"}
                >
                    {
                        locales.lessons.examination.modals["result-display"]
                            .paragraph[results!.rank]
                    }
                </Locale>
                <Flexbox
                    className="bg-background-light -m-8 -mt-4 p-8"
                    gap="8"
                    direction="column"
                >
                    <div className="columns-3 gap-4">
                        {(
                            ["time", "points", "grade"] as Array<
                                keyof Omit<typeof results & {}, "rank">
                            >
                        ).map((key, i) => (
                            <Flexbox
                                key={i}
                                className={twJoin(
                                    "border-3 overflow-hidden rounded-2xl",
                                    [
                                        "bg-secondary-normal border-secondary-normal [&>div]:bg-secondary-light [&>div]:text-secondary-normal",
                                        isDarkThemed
                                            ? "bg-tertiary-light border-tertiary-light [&>div]:text-tertiary-light [&>div]:bg-white/75"
                                            : "bg-tertiary-normal border-tertiary-normal [&>div]:bg-tertiary-light [&>div]:text-tertiary-normal",
                                        "bg-primary-normal border-primary-normal [&>div]:bg-primary-light [&>div]:text-primary-normal",
                                    ][i]
                                )}
                                direction="column"
                            >
                                <div className="p-4">
                                    <Typography
                                        className="text-center font-bold max-sm:scale-125 max-sm:text-sm"
                                        dir="ltr"
                                        variant="p"
                                    >
                                        {results![key]}
                                    </Typography>
                                </div>
                                <Locale
                                    className="px-4 py-1 text-center font-bold text-white"
                                    variant="h4"
                                >
                                    {
                                        locales.lessons.examination.modals[
                                            "result-display"
                                        ].information[key]
                                    }
                                </Locale>
                            </Flexbox>
                        ))}
                    </div>
                    <ButtonBox className="w-full">
                        <Button
                            className="flex-[0.4]"
                            onClick={(_e) => TerminateExamination()}
                        >
                            <Locale>
                                {
                                    locales.lessons.examination.modals[
                                        "result-display"
                                    ].buttons.exit
                                }
                            </Locale>
                        </Button>
                        <Button
                            className="flex-1"
                            variant="primary"
                            onClick={(_e) => CheckMyAnswers()}
                        >
                            <Locale>
                                {
                                    locales.lessons.examination.modals[
                                        "result-display"
                                    ].buttons["check-my-answers"]
                                }
                            </Locale>
                        </Button>
                    </ButtonBox>
                </Flexbox>
            </>
        );
    }

    return (
        <Modal
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-light gap-4 overflow-hidden max-sm:w-[90vw]",
                results != null &&
                    "to-background-light bg-gradient-to-b to-50%",
                results != null &&
                    (
                        {
                            failed: "from-vibrant-red-normal",
                            close: "from-vibrant-yellow-normal",
                            passed: "from-vibrant-purple-normal",
                            good: "from-vibrant-blue-normal",
                            excellent: "from-vibrant-green-normal",
                        } as Record<Rank, string>
                    )[results.rank],
                className
            )}
            hasCloseButton={(results != null) as true}
            closeButtonProps={results != null ? { isSquare: true } : {}}
            setIsOpen={() => results != null && TerminateExamination()}
            isOpen={
                (examinationInformation?.finalized ?? false) &&
                !(examinationInformation?.["check-my-answers"] ?? false) &&
                (EnvironmentVariables.ENVIRONMENT == "development" || isOnline)
            }
        >
            {results == null ? <ResultSuspense /> : <ResultDisplay />}
        </Modal>
    );
};
