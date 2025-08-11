import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  type: 'choose' | 'write';
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface QuestionGroup {
  group: number;
  difficulty: string;
  questions: Question[];
}

interface QuestionsData {
  SubjectTest: string;
  timeEstimateMinutes: number;
  questionGroups: QuestionGroup[];
}

const ResultsPage: React.FC = () => {
  const [questionsData, setQuestionsData] = useState<QuestionsData | null>(
    null
  );
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/data/questions.json');
        const data = await res.json();
        setQuestionsData(data.questions);
      } catch (err) {
        console.error('Failed to load questions');
      }

      const saved = localStorage.getItem('user-answers');
      setUserAnswers(saved ? JSON.parse(saved) : {});
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading results...</div>;
  if (!questionsData)
    return (
      <div className="text-red-500 text-center py-20">
        Failed to load test data.
      </div>
    );

  const totalMinutes = questionsData.timeEstimateMinutes;
  const totalSeconds = totalMinutes * 60;

  const timeLeftStr = localStorage.getItem('test-timer-remaining') || '0';
  const timeLeft = Math.max(0, parseInt(timeLeftStr, 10));
  const timeTakenSeconds = totalSeconds - timeLeft;

  const hours = String(Math.floor(timeTakenSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeTakenSeconds % 3600) / 60)).padStart(
    2,
    '0'
  );
  const seconds = String(timeTakenSeconds % 60).padStart(2, '0');
  const timeTaken = `${hours}:${minutes}:${seconds}`;

  let totalScore = 0;
  let totalAnswered = 0;
  const results_ = {
    Easy: { answered: 0, correct: 0, total: 10 },
    Medium: { answered: 0, correct: 0, total: 10 },
    Hard: { answered: 0, correct: 0, total: 10 },
  };

  const allQuestions = questionsData.questionGroups.flatMap(group => {
    const difficulty = group.difficulty;
    return group.questions.map(q => {
      const key = `${group.group}-${q.question}`;
      const userAnswer = userAnswers[key];
      const isCorrect =
        userAnswer && userAnswer.trim() === q.correctAnswer.trim();

      if (userAnswer) {
        results_[difficulty].answered++;
        if (isCorrect) results_[difficulty].correct++;
      }

      if (isCorrect) totalScore += q.points;

      return {
        ...q,
        userAnswer,
        isCorrect,
        difficulty,
        pointsEarned: isCorrect ? q.points : 0,
      };
    });
  });

  totalAnswered = Object.values(results_).reduce(
    (sum, b) => sum + b.answered,
    0
  );
  const totalPossible = questionsData.questionGroups.reduce(
    (sum, g) => sum + g.questions.reduce((p, q) => p + q.points, 0),
    0
  );

  const generateFeedback = (q: (typeof allQuestions)[0]) => {
    const { userAnswer, correctAnswer } = q;

    if (!userAnswer)
      return 'You did not answer this question. Review the concept and try again.';

    if (userAnswer.trim() === correctAnswer.trim()) {
      return 'Great job! Your answer is correct. You clearly understand the concept.';
    }

    return `Your answer was close, but not quite right. The correct answer is "${correctAnswer}". Review the steps to strengthen your understanding.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-3">
            🎉 Test Results
          </h1>
          <p className="text-lg text-gray-600">
            Review your performance and learn from each question.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200 transform hover:scale-105 transition">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Time Taken
            </h3>
            <p className="text-2xl font-mono font-bold text-gray-800 mt-2">
              {timeTaken}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200 transform hover:scale-105 transition">
            <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              Score
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {totalScore} / {totalPossible} pts
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200 transform hover:scale-105 transition">
            <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
              Progress
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {totalAnswered} / 30
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-12 border border-gray-200">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Answered by Difficulty
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {Object.entries(results_).map(([level, data]) => (
              <div key={level} className="p-3 bg-gray-50 rounded-lg">
                <strong className="capitalize">{level}</strong>: {data.answered}{' '}
                answered, <span className="text-green-600">{data.correct}</span>{' '}
                correct out of {data.total}
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-3">
          🔍 Detailed Review
        </h2>

        <div className="space-y-10">
          {allQuestions.map((q, index) => {
            const userAnswer = q.userAnswer;
            const isCorrect = q.isCorrect;
            const hasAnswered = userAnswer && userAnswer.trim() !== '';

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-4">
                  <span className="font-bold text-indigo-600">
                    Q{index + 1}.
                  </span>{' '}
                  {q.question}
                </h3>

                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-5 ${
                    isCorrect
                      ? 'bg-green-100 text-green-800'
                      : !hasAnswered
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isCorrect
                    ? `✅ +${q.points} pts`
                    : !hasAnswered
                      ? '⚪ Not answered'
                      : '❌ 0 pts'}
                </div>

                <div className="mt-4 space-y-3">
                  {q.type === 'choose' && q.options ? (
                    <div>
                      <strong className="block mb-2">Options:</strong>
                      <ul className="space-y-1">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={`p-2 rounded pl-6 transition-all ${
                              opt === q.correctAnswer
                                ? 'bg-green-100 border-l-4 border-green-500 font-medium text-green-800'
                                : hasAnswered && opt === userAnswer
                                  ? 'bg-red-100 border-l-4 border-red-500 font-medium text-red-800'
                                  : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      {!hasAnswered ? (
                        <p className="text-gray-500 text-sm">
                          You did not answer this question.
                        </p>
                      ) : (
                        <div>
                          <p>
                            <strong>Your Answer:</strong>{' '}
                            <span className="text-red-600">{userAnswer}</span>
                          </p>
                          <p>
                            <strong>Correct Answer:</strong>{' '}
                            <span className="text-green-600 font-medium">
                              {q.correctAnswer}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 p-5 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                  <h4 className="font-semibold text-indigo-800 mb-2">
                    💡 Feedback
                  </h4>
                  <p className="text-indigo-700 text-sm leading-relaxed">
                    {hasAnswered
                      ? isCorrect
                        ? 'Great job! Your answer is correct. You clearly understand the concept.'
                        : `Your answer was incorrect. The correct answer is "${q.correctAnswer}". Review the steps to strengthen your understanding.`
                      : 'You did not answer this question. This topic may need more review.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-14">
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow transition transform hover:scale-105"
          >
            🖨️ Print Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
