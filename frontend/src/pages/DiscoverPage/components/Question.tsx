import React from "react";

interface Answer {
    questionTitle: string;
    chosenAnswer: string | string[];
}

type QuestionTypeEnum = "select" | "many";

interface QuestionProps {
    question: string;
    options: string[];
    isMany: boolean;
    points: number;
    correctAnswer: string | string[];
    answers: Answer[];
    setAnswers: (answers: Answer[]) => void;
    showFeedback?: boolean;
}

const Question: React.FC<QuestionProps> = ({
    question,
    options,
    isMany,
    points,
    correctAnswer,
    answers,
    setAnswers,
    showFeedback = false,
}) => {
    const currentAnswer = answers.find((ans) => ans.questionTitle === question);

    const isChecked = (option: string): boolean => {
        if (!currentAnswer) return false;
        if (isMany) {
            return (currentAnswer.chosenAnswer as string[]).includes(option);
        }
        return currentAnswer.chosenAnswer === option;
    };

    const isCorrect = (): boolean => {
        if (!currentAnswer) return false;

        const userAnswer = currentAnswer.chosenAnswer;
        const correct = Array.isArray(correctAnswer)
            ? correctAnswer.sort().join(",")
            : correctAnswer;

        const user = Array.isArray(userAnswer)
            ? userAnswer.sort().join(",")
            : userAnswer;

        return user === correct;
    };

    const getPoints = (): number => {
        return currentAnswer && isCorrect() ? points : 0;
    };

    const handleSingleSelect = (option: string) => {
        const newAnswers = answers.filter(
            (ans) => ans.questionTitle !== question
        );
        newAnswers.push({ questionTitle: question, chosenAnswer: option });
        setAnswers(newAnswers);
    };

    const handleMultiSelect = (option: string) => {
        const newAnswers = [...answers];
        const index = newAnswers.findIndex(
            (ans) => ans.questionTitle === question
        );

        if (index === -1) {
            newAnswers.push({
                questionTitle: question,
                chosenAnswer: [option],
            });
        } else {
            const chosen = [...(newAnswers[index].chosenAnswer as string[])];
            const optionIndex = chosen.indexOf(option);
            if (optionIndex === -1) {
                chosen.push(option);
            } else {
                chosen.splice(optionIndex, 1);
            }
            newAnswers[index] = { ...newAnswers[index], chosenAnswer: chosen };
        }

        setAnswers(newAnswers);
    };

    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex flex-wrap items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    {question}
                </h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                    {points} point{points !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="mb-4 space-y-3">
                {options.map((option) => (
                    <label
                        key={option}
                        className={`flex cursor-pointer items-center space-x-3 rounded-md border p-3 transition-all duration-150 ${
                            isChecked(option)
                                ? "border-blue-500 bg-blue-50 text-blue-800"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        } `}
                    >
                        {isMany ? (
                            <input
                                type="checkbox"
                                checked={isChecked(option)}
                                onChange={() => handleMultiSelect(option)}
                                className="h-4 w-4 cursor-pointer rounded text-blue-600 focus:ring-blue-500"
                            />
                        ) : (
                            <input
                                type="radio"
                                name={question}
                                checked={isChecked(option)}
                                onChange={() => handleSingleSelect(option)}
                                className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500"
                            />
                        )}
                        <span className="select-none text-gray-700">
                            {option}
                        </span>
                    </label>
                ))}
            </div>

            {showFeedback && currentAnswer && (
                <div
                    className={`rounded-md p-3 text-sm ${
                        isCorrect()
                            ? "border border-green-200 bg-green-50 text-green-800"
                            : "border border-red-200 bg-red-50 text-red-800"
                    }`}
                >
                    <strong>
                        {isCorrect() ? "✅ Correct!" : "❌ Incorrect."}
                    </strong>{" "}
                    You earned <span className="font-bold">{getPoints()}</span>{" "}
                    point{getPoints() !== 1 ? "s" : ""}.
                </div>
            )}

            {currentAnswer && !showFeedback && (
                <div className="mt-2 text-right">
                    <span className="text-sm text-gray-500">
                        Score: {getPoints()} / {points}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Question;
