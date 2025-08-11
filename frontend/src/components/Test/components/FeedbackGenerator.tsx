import React from 'react';

interface FeedbackGeneratorProps {
  userAnswer: string;
  correctAnswer: string;
  question: string;
}

const FeedbackGenerator: React.FC<FeedbackGeneratorProps> = ({
  userAnswer,
  correctAnswer,
  question,
}) => {
  const normalizedUser = userAnswer?.trim().toLowerCase();
  const normalizedCorrect = correctAnswer.trim().toLowerCase();

  let feedback = '';

  if (!userAnswer || normalizedUser === '') {
    feedback =
      'You did not answer this question. Review the concept to strengthen your understanding.';
  } else if (normalizedUser === normalizedCorrect) {
    feedback =
      'Excellent! Your answer is correct. You clearly understand the material.';
  } else {
    feedback = `Your answer is not correct. The correct answer is "${correctAnswer}". Review the steps to ensure accuracy next time.`;
  }

  return (
    <div className="mt-4 p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
      <h4 className="font-semibold text-indigo-800 text-sm mb-1">
        🧠 Feedback
      </h4>
      <p className="text-indigo-700 text-sm leading-relaxed">{feedback}</p>
    </div>
  );
};

export default FeedbackGenerator;
