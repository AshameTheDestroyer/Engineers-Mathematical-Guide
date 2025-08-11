import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionsProvider } from './context/QuestionsContext';
import StartScreen from './components/StartScreen';
import QuestionsPage from './components/QuestionsPage';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <QuestionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </QuestionsProvider>
  );
}

export default App;
