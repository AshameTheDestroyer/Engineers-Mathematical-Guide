// import React, { useState, useEffect } from "react";

// // Define types
// interface Question {
//   id: number;
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   point: number;
// }

// const MiniQuiz: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
//   const [showResults, setShowResults] = useState<boolean>(false);
//   const [score, setScore] = useState<number>(0);
//   const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes in seconds
//   const [quizStarted, setQuizStarted] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch questions from json-server
//   const fetchQuestions = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000");
//       if (!response.ok) throw new Error("Failed to fetch questions");
//       const data: Question[] = await response.json();
//       // Shuffle and pick 10 random questions
//       // const shuffled = data.sort(() => 0.5 - Math.random());
//       // setQuestions(shuffled.slice(0, 10));
//       setQuestions(data);
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Start quiz
//   const startQuiz = () => {
//     fetchQuestions();
//     setQuizStarted(true);
//     setShowResults(false);
//     setSelectedAnswers({});
//     setScore(0);
//     setTimeLeft(15 * 60);
//   };

//   // Handle answer selection
//   const handleAnswerSelect = (answer: string) => {
//     if (selectedAnswers[currentQuestionIndex] !== undefined) return; // Prevent re-selection

//     const newSelectedAnswers = { ...selectedAnswers, [currentQuestionIndex]: answer };
//     setSelectedAnswers(newSelectedAnswers);

//     // Move to next question
//     if (currentQuestionIndex < 9) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     } else {
//       // Last question answered
//       calculateScore(newSelectedAnswers);
//       setShowResults(true);
//     }
//   };

//   // Calculate final score
//   const calculateScore = (answers: { [key: number]: string }) => {
//     let totalScore = 0;
//     questions.forEach((q, index) => {
//       if (answers[index] === q.correctAnswer) {
//         totalScore += q.point;
//       }
//     });
//     setScore(totalScore);
//   };

//   // Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (quizStarted && !showResults && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && quizStarted && !showResults) {
//       // Time's up
//       calculateScore(selectedAnswers);
//       setShowResults(true);
//     }

//     return () => clearInterval(interval);
//   }, [quizStarted, showResults, timeLeft, selectedAnswers, questions]);

//   // Format time as MM:SS
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   // Handle navigation between questions
//   const goToQuestion = (index: number) => {
//     if (selectedAnswers[currentQuestionIndex] === undefined) return; // Must answer current first
//     setCurrentQuestionIndex(index);
//   };

//   // Render quiz UI
//   if (!quizStarted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
//           <h1 className="text-4xl font-extrabold text-gray-800 mb-4">🎯 Quiz Time</h1>
//           <p className="text-gray-600 mb-6">Answer 10 questions in 15 minutes. Good luck!</p>
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <button
//             onClick={startQuiz}
//             disabled={loading}
//             className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
//           >
//             {loading ? "Loading..." : "Start Quiz"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-teal-500 via-blue-600 to-purple-700 flex items-center justify-center">
//         <div className="text-white text-2xl">Loading questions...</div>
//       </div>
//     );
//   }

//   if (showResults) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 Quiz Completed!</h1>
//           <p className="text-2xl text-gray-700 mb-2">Your Score: <span className="font-bold text-green-600">{score} points</span></p>
//           <p className="text-gray-500 mb-6">Time's {(timeLeft === 0) ? "up!" : "remaining!"}</p>
//           <button
//             onClick={() => setQuizStarted(false)}
//             className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow focus:outline-none focus:ring-4 focus:ring-indigo-300"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const currentQuestion = questions[currentQuestionIndex];
//   const selectedAnswer = selectedAnswers[currentQuestionIndex];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
//       {/* Header */}
//       <header className="bg-black bg-opacity-30 backdrop-blur-sm p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Quiz Master</h1>
//         <div className="text-xl font-mono bg-red-600 px-4 py-2 rounded-full shadow-lg">
//           ⏳ {formatTime(timeLeft)}
//         </div>
//       </header>

//       {/* Progress */}
//       <div className="px-6 py-3 bg-black bg-opacity-20">
//         <div className="flex justify-between text-sm text-gray-300 mb-1">
//           <span>Question {currentQuestionIndex + 1} of 10</span>
//           <span>{Object.keys(selectedAnswers).length}/10 answered</span>
//         </div>
//         <div className="w-full bg-gray-700 rounded-full h-2">
//           <div
//             className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
//             style={{ width: `${((Object.keys(selectedAnswers).length) / 10) * 100}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Question */}
//       <main className="p-6 max-w-3xl mx-auto">
//         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
//           {/* Display current question */}

//           {
//           currentQuestion ?
//            (
//             <>
//               <h2 className="text-2xl font-semibold mb-6 text-yellow-100 leading-relaxed">
//                 {currentQuestion.question}
//               </h2>

//               <div className="space-y-3">
//                 {currentQuestion.options.map((option, idx) => {
//                   const isCorrect = option === currentQuestion.correctAnswer;
//                   const isSelected = selectedAnswer === option;
//                   const isAnswered = selectedAnswer !== undefined;

//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => handleAnswerSelect(option)}
//                       disabled={isAnswered}
//                       className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 focus:outline-none
//                         ${
//                           !isAnswered
//                             ? "bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
//                             : isCorrect
//                             ? "bg-green-500 text-white shadow-lg"
//                             : isSelected
//                             ? "bg-red-500 text-white shadow-lg"
//                             : "bg-white bg-opacity-10 text-gray-300"
//                         }
//                       `}
//                     >
//                       {option}
//                     </button>
//                   );
//                 })}
//               </div>
//             </>
//           )
//           :
//           (
//             <p className="text-center text-xl text-gray-300">Loading question...</p>
//           )
//           }

//           {/* Question Navigation */}
//           <div className="flex flex-wrap gap-2 mt-6 justify-center">
//             {Array.from({ length: 10 }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => goToQuestion(i)}
//                 disabled={selectedAnswers[i] === undefined}
//                 className={`w-10 h-10 rounded-full text-sm font-bold transition-all
//                   ${
//                     selectedAnswers[i] !== undefined
//                       ? "bg-green-500 hover:bg-green-600"
//                       : currentQuestionIndex === i
//                       ? "bg-blue-500"
//                       : "bg-gray-600 hover:bg-gray-500"
//                   }
//                   ${selectedAnswers[i] !== undefined ? "cursor-pointer" : "cursor-not-allowed"}
//                 `}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MiniQuiz;

import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  point: number;
}

const MiniQuiz: React.FC = () => {
  const allQuestions: Question[] = [
    {
      id: 1,
      question: 'What is the domain of the function f(x) = √(x - 3)?',
      options: ['x ≥ 3', 'x > 3', 'x ≤ 3', 'All real numbers'],
      correctAnswer: 'x ≥ 3',
      point: 10,
    },
    {
      id: 2,
      question: 'If f(x) = 2x + 1 and g(x) = x², what is (f ∘ g)(2)?',
      options: ['8', '9', '10', '12'],
      correctAnswer: '9',
      point: 10,
    },
    {
      id: 3,
      question: 'Which function is the inverse of f(x) = 3x - 6?',
      options: [
        'f⁻¹(x) = (x + 6)/3',
        'f⁻¹(x) = (x - 6)/3',
        'f⁻¹(x) = 3x + 6',
        'f⁻¹(x) = 6 - 3x',
      ],
      correctAnswer: 'f⁻¹(x) = (x + 6)/3',
      point: 10,
    },
    {
      id: 4,
      question: 'What is the range of f(x) = x² - 4?',
      options: ['All real numbers', 'y ≥ -4', 'y ≤ -4', 'y > 0'],
      correctAnswer: 'y ≥ -4',
      point: 9,
    },
    {
      id: 5,
      question: 'Which of the following describes a one-to-one function?',
      options: [
        'It passes the vertical line test',
        'It passes the horizontal line test',
        'Its graph is symmetric',
        'It has a maximum',
      ],
      correctAnswer: 'It passes the horizontal line test',
      point: 8,
    },
    {
      id: 6,
      question:
        'If f(x) = 1/(x - 2), what happens to f(x) as x approaches 2 from the right?',
      options: ['f(x) → 0', 'f(x) → ∞', 'f(x) → -∞', 'f(x) → 2'],
      correctAnswer: 'f(x) → ∞',
      point: 10,
    },
    {
      id: 7,
      question: 'What is the value of limₓ→₃ (x² - 9)/(x - 3)?',
      options: ['3', '6', '0', 'Does not exist'],
      correctAnswer: '6',
      point: 10,
    },
    {
      id: 8,
      question: 'Which function is even?',
      options: ['f(x) = x³', 'f(x) = x² + x', 'f(x) = x⁴ - 2x²', 'f(x) = √x'],
      correctAnswer: 'f(x) = x⁴ - 2x²',
      point: 9,
    },
    {
      id: 9,
      question: 'If f(x) = |x|, what is f(-5)?',
      options: ['-5', '0', '5', 'Undefined'],
      correctAnswer: '5',
      point: 7,
    },
    {
      id: 10,
      question:
        'What is the composition (g ∘ f)(x) if f(x) = x + 1 and g(x) = 2x?',
      options: ['2x + 1', '2x + 2', 'x + 2', '2x²'],
      correctAnswer: '2x + 2',
      point: 8,
    },
  ];

  const shuffledQuestions = allQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  const [questions] = useState<Question[]>(shuffledQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(-1);
  const totalPoints = questions.reduce((sum, q) => sum + q.point, 0);
  const startQuiz = () => {
    setQuizStarted(true);
    setShowResults(false);
    setSelectedAnswers({});
    setScore(0);
    setTimeLeft(15 * 60);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return;

    const newSelectedAnswers = {
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    };
    setSelectedAnswers(newSelectedAnswers);

    // const IntervalID = setInterval(function () {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setIsAnswerCorrect(1);
      setMessage('Well Done! , you choose the correct answer');
    } else {
      setIsAnswerCorrect(0);
      setMessage(
        `Wrong answer, the correct answer is ${questions[currentQuestionIndex].correctAnswer}`
      );
    }

    //   return clearInterval(IntervalID);
    // }, 4000);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore(selectedAnswers);
      setShowResults(true);
    }
    setIsAnswerCorrect(-1);
  };

  const calculateScore = (answers: { [key: number]: string }) => {
    let totalScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        totalScore += q.point;
      }
    });
    setScore(totalScore);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (quizStarted && !showResults && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted && !showResults) {
      calculateScore(selectedAnswers);
      setShowResults(true);
    }

    return () => clearInterval(interval);
  }, [quizStarted, showResults, timeLeft, selectedAnswers, questions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const goToQuestion = (index: number) => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;
    setCurrentQuestionIndex(index);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            🎯 Quiz Time
          </h1>
          <p className="text-gray-600 mb-6">
            Answer 10 math questions in 15 minutes. Good luck!
          </p>
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-200 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {' '}
            Quiz Completed!
          </h1>
          <p className="text-2xl text-gray-700 mb-2 inline">You got</p>{' '}
          <span>
            {score < totalPoints / 3
              ? 'Low'
              : score == totalPoints / 2
                ? 'Good'
                : 'High'}
          </span>{' '}
          Score:{' '}
          <span className="font-bold text-green-600">
            {score}
            <span className="text-black">/{totalPoints}</span>
          </span>
          <p>You got {totalPoints * 20} XPs 🔥</p>
          <p className="text-gray-500 mb-6">
            {timeLeft === 0 ? "⏰ Time's up!" : 'You finished!'}
          </p>
          <button
            onClick={() => setQuizStarted(false)}
            className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-2xl shadow focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="bg-black bg-opacity-30 backdrop-blur-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Math Quiz</h1>
        <div className="text-xl font-mono bg-red-600 px-4 py-2 rounded-full shadow-lg">
          ⏳ {formatTime(timeLeft)}
        </div>
      </header>

      <div className="px-6 py-3 bg-black bg-opacity-20">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Question {currentQuestionIndex + 1} of 10</span>
          <span>{Object.keys(selectedAnswers).length}/10 answered</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(Object.keys(selectedAnswers).length / 10) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <main className="p-6 max-w-3xl mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-100 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isAnswered = selectedAnswer !== undefined;
              const isCorrect = currentQuestion.correctAnswer === option;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 focus:outline-none
                    ${
                      !isAnswered
                        ? 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                        : isCorrect
                          ? 'bg-green-500 text-white shadow-lg'
                          : isSelected
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white bg-opacity-10 text-gray-300'
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswerCorrect != -1 && (
            <Notification
              message={message}
              isCorrect={isAnswerCorrect}
              moveToNextQuestion={moveToNextQuestion}
            />
          )}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                onClick={() => goToQuestion(i)}
                disabled={selectedAnswers[i] === undefined}
                className={`w-10 h-10 rounded-full text-sm font-bold transition-all
                  ${
                    selectedAnswers[i] !== undefined
                      ? 'bg-green-500 hover:bg-green-600'
                      : currentQuestionIndex === i
                        ? 'bg-blue-500'
                        : 'bg-gray-600 hover:bg-gray-500'
                  }
                  ${selectedAnswers[i] !== undefined ? 'cursor-pointer' : 'cursor-not-allowed'}
                `}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MiniQuiz;

function Notification({ message = '', isCorrect = -1, moveToNextQuestion }) {
  return (
    <div
      className={` w-full mt-5 text-gray-900 ${isCorrect ? ' bg-lime-300' : 'bg-red-300'} flex justify-between`}
    >
      <p className=" text-wrap p-2 pl-5 flex gap-3 justify-center items-center">
        <span className="text-2xl">{isCorrect ? '💯' : '❌'}</span> {message}
      </p>
      <button
        className="bg-white text-red-700 font-bold w-1/4"
        onClick={moveToNextQuestion}
      >
        Next
      </button>
    </div>
  );
}
