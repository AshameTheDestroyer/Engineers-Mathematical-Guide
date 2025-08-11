import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '../context/QuestionsContext';
import Notification from './Notification';

interface TimerProps {
  minutes: number;
  isRunning: boolean;
}

type NotificationType = 'info' | 'warning' | 'success';

interface Notification {
  type: NotificationType;
  message: string;
}

const Timer: React.FC<TimerProps> = ({ isRunning }) => {
  const navigate = useNavigate();
  const { questionsData, status } = useQuestions();
  const [secondsLeft, setSecondsLeft] = useState(
    Number(questionsData?.timeEstimateMinutes) * 60
  );
  const [notification, setNotification] = useState<Notification | null>(null);
  const message = 'message...';

  useEffect(function () {
    const tickInterval = setInterval(function () {
      setSecondsLeft(secondsLeft => secondsLeft - 1);
    }, 1000);

    if (secondsLeft === 0) navigate('/results', { replace: true });

    return clearInterval(tickInterval);
  }, []);

  // const storageKey = "test-timer-remaining";
  // const [secondsLeft, setSecondsLeft] = useState(() => {
  //   const saved = localStorage.getItem(storageKey);
  //   return saved ? parseInt(saved, 10) : totalSeconds;
  // });

  // Ref to track which thresholds have been shown
  // const thresholdRef = React.useRef(thresholds.map(t => ({ ...t, shown: false })));

  // useEffect(() => {
  //   localStorage.setItem(storageKey, secondsLeft.toString());
  // }, [secondsLeft]);

  // useEffect(() => {
  //   if (!isRunning) return;

  //   const timer = setInterval(() => {
  //     setSecondsLeft(prev => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         localStorage.setItem(storageKey, "0");
  //         navigate("/results", { replace: true });
  //         return 0;
  //       }

  //       const newTimeLeft = prev - 1;
  //       const elapsed = totalSeconds - newTimeLeft;
  //       const percentUsed = elapsed / totalSeconds;

  // Check each threshold
  // thresholdRef.current.forEach(t => {
  //   if (!t.shown && percentUsed >= t.percent) {
  //   setNotification({ type: "warning", message: t.message });
  //   t.shown = true;

  //   // Hide notification after 5 seconds
  //   setTimeout(() => {
  //     setNotification(null);
  //   }, 300000);
  // }
  // });

  //       return newTimeLeft;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [isRunning, navigate, totalSeconds]);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(
    2,
    '0'
  );
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="text-center mb-6 h-full  relative">
      <div className="bg-gradient-to-r fixed top-0 right-0 from-red-500 h-full to-pink-600 text-white shadow-lg p-4 inline-block font-mono text-2xl min-w-[180px]">
        <span className="block animate-pulse">{`${hours}:${minutes}:${seconds}`}</span>
      </div>

      {notification && <Notification message={message} />}
    </div>
  );
};

export default Timer;
