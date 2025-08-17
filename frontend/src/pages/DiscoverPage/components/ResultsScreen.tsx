import React from 'react';
import Question from './Question'; 

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
      .map(v => v.toString().padStart(2, '0'))
      .join(':');

  const correctCount = questions.reduce((count, q) => {
    const userAnswer = answers.find(a => a.questionTitle === q.title);
    if (!userAnswer) return count;

    const correct = Array.isArray(q.correctAnswer)
      ? q.correctAnswer.sort().join(',') === (Array.isArray(userAnswer.chosenAnswer) ? userAnswer.chosenAnswer.sort().join(',') : '')
      : q.correctAnswer === userAnswer.chosenAnswer;

    return correct ? count + 1 : count;
  }, 0);

  const total = questions.length;
  const xp = correctCount * 20;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Quiz ExamResultsScreen</h1>
        <p className="text-gray-600">Here's how you did</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Time Used</h2>
          <p className="text-2xl font-bold text-blue-600">{formatTime(timeUsed)}</p>
          <p className="text-sm text-gray-500">out of {formatTime(totalSeconds)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Correct Answers</h2>
          <p className="text-2xl font-bold text-green-600">{correctCount}</p>
          <p className="text-sm text-gray-500">from {total} questions</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">XP Earned</h2>
          <p className="text-2xl font-bold text-purple-600">{xp} XP</p>
          <p className="text-sm text-gray-500">({correctCount} × 20)</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">Review Your Answers</h2>
      {questions.map((q) => {
        const userAnswer = answers.find(a => a.questionTitle === q.title);
        return (
          <Question
            key={q.title}
            question={q.title}
            options={q.options}
            isMany={q.type === 'many'}
            points={q.points}
            correctAnswer={q.correctAnswer}
            answers={answers}
            setAnswers={() => {}}
            showFeedback={false} 
            showResult={true}     
            userAnswer={userAnswer?.chosenAnswer} 
          />
        );
      })}
    </div>
  );
};

export default ExamResultsScreen;