import React, { useState } from 'react';
// import * as nerdamer from 'nerdamer';
import 'nerdamer/Calculus.js'; // Must be imported for side effects
// Declare nerdamer (since it has no official @types)
declare const nerdamer: any;

// Load nerdamer via CDN or install via npm
// Make sure to include nerdamer.core.js + Calculus.js

const DerivativeIntegralCalculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('x^2');
  const [variable, setVariable] = useState<string>('x');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [operation, setOperation] = useState<'derivative' | 'integral'>(
    'derivative'
  );

  const handleCalculate = () => {
    setError('');
    setResult('');

    try {
      if (!expression.trim()) {
        setError('Please enter an expression.');
        return;
      }

      if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(variable)) {
        setError(
          'Invalid variable name. Use letters and numbers, starting with a letter.'
        );
        return;
      }

      let resultExpr = '';

      if (operation === 'derivative') {
        try {
          const deriv = nerdamer(`diff(${expression}, ${variable})`);
          resultExpr = deriv.toString();
        } catch (err) {
          throw new Error('Derivative computation failed');
        }
      } else {
        try {
          const integral = nerdamer(`integrate(${expression}, ${variable})`);
          resultExpr = integral.toString();
        } catch (err) {
          resultExpr = '';
        }
      }

      // Check if result is valid
      if (
        !resultExpr ||
        resultExpr === '' ||
        resultExpr.includes('integrate(')
      ) {
        setError(
          'Could not compute result — expression may be too complex or unsupported.'
        );
        return;
      }

      // Optional: simplify again
      try {
        resultExpr = nerdamer(resultExpr).toString();
      } catch {}

      setResult(resultExpr);
    } catch (err: any) {
      setError(
        'Calculation error: Invalid expression or unsupported operation.'
      );
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">
        Derivative & Integral Calculator
      </h3>

      {/* Operation Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Operation
        </label>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              value="derivative"
              checked={operation === 'derivative'}
              onChange={() => setOperation('derivative')}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-gray-700 text-sm">Derivative</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="integral"
              checked={operation === 'integral'}
              onChange={() => setOperation('integral')}
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-gray-700 text-sm">Integral</span>
          </label>
        </div>
      </div>

      {/* Expression Input */}
      <div className="mb-4">
        <label
          htmlFor="expression"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Function f({variable})
        </label>
        <input
          id="expression"
          type="text"
          value={expression}
          onChange={e => setExpression(e.target.value)}
          placeholder="e.g., x^2, sin(x), exp(x)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Variable Input */}
      <div className="mb-5">
        <label
          htmlFor="variable"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Variable
        </label>
        <input
          id="variable"
          type="text"
          value={variable}
          onChange={e => setVariable(e.target.value)}
          placeholder="x"
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        Calculate {operation === 'derivative' ? 'Derivative' : 'Integral'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Success Result */}
      {result && !error && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>
              {operation === 'derivative'
                ? `f'(${variable}) = `
                : `∫f(${variable})d${variable} = `}
            </strong>
            <code className="font-mono text-green-900 bg-green-100 px-1.5 py-0.5 rounded">
              {result}
            </code>
          </p>
        </div>
      )}

      {/* Examples */}
      <div className="mt-5 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-1">Examples:</p>
        <p>
          <code>sin(x)</code> → derivative: <code>cos(x)</code>, integral:{' '}
          <code>-cos(x)</code>
        </p>
        <p>
          <code>x^2</code> → integral: <code>x^3/3</code>
        </p>
        <p>
          <code>exp(x)</code> → both derivative and integral:{' '}
          <code>exp(x)</code>
        </p>
      </div>
    </div>
  );
};

export default DerivativeIntegralCalculator;
