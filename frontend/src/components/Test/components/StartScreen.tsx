import React from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../context/QuestionsContext';

const StartScreen: React.FC = () => {
  const { questionsData, status } = useQuestions();

  // if (status === 'loading')
  //   return <div className="text-center py-10">Loading test info...</div>;
  // if (status === 'error')
  //   return <div className="text-red-500 text-center">Failed to load test.</div>;
  // if (!questionsData) return <div>{questionsData}</div>;
  // return <div>{questionsData.SubjectTest}</div>;
  return (
    <div> sdfsd {questionsData?.SubjectTest}</div>
  )

  // return (
  //   <div className="p-6 max-w-3xl mx-auto text-center mt-20 flex flex-col gap-5">
  //     <h1 className="text-4xl font-bold text-indigo-700 mb-4">
  //       {questionsData.SubjectTest} Test
  //     </h1>
  //     <p className="text-lg text-gray-600 mb-6">
  //       This test contains 3 parts (Easy, Medium, Hard) with 10 questions each.
  //       Total time: <strong>{questionsData.timeEstimateMinutes}min</strong>.
  //       Once started, the timer will run continuously.
  //     </p>
  //     <p>{questionsData.testInfo}</p>
  //     <p className="text-justify">
  //       {questionsData.testInfo}, Make sure you finished reviewing the test very
  //       well, you only have{' '}
  //       <strong className="text-red-600">only one trial to do the test</strong>{' '}
  //       so be careful
  //     </p>
  //     <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left place-self-start text-sm text-yellow-800 mb-6 max-w-md mx-auto">
  //       ⚠️ <strong>Note:</strong> Timer starts when you begin and cannot be
  //       paused.
  //     </div>

  //     <button>
  //       <Link
  //         to="/questions"
  //         className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow transition"
  //       >
  //         Start Test
  //       </Link>
  //     </button>
  //   </div>
  // );
};

export default StartScreen;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useQuestions } from '../context/QuestionsContext';

// const StartScreen: React.FC = () => {
//   const { questionsData, status } = useQuestions();

//   // if (status === 'loading')
//   //   return <div className="text-center py-10">Loading test info...</div>;
//   // if (status === 'error')
//   //   return <div className="text-red-500 text-center">Failed to load test.</div>;
//   // if (!questionsData) return <div>{questionsData}</div>;
//   // return <div>{questionsData.SubjectTest}</div>;
//   return (
//     <div> sdfsd {questionsData?.SubjectTest}</div>
//   )

//   // return (
//   //   <div className="p-6 max-w-3xl mx-auto text-center mt-20 flex flex-col gap-5">
//   //     <h1 className="text-4xl font-bold text-indigo-700 mb-4">
//   //       {questionsData.SubjectTest} Test
//   //     </h1>
//   //     <p className="text-lg text-gray-600 mb-6">
//   //       This test contains 3 parts (Easy, Medium, Hard) with 10 questions each.
//   //       Total time: <strong>{questionsData.timeEstimateMinutes}min</strong>.
//   //       Once started, the timer will run continuously.
//   //     </p>
//   //     <p>{questionsData.testInfo}</p>
//   //     <p className="text-justify">
//   //       {questionsData.testInfo}, Make sure you finished reviewing the test very
//   //       well, you only have{' '}
//   //       <strong className="text-red-600">only one trial to do the test</strong>{' '}
//   //       so be careful
//   //     </p>
//   //     <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left place-self-start text-sm text-yellow-800 mb-6 max-w-md mx-auto">
//   //       ⚠️ <strong>Note:</strong> Timer starts when you begin and cannot be
//   //       paused.
//   //     </div>

//   //     <button>
//   //       <Link
//   //         to="/questions"
//   //         className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow transition"
//   //       >
//   //         Start Test
//   //       </Link>
//   //     </button>
//   //   </div>
//   // );
// };

// export default StartScreen;
