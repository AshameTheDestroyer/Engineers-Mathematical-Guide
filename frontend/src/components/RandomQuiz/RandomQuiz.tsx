// THIS QUIZ IS FOR TRAINING
// IT IS OPTIONAL AND INCREASES XPs
// IT MIXES QUESTIONS FROM MANY SUBJECTS ACCORDING TO USER CHOICE & USER CAN CONTROL HARD LEVEL (SO IT OS HIGHLY CUSTOMIZED)

import React, { useState, useEffect } from 'react';
import MathToolsBar from './MathToolsBar/MathToolsBar';
import DerivativeViewer from './MathToolsBar/components/DerivativeViewer';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  point: number;
  level: string;
}

const RandomQuiz: React.FC = () => {
  const precalcQuestions: Question[] = [
    {
      id: 1,
      question: 'What is the domain of the function f(x) = √(x - 3)?',
      options: ['x ≥ 3', 'x > 3', 'x ≤ 3', 'All real numbers'],
      correctAnswer: 'x ≥ 3',
      point: 10,
      level: 'easy',
    },
    {
      id: 2,
      question: 'If f(x) = 2x + 1 and g(x) = x², what is (f ∘ g)(2)?',
      options: ['8', '9', '10', '12'],
      correctAnswer: '9',
      point: 10,
      level: 'easy',
    },
    {
      id: 3,
      question: 'Which function is the inverse of f(x) = 3x - 6?',
      options: [
        'f⁻¹(x) = (x + 6)/3',
        'f⁻¹(x) = 3x + 6',
        'f⁻¹(x) = (x - 6)/3',
        'f⁻¹(x) = 6 - 3x',
      ],
      correctAnswer: 'f⁻¹(x) = (x + 6)/3',
      point: 10,
      level: 'easy',
    },
    {
      id: 4,
      question: 'What is the range of f(x) = x² - 4?',
      options: ['All real numbers', 'y ≥ -4', 'y ≤ -4', 'y > 0'],
      correctAnswer: 'y ≥ -4',
      point: 9,
      level: 'easy',
    },
    {
      id: 5,
      question: 'Which of the following describes a one-to-one function?',
      options: [
        'It passes the vertical line test',
        'Its graph is symmetric',
        'It has a maximum',
        'It passes the horizontal line test',
      ],
      correctAnswer: 'It passes the horizontal line test',
      point: 8,
      level: 'easy',
    },
    {
      id: 6,
      question:
        'If f(x) = 1/(x - 2), what happens to f(x) as x approaches 2 from the right?',
      options: ['f(x) → 0', 'f(x) → ∞', 'f(x) → -∞', 'f(x) → 2'],
      correctAnswer: 'f(x) → ∞',
      point: 10,
      level: 'medium',
    },
    {
      id: 7,
      question: 'What is the value of limₓ→₃ (x² - 9)/(x - 3)?',
      options: ['3', '6', '0', 'Does not exist'],
      correctAnswer: '6',
      point: 10,
      level: 'medium',
    },
    {
      id: 8,
      question: 'Which function is even?',
      options: ['f(x) = x³', 'f(x) = x² + x', 'f(x) = x⁴ - 2x²', 'f(x) = √x'],
      correctAnswer: 'f(x) = x⁴ - 2x²',
      point: 9,
      level: 'medium',
    },
    {
      id: 9,
      question: 'If f(x) = |x|, what is f(-5)?',
      options: ['-5', '0', '5', 'Undefined'],
      correctAnswer: '5',
      point: 7,
      level: 'easy',
    },
    {
      id: 10,
      question:
        'What is the composition (g ∘ f)(x) if f(x) = x + 1 and g(x) = 2x?',
      options: ['2x + 2', '2x + 1', 'x + 2', '2x²'],
      correctAnswer: '2x + 2',
      point: 8,
      level: 'easy',
    },
  ];

  const calc1Question: Question[] = [
    {
      id: 11,
      question: 'What is the derivative of f(x) = x³ - 4x² + 2x - 1?',
      options: ['3x² - 8x + 2', '3x² - 4x + 2', '3x² - 8x - 1', '3x² + 8x + 2'],
      correctAnswer: '3x² - 8x + 2',
      point: 10,
      level: 'easy',
    },
    {
      id: 12,
      question: 'Evaluate ∫₀¹ (3x² + 2) dx.',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
      point: 10,
      level: 'medium',
    },
    {
      id: 13,
      question: 'What is limₓ→₀ (sin(2x))/x?',
      options: ['0', '1', '2', '∞'],
      correctAnswer: '2',
      point: 10,
      level: 'medium',
    },
    {
      id: 14,
      question: 'Where is f(x) = x³ - 3x increasing?',
      options: ['x < -1 or x > 1', 'x > 0', 'x < 1', 'Always'],
      correctAnswer: 'x < -1 or x > 1',
      point: 9,
      level: 'medium',
    },
    {
      id: 15,
      question: 'What is the derivative of ln(3x)?',
      options: ['1/x', '1/(3x)', '3/x', 'ln(3)'],
      correctAnswer: '1/x',
      point: 9,
      level: 'easy',
    },
    {
      id: 16,
      question: 'What is d/dx [e^{2x}]?',
      options: ['e^{2x}', '2e^{2x}', '2xe^{2x}', 'e^x'],
      correctAnswer: '2e^{2x}',
      point: 10,
      level: 'easy',
    },
    {
      id: 17,
      question: 'What is the area under y = 2x from x=0 to x=3?',
      options: ['6', '9', '12', '18'],
      correctAnswer: '9',
      point: 8,
      level: 'medium',
    },
    {
      id: 18,
      question: 'What is the second derivative of f(x) = sin(x)?',
      options: ['-sin(x)', 'sin(x)', 'cos(x)', '-cos(x)'],
      correctAnswer: '-sin(x)',
      point: 9,
      level: 'medium',
    },
    {
      id: 19,
      question: 'At what x does f(x) = x² - 6x + 5 have a minimum?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
      point: 8,
      level: 'easy',
    },
    {
      id: 20,
      question: 'What is ∫ cos(2x) dx?',
      options: [
        'sin(2x) + C',
        '2sin(2x) + C',
        '-sin(2x) + C',
        '(1/2)sin(2x) + C',
      ],
      correctAnswer: '(1/2)sin(2x) + C',
      point: 10,
      level: 'hard',
    },
  ];

  const linearAlgebra: Question[] = [
    {
      id: 21,
      question: 'What is the determinant of [[1, 2], [3, 4]]?',
      options: ['-2', '2', '4', '10'],
      correctAnswer: '-2',
      point: 10,
      level: 'easy',
    },
    {
      id: 22,
      question: 'Which vector is in the span of {[1, 0], [0, 1]}?',
      options: ['[2, 3]', '[1, 1, 1]', '[0]', '[1, 2, 3]'],
      correctAnswer: '[2, 3]',
      point: 10,
      level: 'easy',
    },
    {
      id: 23,
      question:
        'What is the rank of a 3×3 matrix with linearly independent rows?',
      options: ['1', '2', '3', '0'],
      correctAnswer: '3',
      point: 10,
      level: 'easy',
    },
    {
      id: 24,
      question: 'If A is 2×3 and B is 3×2, what is size of AB?',
      options: ['2×2', '3×3', '2×3', 'Not defined'],
      correctAnswer: '2×2',
      point: 9,
      level: 'easy',
    },
    {
      id: 25,
      question: 'What is the dot product of [1, -1, 2] and [3, 2, 1]?',
      options: ['3', '5', '6', '7'],
      correctAnswer: '3',
      point: 9,
      level: 'medium',
    },
    {
      id: 26,
      question: 'Which matrix is symmetric?',
      options: [
        '[[1,2],[3,4]]',
        '[[0,1],[1,0],[0,0]]',
        '[[1,2],[2,1]]',
        '[[1,0],[0,0],[0,1]]',
      ],
      correctAnswer: '[[1,2],[2,1]]',
      point: 8,
      level: 'medium',
    },
    {
      id: 27,
      question: 'What does it mean for a matrix to be invertible?',
      options: [
        'Its determinant is zero',
        'It has linearly dependent columns',
        'There exists a matrix A⁻¹ such that AA⁻¹ = I',
        'It is not square',
      ],
      correctAnswer: 'There exists a matrix A⁻¹ such that AA⁻¹ = I',
      point: 10,
      level: 'medium',
    },
    {
      id: 28,
      question: 'What is the transpose of [[1, 2, 3], [4, 5, 6]]?',
      options: [
        '[[1,4],[2,5],[3,6]]',
        '[[1,2],[3,4],[5,6]]',
        '[[3,2,1],[6,5,4]]',
        '[[1,2,3],[4,5,6]]',
      ],
      correctAnswer: '[[1,4],[2,5],[3,6]]',
      point: 9,
      level: 'easy',
    },
    {
      id: 29,
      question: 'Which set is linearly dependent?',
      options: [
        '{[1,0], [0,1]}',
        '{[1,1], [2,2]}',
        '{[1,2], [3,4]}',
        '{[0,1], [1,0]}',
      ],
      correctAnswer: '{[1,1], [2,2]}',
      point: 8,
      level: 'medium',
    },
    {
      id: 30,
      question: 'What is the solution to Ax = 0 if A is invertible?',
      options: ['x = 0', 'x = 1', 'Infinitely many', 'No solution'],
      correctAnswer: 'x = 0',
      point: 7,
      level: 'hard',
    },
  ];

  const [minutes, setMinutes] = useState<number>(15);
  const [typeOfQuestions, setTypeOfQuestion] = useState<string>('easy');
  const [courses, setCourses] = useState<string[]>([]);

  const getNumQuestions = (): number => {
    if (typeOfQuestions === 'easy') return Math.ceil(minutes * 1.5);
    if (typeOfQuestions === 'medium') return Math.floor(minutes / 1.5);
    if (typeOfQuestions === 'hard') return Math.floor(minutes / 4);
  };
  const [showNotification, setShowNotification] = useState(false);

  const getQuestionPool = (): Question[] => {
    let pool: Question[] = [];
    if (courses.includes('precalculus')) pool = pool.concat(precalcQuestions);
    if (courses.includes('calculus1')) pool = pool.concat(calc1Question);
    if (courses.includes('linearAlgebra')) pool = pool.concat(linearAlgebra);
    return pool.filter(q => q.level === typeOfQuestions).length > 0
      ? pool.filter(q => q.level === typeOfQuestions)
      : pool;
  };

  const generateQuestions = (pool: Question[], count: number): Question[] => {
    if (pool.length === 0) return [];

    const result: Question[] = [];
    const usedIds = new Set<number>();

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    for (const q of shuffled) {
      if (result.length < count) {
        result.push(q);
        usedIds.add(q.id);
      }
    }

    let nextId = 1000;
    while (result.length < count) {
      for (const q of shuffled) {
        if (result.length >= count) break;
        result.push({ ...q, id: nextId++ });
      }
    }

    return result;
  };

  const [precalculusQuestionsState, setPrecalculusQuestionsState] = useState<
    Question[]
  >([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<number>(-1);

  const [isShowCalc, setIsShowCalc] = useState(false);

  const totalPoints = precalculusQuestionsState.reduce(
    (sum, q) => sum + q.point,
    0
  );

  const startQuiz = () => {
    const numQuestions = getNumQuestions();
    const pool = getQuestionPool();

    if (pool.length === 0) {
      setShowNotification(true);
      return;
    }
    setShowNotification(false);

    const finalQuestions = generateQuestions(pool, numQuestions);
    setPrecalculusQuestionsState(finalQuestions);
    setQuestions(finalQuestions);
    setQuizStarted(true);
    setShowResults(false);
    setSelectedAnswers({});
    setScore(0);
    setTimeLeft(minutes * 60);
    setCurrentQuestionIndex(0);
    setIsAnswerCorrect(-1);
    setMessage('');
  };

  const handleAnswerSelect = (answer: string) => {
    if (
      selectedAnswers[currentQuestionIndex] !== undefined ||
      !precalculusQuestionsState[currentQuestionIndex]
    )
      return;

    const newSelectedAnswers = {
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    };
    setSelectedAnswers(newSelectedAnswers);

    const correctAnswer_ = questions.find(question =>
      question.options.map(option => option === answer)
    )?.correctAnswer;

    const current = precalculusQuestionsState[currentQuestionIndex];
    console.log(correctAnswer_);
    if (answer === current.correctAnswer) {
      setIsAnswerCorrect(1);
      setMessage('Well Done! , you choose the correct answer');
    } else {
      setIsAnswerCorrect(0);
      setMessage(
        `Wrong answer, the correct answer is ${current.correctAnswer}`
      );
    }
  };

  function handleAddCourse(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (e.target.checked) {
      setCourses(prev => [...prev, value]);
    } else {
      setCourses(prev => prev.filter(course => course !== value));
    }
  }

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < precalculusQuestionsState.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore(selectedAnswers);
      setShowResults(true);
    }
    setIsAnswerCorrect(-1);
    setMessage('');
  };

  function handleTryAgain() {
    setQuizStarted(false);
    setCourses([]);
    setMessage('');
    setTypeOfQuestion('');
    setMinutes(15);
  }

  const calculateScore = (answers: { [key: number]: string }) => {
    let totalScore = 0;
    precalculusQuestionsState.forEach((q, index) => {
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

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizStarted, showResults, timeLeft]);

  //if i wanted to move user to next question after 3 sec from his answer
  //so i can remove the next button next to feedback
  // useEffect(() => {
  //   if (isAnswerCorrect !== -1) {
  //     const timer = setTimeout(moveToNextQuestion, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isAnswerCorrect]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const goToQuestion = (index: number) => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;
    if (index >= 0 && index < precalculusQuestionsState.length) {
      setCurrentQuestionIndex(index);
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            🏄🏽‍♀️ Training Time
          </h1>
          <p className="text-gray-600 mb-6">
            Customize your quiz, Start training and get more XPs
          </p>
          <QuizCustomizationContainer
            setMinutes={setMinutes}
            courses={courses}
            typeOfQuestion={typeOfQuestions}
            setTypeOfQuestions={setTypeOfQuestion}
            minutes={minutes}
            setCourses={setCourses}
            handleAddCourse={handleAddCourse}
          />
          {showNotification && (
            <p className="text-red-500 mb-4 text-start">
              ⚠ No questions available. Please select at least one course!
            </p>
          )}
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Start Training
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
            Quiz Completed!
          </h1>
          <p className="text-2xl text-gray-700 mb-2 inline">You got</p>{' '}
          <span>
            {score < totalPoints / 3
              ? 'Low'
              : score === totalPoints / 2
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
            onClick={handleTryAgain}
            className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-2xl shadow focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = precalculusQuestionsState[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800">
        <p>Error: Question not available. Please restart the quiz.</p>
      </div>
    );
  }

  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="bg-black bg-opacity-30 backdrop-blur-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold max-w-50">
          Quiz for{' '}
          {courses.map(course => (
            <span className="mr-3 text-wrap capitalize">{course}</span>
          ))}
        </h1>
        <h2 className="capitalize bold text-2xl">{typeOfQuestions} Level</h2>

        <div className="text-xl font-mono bg-red-600 px-4 py-2 rounded-full shadow-lg">
          ⏳ {formatTime(timeLeft)}
        </div>
      </header>

      <div className="px-6 py-3 bg-black bg-opacity-20">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>
            Question {currentQuestionIndex + 1} of{' '}
            {precalculusQuestionsState.length}
          </span>
          <span>
            {Object.keys(selectedAnswers).length}/
            {precalculusQuestionsState.length} answered
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(Object.keys(selectedAnswers).length / precalculusQuestionsState.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      {/* <MathToolsBar /> */}
      {/* <DerivativeViewer /> */}
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

          {isAnswerCorrect !== -1 && (
            <Notification
              message={message}
              isCorrect={isAnswerCorrect}
              moveToNextQuestion={moveToNextQuestion}
            />
          )}

          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {precalculusQuestionsState.map((_, i) => (
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

export default RandomQuiz;

function Notification({ message = '', isCorrect = -1, moveToNextQuestion }) {
  return (
    <div
      className={`w-full mt-5 text-gray-900 ${isCorrect ? 'bg-lime-300' : 'bg-red-300'} flex justify-between`}
    >
      <p className="text-wrap p-2 pl-5 flex gap-3 justify-center items-center">
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

function QuizCustomizationContainer({
  setMinutes,
  courses,
  typeOfQuestion,
  setTypeOfQuestions,
  minutes,
  handleAddCourse,
  setCourses,
}) {
  return (
    <form className="flex gap-10 p-3 pb-10 ">
      <div className="flex flex-col gap-5">
        <h2>Time</h2>
        {/* number of questions calculated in this way:
              if easy level (questions can user answer instantly (theoretical questions)): numOfQuestions = ceil(numOfMinutes*1.5) //15 question in 10min

              if medium level (questions needs some calculation): numOfQuestions = floor(numOfMinutes/1.5) //6 questions in 10min

              if hard level (questions needs a lot of thinking and maybe a lot of calculation): numOfQuestions = floor(numOfMinutes / 4)  //2 questions in 10min
        */}
        <select
          name=""
          id="time"
          onChange={e => setMinutes(Number(e.target.value))}
        >
          <option value={5}>00:05:00</option>
          <option value={10}>00:10:00</option>
          <option value={15}>00:15:00</option>
          <option value={30}>00:30:00</option>
          <option value={45}>00:45:00</option>
          <option value={60}>01:00:00</option>
          <option value={75}>01:15:00</option>
          <option value={90}>01:30:00</option>
          <option value={120}>02:00:00</option>
          <option value={150}>02:30:00</option>
          <option value={240}>04:00:00</option>
        </select>
      </div>
      <div className="flex flex-col gap-5">
        <h2>Questions from Courses</h2>
        <div>
          <div className="flex gap-1 justify-start">
            <input
              type="checkbox"
              id="precalculus"
              name="courses"
              value="precalculus"
              checked={courses.includes('precalculus')}
              onChange={handleAddCourse}
            />
            <label htmlFor="precalculus">Precalculus</label>
          </div>
          <div className="flex gap-1 justify-start">
            <input
              type="checkbox"
              id="calculus1"
              name="courses"
              value="calculus1"
              checked={courses.includes('calculus1')}
              onChange={handleAddCourse}
            />
            <label htmlFor="calculus1">Calculus1</label>
          </div>
          <div className="flex gap-1 justify-start">
            <input
              type="checkbox"
              id="linearAlgebra"
              name="courses"
              value="linearAlgebra"
              checked={courses.includes('linearAlgebra')}
              onChange={handleAddCourse}
            />
            <label htmlFor="linearAlgebra">Linear Algebra</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 id="hard-level">Type of Questions</h2>
        <select
          name=""
          id="hard-level"
          onChange={e => setTypeOfQuestions(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </form>
  );
}
