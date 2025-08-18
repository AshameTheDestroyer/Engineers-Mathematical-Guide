import React from "react";
import Question from "./Question";
import { Typography } from "@/components/Typography/Typography";

interface ExamResultsScreenProps {
    questions: QuizQuestion[];
    answers: Answer[];
    totalTimeMinutes: number;
    timeLeft: number;
}

const ExamResultsScreen: React.FC<ExamResultsScreenProps> = ({
    questions,
    answers,
    totalTimeMinutes,
    timeLeft,
}) => {
    const totalSeconds = totalTimeMinutes * 60;
    const timeUsed = totalSeconds - timeLeft;
    const formatTime = (secs: number) =>
        [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60]
            .map((v) => v.toString().padStart(2, "0"))
            .join(":");

    const correctCount = questions.reduce((count, q) => {
        const userAnswer = answers.find((a) => a.questionTitle === q.title);
        if (!userAnswer) return count;

        const correct = Array.isArray(q.correctAnswer)
            ? q.correctAnswer.sort().join(",") ===
              (Array.isArray(userAnswer.chosenAnswer)
                  ? userAnswer.chosenAnswer.sort().join(",")
                  : "")
            : q.correctAnswer === userAnswer.chosenAnswer;

        return correct ? count + 1 : count;
    }, 0);

    const total = questions.length;
    const xp = correctCount * 20;

    return (
        <div className="mx-auto min-h-screen bg-gray-50 p-4">
            <header className="mb-8 text-center">
                <Typography
                    variant="h1"
                    className="text-2xl font-bold text-gray-800"
                >
                    Quiz ExamResultsScreen
                </Typography>
                <Typography variant="p" className="text-gray-600">
                    Here's how you did
                </Typography>
            </header>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white p-6 text-center shadow">
                    <Typography
                        variant="h2"
                        className="text-lg font-semibold text-gray-700"
                    >
                        Time Used
                    </Typography>
                    <Typography
                        variant="p"
                        className="text-2xl font-bold text-blue-600"
                    >
                        {formatTime(timeUsed)}
                    </Typography>
                    <Typography variant="p" className="text-sm text-gray-500">
                        out of {formatTime(totalSeconds)}
                    </Typography>
                </div>

                <div className="rounded-lg bg-white p-6 text-center shadow">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Correct Answers
                    </h2>
                    <Typography
                        variant="p"
                        className="text-2xl font-bold text-green-600"
                    >
                        {correctCount}
                    </Typography>
                    <Typography variant="p" className="text-sm text-gray-500">
                        from {total} questions
                    </Typography>
                </div>

                <div className="rounded-lg bg-white p-6 text-center shadow">
                    <Typography
                        variant="h1"
                        className="text-lg font-semibold text-gray-700"
                    >
                        XP Earned
                    </Typography>
                    <Typography
                        variant="p"
                        className="text-2xl font-bold text-purple-600"
                    >
                        {xp} XP
                    </Typography>
                    <Typography variant="p" className="text-sm text-gray-500">
                        ({correctCount} × 20)
                    </Typography>
                </div>
            </div>

            <Typography
                variant="h2"
                className="mb-6 text-xl font-semibold text-gray-800"
            >
                Review Your Answers
            </Typography>
            {questions.map((q) => {
                const userAnswer = answers.find(
                    (a) => a.questionTitle === q.title
                );
                return (
                    <Question
                        key={q.title}
                        question={q.title}
                        options={q.options}
                        questionType={q.type}
                        points={q.points}
                        correctAnswer={q.correctAnswer}
                        answers={answers}
                        setAnswers={() => {}}
                        showFeedback={false}
                        showResult={true}
                        userAnswer={userAnswer?.chosenAnswer}
                        isFinished={true}
                    />
                );
            })}
        </div>
    );
};

export default ExamResultsScreen;
