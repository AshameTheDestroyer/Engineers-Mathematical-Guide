import React, { useState, useEffect, Dispatch } from 'react';

interface QuestionProps {
  question: {
    question: string;
    type: 'choose' | 'write';
    options?: string[];
    correctAnswer: string;
    points: number;
  };
  idx: number;
  currentGroup: number;
  dispatch: any;
}

const Question: React.FC<QuestionProps> = ({
  question,
  idx,
  currentGroup,
  dispatch,
}) => {
  // const questionKey = `q-${currentGroup}-${idx}`;

  // const [answer, setAnswer] = useState<string>(() => {
  //   const saved = localStorage.getItem("user-answers");
  //   if (saved) {
  //     const parsed = JSON.parse(saved);
  //     return parsed[questionKey] || "";
  //   }
  //   return "";
  // });

  // useEffect(() => {
  //   if (answer === "") return;

  //   const saved = localStorage.getItem("user-answers");
  //   const allAnswers = saved ? JSON.parse(saved) : {};
  //   allAnswers[questionKey] = answer;
  //   localStorage.setItem("user-answers", JSON.stringify(allAnswers));
  // }, [answer, questionKey]);

  // const handleChange = (value: string) => {
  //   setAnswer(value);
  // };

  return (
    <div className="border-b pb-6 mb-6 last:border-b-0  flex flex-col place-items-start">
      <div className="flex justify-between  w-full">
        <p className="font-medium mb-3 text-wrap">
          <strong>Q{idx + 1}:</strong> {question.question}
        </p>
        <p>({question.points} points)</p>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className=" ">
          {question.type === 'choose' && question.options && (
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    id={`q${idx}-opt${i}`}
                    name={`question-${idx}`}
                    // value={option}
                    checked={answer === option}
                    onChange={() =>
                      dispatch({
                        type: 'answered',
                        payload: {
                          question: question.question,
                          answer: option,
                          correctAnswer: question.correctAnswer,
                          points: question.points,
                        },
                      })
                    }
                    className="mr-2"
                  />
                  <label htmlFor={`q${idx}-opt${i}`}>{option}</label>
                </div>
              ))}
            </div>
          )}

          {question.type === 'write' && (
            <input
              type="text"
              // value={answer}
              onChange={e =>
                dispatch({
                  type: 'answered',
                  payload: {
                    question: question.question,
                    answer: e.target.value,
                    correctAnswer: question.correctAnswer,
                    points: question.points,
                  },
                })
              }
              placeholder="Enter your answer"
              className="w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>
      </div>
      <div className="h-0.5 w-full bg-gray-400 mt-10"></div>
    </div>
  );
};

export default Question;
