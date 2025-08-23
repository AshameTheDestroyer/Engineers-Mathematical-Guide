// components/MathGraphWidget.tsx
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    nerdamer: any;
  }
}

const { nerdamer } = window;

type Graph = {
  id: number;
  expr: string;
  color: string;
};

export const MathGraphWidget = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [input, setInput] = useState<string>('x^2');
  const [color, setColor] = useState<string>('#4f46e5'); // indigo
  const [graphs, setGraphs] = useState<Graph[]>([
    { id: Date.now(), expr: 'x^2', color: '#4f46e5' },
  ]);
  const [error, setError] = useState<string | null>(null);

  const addGraph = () => {
    if (!input.trim()) return;
    try {
      nerdamer(input); // validate
      setGraphs(prev => [...prev, { id: Date.now(), expr: input, color }]);
      setInput('');
      setError(null);
    } catch (err) {
      setError('Invalid function. Example: x^2, sin(x), e^x');
    }
  };

  const removeGraph = (id: number) => {
    setGraphs(prev => prev.filter(g => g.id !== id));
  };

  const drawGraphs = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 50;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Plot each graph
    graphs.forEach(({ expr: exprStr, color }) => {
      let parsedExpr;
      try {
        parsedExpr = nerdamer(exprStr);
      } catch {
        return; // skip invalid
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      let firstPoint = true;

      for (let screenX = 0; screenX < width; screenX++) {
        const x = (screenX - centerX) / scale;
        let y: number;

        try {
          y = parsedExpr.evaluate({ x }).valueOf();
          if (typeof y !== 'number' || !isFinite(y)) continue;
        } catch {
          continue;
        }

        const screenY = centerY - y * scale;

        // Only draw if on screen
        if (screenY >= 0 && screenY <= height) {
          if (firstPoint) {
            ctx.moveTo(screenX, screenY);
            firstPoint = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        } else if (!firstPoint) {
          ctx.stroke();
          ctx.beginPath();
          firstPoint = true;
        }
      }

      if (!firstPoint) ctx.stroke();
    });
  };

  useEffect(() => {
    drawGraphs();
  }, [graphs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGraph();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Advanced Math Grapher
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Enter a function of{' '}
        <code className="font-mono bg-gray-100 text-black px-1.5 py-0.5 rounded">
          x
        </code>
        : e.g.{' '}
        <code className="font-mono bg-gray-100 text-black px-1.5 py-0.5 rounded">
          x^2
        </code>
        ,{' '}
        <code className="font-mono bg-gray-100 text-black px-1.5 py-0.5 rounded">
          sin(x)
        </code>
      </p>

      {/* Add New Graph Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 mb-6 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. sin(x), 2*x + 1"
          className="
            flex-grow min-w-48 px-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:outline-none
            text-gray-800 placeholder-gray-500
            transition
          "
          aria-label="Math function input"
        />
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer border border-gray-300"
          title="Pick graph color"
        />
        <button
          type="submit"
          className="
            px-5 py-2 bg-blue-600 text-white font-medium rounded-lg
            hover:bg-blue-700 active:bg-blue-800
            transition focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        >
          Add Graph
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Graph List */}
      <div className="mb-4 max-h-32 overflow-y-auto space-y-2 pr-2">
        {graphs.length === 0 ? (
          <p className="text-gray-500 text-sm">No graphs added.</p>
        ) : (
          graphs.map(g => (
            <div key={g.id} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block w-4 h-4 rounded border"
                style={{ backgroundColor: g.color }}
                aria-label={`Color: ${g.color}`}
              />
              <code className="font-mono bg-gray-100 text-black px-1.5 py-0.5 rounded flex-grow truncate">
                {g.expr}
              </code>
              <button
                onClick={() => removeGraph(g.id)}
                className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
                aria-label="Remove graph"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Canvas */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="bg-gray-50 w-full block"
          aria-label="Math function graph"
        />
      </div>
    </div>
  );
};
