import React, { useReducer, useState } from "react";
import Question from "./QuestionContainer";
import { useNavigate } from "react-router-dom";
// import { useQuestions } from "../context/QuestionsContext";
// import WarningPopup from "./WarningPopup";

type Action =
    | { type: "NEXT" }
    | { type: "PREV" }
    | { type: "answered"; payload: any };

interface State {
    currentGroup: number;
    answers: Array<object>;
    secondsRemaining: number;
}

const questionReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "NEXT":
            return state.currentGroup < 3
                ? { ...state, currentGroup: state.currentGroup + 1 }
                : state;
        case "PREV":
            return state.currentGroup > 1
                ? { ...state, currentGroup: state.currentGroup - 1 }
                : state;
        case "answered":
            return {
                ...state,
                answers: [
                    ...state.answers.filter(
                        (a: any) =>
                            (a as any).question !== action.payload.question
                    ),
                    action.payload,
                ],
            };
        default:
            return state;
    }
};

const QuestionsPage: React.FC = () => {
    const { questionsData, status } = useQuestions();
    const navigate = useNavigate();
    const [isShowWarningPopup, setIsShowWarningPopup] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const initialState: State = {
        currentGroup: 1,
        answers: [],
        secondsRemaining: questionsData.timeEstimateMinutes * 60,
    };
    const [state, dispatch] = useReducer(questionReducer, initialState);

    if (status === "loading") return <div>Loading test...</div>;
    if (status === "error" || !questionsData)
        return <div>Error loading test.</div>;

    if (!questionsData) return null;

    const currentGroupData =
        questionsData.questionGroups[state.currentGroup - 1];
    const isLastGroup = state.currentGroup === 3;
    const isFirstGroup = state.currentGroup === 1;

    const handleNext = () => {
        if (isLastGroup) {
            setIsShowWarningPopup(true);
            if (isFinished) navigate("/results");
        } else {
            dispatch({ type: "NEXT" });
        }
    };

    return (
        <div className="min-h-screen max-w-6xl p-10 pl-20 font-sans text-gray-800">
            <h1 className="mb-2 text-3xl font-bold text-indigo-600">
                {questionsData.SubjectTest} Test
            </h1>
            <div className="mt-6">
                <strong className="text-xl">
                    Part {currentGroupData.group} ({currentGroupData.difficulty}
                    )
                </strong>
            </div>

            <div className="my-8 space-y-8">
                {currentGroupData.questions.map((q, index) => (
                    <Question
                        key={index}
                        question={q}
                        idx={index}
                        currentGroup={currentGroupData.group}
                        dispatch={dispatch}
                        answers={state.answers}
                    />
                ))}
            </div>

            <div className="mt-8 flex justify-between">
                {!isFirstGroup && (
                    <button
                        onClick={() => dispatch({ type: "PREV" })}
                        className="rounded-lg bg-gray-500 px-6 py-2 text-white transition hover:bg-gray-600"
                    >
                        Previous
                    </button>
                )}
                <div></div>
                <button
                    onClick={handleNext}
                    className={`rounded-lg px-6 py-2 text-white transition ${
                        isLastGroup
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                    {isLastGroup ? "Finish Test" : "Next Part"}
                </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                Part {state.currentGroup} of 3
            </div>

            {isShowWarningPopup && (
                <WarningPopup
                    setIsFinished={setIsFinished}
                    setIsShowWarningPopup={setIsShowWarningPopup}
                />
            )}
        </div>
    );
};

export default QuestionsPage;
