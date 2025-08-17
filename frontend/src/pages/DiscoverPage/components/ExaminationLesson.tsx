import { FC, useRef, useState } from "react";
import { LessonDTO, LessonTypeEnum } from "@/schemas/LessonSchema";
import Question from "./Question";
import Timer from "./Timer";
import { QuestionTypeEnum } from "@/schemas/QuestionSchema";
import ExamResultsScreen from "./ResultsScreen";

export type ExaminationLessonProps = {
    lesson: LessonDTO & { type: LessonTypeEnum.examination };
};

export const ExaminationLesson: FC<ExaminationLessonProps> = ({ lesson }) => {
    const { questions, title, type, id, time } = lesson;
    const [answers, setAnswers] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const [isExamFinished, setIsExamFinished] = useState(false);
    const timerRef = useRef<number | null>(null);
    const handleFinishQuiz = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setQuizFinished(true);
    };

    const handleTimeUp = () => {
        setQuizFinished(true);
        setIsRunning(false);
    };

    return (
        <div>
            {!isExamFinished ? <Timer
                minutes={time}
                isRunning={!quizFinished}
                onTimeUp={handleTimeUp}
            />
            <div>
                {questions.map((question, i) => (
                    <Question
                        key={question.title}
                        question={question.title}
                        options={question.options}
                        isMany={question.type === "many"}
                        points={question.points}
                        correctAnswer={
                            question.type == QuestionTypeEnum.choose
                                ? question.answer
                                : question.answers
                        }
                        // correctAnswer={question.}
                        setAnswers={setAnswers}
                        answers={answers}
                        idx={i}
                    />
                ))}
                <button onClick={handleFinishQuiz}>Finish</button>
            </div> : (

                <div>
  <ExamResultsScreen
    questions={quizQuestions}
    answers={answers}
    totalTimeMinutes={5}
    timeLeft={timeLeft}
  />
            </div>
        )
            }
        </div>
    );
};
