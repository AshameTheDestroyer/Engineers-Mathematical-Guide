import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { data } from 'react-router-dom';

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

interface Answer {
  question: string;
  answer: string;
  correctAnswer: string;
  points: number;
  isCorrect: boolean;
}

interface QuestionsContextType {
  questionsData: QuestionsData | null;
  status: 'loading' | 'error' | 'active';
  answers: Answer[];
  addAnswer: (answer: Omit<Answer, 'isCorrect'> & { answer: string }) => void;
  totalScore: number;
  totalCorrect: number;
  totalAnswered: number;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined
);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questionsData, setQuestionsData] = useState<QuestionsData | null>(
    null
  );
  const [status, setStatus] = useState<'loading' | 'error' | 'active'>(
    'loading'
  );
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    setStatus('loading');

    setStatus('loading');
    fetch('/data/questions.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setStatus('active');
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setStatus('error');
      });
  }, []);

  const addAnswer = (input: Omit<Answer, 'isCorrect'> & { answer: string }) => {
    const isCorrect = input.answer.trim() === input.correctAnswer.trim();
    const newAnswer: Answer = { ...input, isCorrect };

    setAnswers(prev => {
      const exists = prev.find(a => a.question === input.question);
      if (exists) {
        return prev.map(a => (a.question === input.question ? newAnswer : a));
      }
      return [...prev, newAnswer];
    });
  };

  const totalScore = answers
    .filter(a => a.isCorrect)
    .reduce((sum, a) => sum + a.points, 0);
  const totalCorrect = answers.filter(a => a.isCorrect).length;
  const totalAnswered = answers.length;

  return (
    <QuestionsContext.Provider
      value={{
        questionsData,
        status,
        answers,
        addAnswer,
        totalScore,
        totalCorrect,
        totalAnswered,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context)
    throw new Error('useQuestions must be used within QuestionsProvider');
  return context;
};
