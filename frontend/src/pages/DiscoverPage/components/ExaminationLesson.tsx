import { FC, useRef, useState } from "react";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import Question from "./Question";
import Timer from "./Timer";
import { QuestionTypeEnum } from "@/schemas/QuestionSchema";
import ExamResultsScreen from "./ResultsScreen";
import { Button } from "@/components/Button/Button";
import MathToolsBar from "@/components/MathToolsBar/MathToolsBar";

export type ExaminationLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

export const ExaminationLesson: FC<ExaminationLessonProps> = ({ lesson }) => {
    const { questions, title, type, id, time } = lesson;
    const [answers, setAnswers] = useState<(string | number | boolean)[][]>([]);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const timerRef = useRef<number | null>(null);

    const handleFinishQuiz = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setQuizFinished(true);
        setIsRunning(false);
    };

    const handleTimeUp = () => {
        setQuizFinished(true);
        setIsRunning(false);
    };

    if (quizFinished) {
        return (
            <ExamResultsScreen
                questions={questions}
                answers={answers}
                totalTimeMinutes={time}
                timeLeft={0}
            />
        );
    }

    return (
        <div className="examination-lesson w-full">
            {/* <MathToolsBar /> */}
            <Timer
                minutes={time}
                isRunning={isRunning}
                onTimeUp={handleTimeUp}
            />
            <div className="questions-container">
                {questions.map((question, i) => (
                    <div key={question.id || i} className="question-wrapper">
                        <Question
                            question={question.title}
                            options={question.options}
                            questionType={question.type}
                            points={question.points}
                            correctAnswer={
                                question.type === QuestionTypeEnum.choose
                                    ? question.options[question.answer]
                                    : question.options.filter((_, idx) =>
                                          question.answers?.includes(idx)
                                      )
                            }
                            setAnswers={setAnswers}
                            answers={answers}
                            idx={i}
                        />
                    </div>
                ))}
            </div>
            <Button onClick={handleFinishQuiz} className="finish-quiz-btn">
                Finish Quiz
            </Button>
        </div>
    );
};
