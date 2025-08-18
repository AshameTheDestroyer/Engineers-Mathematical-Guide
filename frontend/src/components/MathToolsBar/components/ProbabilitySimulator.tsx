// components/ProbabilitySimulator.tsx
import { useState } from 'react';

export const ProbabilitySimulator = () => {
  const [mode, setMode] = useState<'coin' | 'dice' | 'cards'>('coin');
  const [flips, setFlips] = useState<{ heads: number; tails: number }>({
    heads: 0,
    tails: 0,
  });
  const [rolls, setRolls] = useState<number[]>([]);
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  // Reset all
  const reset = () => {
    setFlips({ heads: 0, tails: 0 });
    setRolls([]);
    setDrawnCards([]);
    setHistory([]);
  };

  // Simulate coin flip
  const flipCoin = () => {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    setFlips(prev => ({
      ...prev,
      [result]: prev[result] + 1,
    }));
    setHistory(prev => [...prev, `Flip: ${result}`]);
  };

  // Roll dice (1-6)
  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setRolls(prev => [...prev, result]);
    setHistory(prev => [...prev, `Roll: ${result}`]);
  };

  // Draw random card
  const drawCard = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ];
    const deck = suits.flatMap(suit => ranks.map(rank => `${rank}${suit}`));
    const remaining = deck.filter(card => !drawnCards.includes(card));
    if (remaining.length === 0) return;

    const randomCard = remaining[Math.floor(Math.random() * remaining.length)];
    setDrawnCards(prev => [...prev, randomCard]);
    setHistory(prev => [...prev, `Draw: ${randomCard}`]);
  };

  // Run multiple times
  const runMany = (fn: () => void, times: number) => {
    for (let i = 0; i < times; i++) fn();
  };

  // Stats
  const totalFlips = flips.heads + flips.tails;
  const headsPct = totalFlips
    ? ((flips.heads / totalFlips) * 100).toFixed(1)
    : '0';
  const tailsPct = totalFlips
    ? ((flips.tails / totalFlips) * 100).toFixed(1)
    : '0';

  const totalRolls = rolls.length;
  const rollCounts = [0, 0, 0, 0, 0, 0];
  rolls.forEach(r => rollCounts[r - 1]++);
  const rollPcts = rollCounts.map(c =>
    totalRolls ? ((c / totalRolls) * 100).toFixed(1) : '0'
  );

  const cardsLeft = 52 - drawnCards.length;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Interactive Probability Lab
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Run experiments and watch probability in action. See how experimental
        results approach theory!
      </p>

      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setMode('coin')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'coin'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Coin Flips
        </button>
        <button
          onClick={() => setMode('dice')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'dice'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Dice Rolls
        </button>
        <button
          onClick={() => setMode('cards')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'cards'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Card Draw
        </button>
        <button
          onClick={reset}
          className="ml-auto px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          Reset All
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Simulation */}
        <div>
          {mode === 'coin' && (
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-2xl font-bold transition-transform duration-300 ${
                    flips.heads + flips.tails > 0 &&
                    history[history.length - 1].includes('heads')
                      ? 'scale-110 bg-amber-400'
                      : 'bg-amber-300'
                  }`}
                >
                  {totalFlips > 0
                    ? history[history.length - 1].includes('heads')
                      ? 'H'
                      : 'T'
                    : '?'}
                </div>
                <p className="text-sm text-gray-600 mt-2">Last flip</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={flipCoin}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Flip Coin
                </button>
                <button
                  onClick={() => runMany(flipCoin, 10)}
                  className="w-full py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Flip 10 Times
                </button>
              </div>
            </div>
          )}

          {mode === 'dice' && (
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`w-20 h-20 mx-auto bg-white border-2 border-gray-400 rounded grid place-items-center text-2xl font-bold ${
                    rolls.length > 0 && rolls[rolls.length - 1] === 6
                      ? 'animate-bounce'
                      : ''
                  }`}
                >
                  {rolls.length > 0 ? rolls[rolls.length - 1] : '?'}
                </div>
                <p className="text-sm text-gray-600 mt-2">Last roll</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={rollDice}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Roll Dice
                </button>
                <button
                  onClick={() => runMany(rollDice, 10)}
                  className="w-full py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  Roll 10 Times
                </button>
              </div>
            </div>
          )}

          {mode === 'cards' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-24 mx-auto bg-white border-2 border-gray-400 rounded p-1 flex items-center justify-center text-xl font-bold">
                  {drawnCards.length > 0
                    ? drawnCards[drawnCards.length - 1]
                    : '🂠'}
                </div>
                <p className="text-sm text-gray-600 mt-2">Last card</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={drawCard}
                  disabled={cardsLeft === 0}
                  className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Draw Card
                </button>
                <p className="text-xs text-gray-500 text-center">
                  {cardsLeft} cards left
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Panel */}
        <div className="bg-gray-50 p-5 rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-800">Results</h3>

          {mode === 'coin' && (
            <div>
              <p className="text-sm">Flips: {totalFlips}</p>
              <div className="mt-2 space-y-1 text-sm">
                <div>
                  Heads: {flips.heads} ({headsPct}%)
                </div>
                <div>
                  Tails: {flips.tails} ({tailsPct}%)
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${headsPct}%` }}
                ></div>
              </div>
            </div>
          )}

          {mode === 'dice' && (
            <div>
              <p className="text-sm">Rolls: {totalRolls}</p>
              {rollCounts.map((count, i) => (
                <div key={i} className="mt-1 text-xs">
                  {i + 1}: {count} ({rollPcts[i]}%)
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-green-600 h-1.5 rounded-full"
                      style={{ width: `${rollPcts[i]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {mode === 'cards' && (
            <div>
              <p className="text-sm">Drawn: {drawnCards.length}</p>
              <p className="text-sm">Remaining: {cardsLeft}</p>
              {drawnCards.length > 0 && (
                <div className="mt-2 max-h-20 overflow-y-auto text-xs">
                  <strong>Drawn:</strong> {drawnCards.slice(-5).join(', ')}
                  {drawnCards.length > 5 && ' ...'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">History</h3>
        <div className="max-h-32 overflow-y-auto text-xs text-gray-600 border border-gray-200 rounded p-2 bg-gray-50">
          {history.length === 0 ? (
            <em>No actions yet</em>
          ) : (
            history
              .slice(-20)
              .reverse()
              .map((h, i) => <div key={i}>{h}</div>)
          )}
        </div>
      </div>
    </div>
  );
};
