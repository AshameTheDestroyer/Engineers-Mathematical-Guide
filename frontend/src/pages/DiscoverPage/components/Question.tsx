import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Input } from "@/components/Input/Input";
import { MathExpression } from "@/components/MathExpression/MathExpression";
import { RichText } from "@/components/RichText/RichText";
import { Typography } from "@/components/Typography/Typography";
import React, { useState } from "react";

interface Answer {
    questionTitle: string;
    answers: string[];
    points: number;
}

type QuestionTypeEnum = "select" | "many";

interface QuestionProps {
    idx: number;
    question: string;
    options: string[];
    questionType: string;
    points: number;
    correctAnswer: string | string[];
    answers: Answer[];
    setAnswers: (answers: Answer[]) => void;
    showFeedback?: boolean;
    isFinished?: boolean;
}

const Question: React.FC<QuestionProps> = ({
    idx,
    question,
    options,
    questionType = "many",
    points,
    correctAnswer,
    answers,
    setAnswers,
    showFeedback = true,
    isFinished = false,
}) => {
    const correctArray = Array.isArray(correctAnswer)
        ? correctAnswer
        : [correctAnswer];

    const answerObj = answers.find((ans) => ans.questionTitle === question);
    const selectedAnswers = answerObj?.answers || [];

    const [oneAnswer, setOneAnswer] = useState<string>("");
    const [manyAnswers, setManyAnswers] = useState<string[]>([]);

    React.useEffect(() => {
        if (questionType === "select") {
            setOneAnswer(selectedAnswers[0] || "");
        } else {
            setManyAnswers(selectedAnswers);
        }
    }, [selectedAnswers, questionType]);

    const isSelected = (option: string): boolean => {
        return questionType === "select"
            ? oneAnswer === option
            : manyAnswers.includes(option);
    };

    const isCorrect = (): boolean => {
        const userAnswers =
            questionType === "select" ? [oneAnswer] : manyAnswers;
        return (
            userAnswers.length === correctArray.length &&
            userAnswers.every((ans) => correctArray.includes(ans)) &&
            correctArray.every((ans) => userAnswers.includes(ans))
        );
    };

    const getPoints = (): number => (isCorrect() ? points : 0);

    const handleSelect = (option: string) => {
        if (isFinished) return;

        if (questionType === "select") {
            setOneAnswer(option);
            const newAnswers = answers.filter(
                (ans) => ans.questionTitle !== question
            );
            newAnswers.push({
                questionTitle: question,
                answers: [option],
                points: 0,
            });
            setAnswers(newAnswers);
        } else {
            const newManyAnswers = manyAnswers.includes(option)
                ? manyAnswers.filter((ans) => ans !== option)
                : [...manyAnswers, option];

            setManyAnswers(newManyAnswers);
            const newAnswers = answers.filter(
                (ans) => ans.questionTitle !== question
            );
            newAnswers.push({
                questionTitle: question,
                answers: newManyAnswers,
                points: 0,
            });
            setAnswers(newAnswers);
        }
    };

    return (
        <Flexbox
            direction="column"
            className="mb-6 w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
            <Flexbox className="mb-4 flex justify-between">
                <Flexbox direction="row">
                    <Typography variant="p" className="text-black">
                        {idx + 1}.
                    </Typography>
                    <RichText
                        variant="h1"
                        className="flex-wrap text-black"
                        extractor="$"
                        ExtractedTextRenders={(extractedText) => (
                            <MathExpression
                                className="inline-block"
                                inline
                                variant="span"
                            >
                                {extractedText}
                            </MathExpression>
                        )}
                    >
                        {question}
                    </RichText>
                </Flexbox>

                {!isFinished ? (
                    <Typography
                        variant="span"
                        className="w-30 flex justify-end font-medium text-blue-600"
                    >
                        {points} point{points !== 1 ? "s" : ""}
                    </Typography>
                ) : (
                    <Typography
                        variant="span"
                        className="w-50 flex justify-end text-sm text-gray-500"
                    >
                        points: {getPoints()} / {points}
                    </Typography>
                )}
            </Flexbox>

            <div className="mb-4 space-y-3">
                {options.map((option) => {
                    const isCorrectOption = correctArray.includes(option);
                    const isSelectedOption = isSelected(option);

                    let bgColor = "bg-white";
                    let borderColor = "border-gray-200";
                    let textColor = "text-gray-700";
                    let checkboxColor = "text-blue-600 focus:ring-blue-500";

                    if (isFinished) {
                        if (isSelectedOption) {
                            if (isCorrect()) {
                                bgColor = "bg-green-100";
                                borderColor = "border-green-500";
                                textColor = "text-green-800";
                                checkboxColor = "text-green-600 ring-green-500";
                            } else {
                                bgColor = "bg-red-100";
                                borderColor = "border-red-500";
                                textColor = "text-red-800";
                                checkboxColor = "text-red-600 ring-red-500";
                            }
                        } else if (isCorrectOption) {
                            bgColor = "bg-green-50";
                            borderColor = "border-green-300";
                            textColor = "text-green-700";
                        }
                    } else if (isSelectedOption) {
                        bgColor = "bg-blue-50";
                        borderColor = "border-blue-500";
                        textColor = "text-blue-800";
                    }

                    return (
                        <Typography
                            variant="label"
                            key={option}
                            className={`flex cursor-pointer items-center space-x-3 rounded-md border p-3 transition-all duration-150 ${bgColor} ${borderColor} ${textColor}`}
                            onClick={() => handleSelect(option)}
                        >
                            {questionType === "select" ? (
                                <Input
                                    name={question}
                                    type="radio"
                                    checked={isSelectedOption}
                                    onChange={() => {}}
                                    disabled={isFinished}
                                    className={`h-4 w-4 cursor-pointer ${checkboxColor}`}
                                />
                            ) : (
                                <Input
                                    name={question}
                                    type="checkbox"
                                    checked={isSelectedOption}
                                    onChange={() => {}}
                                    disabled={isFinished}
                                    className={`h-4 w-4 cursor-pointer rounded ${checkboxColor}`}
                                />
                            )}
                            <RichText
                                variant="h1"
                                extractor="$"
                                ExtractedTextRenders={(extractedText) => (
                                    <MathExpression
                                        className="inline-block"
                                        inline
                                        variant="span"
                                    >
                                        {extractedText}
                                    </MathExpression>
                                )}
                            >
                                {option}
                            </RichText>
                        </Typography>
                    );
                })}
            </div>

            {showFeedback && isFinished && (
                <div
                    className={`rounded-md p-3 text-sm ${
                        isCorrect()
                            ? "border border-green-200 bg-green-50 text-green-800"
                            : "border border-red-200 bg-red-50 text-red-800"
                    }`}
                >
                    <Typography variant="strong">
                        {isCorrect() ? "✅ Correct!" : "❌ Incorrect."}
                    </Typography>{" "}
                    You earned <span className="font-bold">{getPoints()}</span>{" "}
                    point
                    {getPoints() !== 1 ? "s" : ""}.
                </div>
            )}
        </Flexbox>
    );
};

export default Question;
