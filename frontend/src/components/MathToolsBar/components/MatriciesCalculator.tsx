import { useState, useEffect } from 'react';

type Matrix = number[][];

export default function MatrixCalculator() {
  const [rowsA, setRowsA] = useState<number>(2);
  const [colsA, setColsA] = useState<number>(2);
  const [rowsB, setRowsB] = useState<number>(2);
  const [colsB, setColsB] = useState<number>(2);

  const [matrixA, setMatrixA] = useState<Matrix>(createEmptyMatrix(2, 2));
  const [matrixB, setMatrixB] = useState<Matrix>(createEmptyMatrix(2, 2));
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>(
    'add'
  );
  const [result, setResult] = useState<Matrix | null>(null);
  const [error, setError] = useState<string>('');

  function createEmptyMatrix(rows: number, cols: number): Matrix {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
  }

  const handleAChange = (i: number, j: number, value: string) => {
    const val = parseFloat(value) || 0;
    setMatrixA(prev =>
      prev.map((row, idx) =>
        idx === i ? row.map((cell, jdx) => (jdx === j ? val : cell)) : row
      )
    );
  };

  const handleBChange = (i: number, j: number, value: string) => {
    const val = parseFloat(value) || 0;
    setMatrixB(prev =>
      prev.map((row, idx) =>
        idx === i ? row.map((cell, jdx) => (jdx === j ? val : cell)) : row
      )
    );
  };

  useEffect(() => {
    setMatrixA(createEmptyMatrix(rowsA, colsA));
    setResult(null);
    setError('');
  }, [rowsA, colsA]);

  useEffect(() => {
    setMatrixB(createEmptyMatrix(rowsB, colsB));
    setResult(null);
    setError('');
  }, [rowsB, colsB]);

  const addMatrices = (a: Matrix, b: Matrix): Matrix => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
    const result: Matrix = Array.from({ length: a.length }, () =>
      Array.from({ length: b[0].length }, () => 0)
    );

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  };

  const calculate = () => {
    setError('');
    setResult(null);

    if (operation === 'add' || operation === 'subtract') {
      if (rowsA !== rowsB || colsA !== colsB) {
        setError(`For ${operation}, matrices must have the same dimensions.`);
        return;
      }
    }

    if (operation === 'multiply' && colsA !== rowsB) {
      setError(
        'For multiplication, columns of Matrix A must equal rows of Matrix B.'
      );
      return;
    }

    try {
      let res: Matrix;
      if (operation === 'add') {
        res = addMatrices(matrixA, matrixB);
      } else if (operation === 'subtract') {
        res = subtractMatrices(matrixA, matrixB);
      } else {
        res = multiplyMatrices(matrixA, matrixB);
      }
      setResult(res);
    } catch (err) {
      setError('An error occurred during calculation.');
    }
  };

  const containerStyle =
    'max-h-48 overflow-y-auto border border-gray-300 rounded p-2 bg-gray-50';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Matrix Calculator
      </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Operation
        </label>
        <select
          value={operation}
          onChange={e => setOperation(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="add">Addition (A + B)</option>
          <option value="subtract">Subtraction (A - B)</option>
          <option value="multiply">Multiplication (A × B)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Matrix A</h2>
          <div className="flex gap-4 mb-3">
            <div>
              <label className="block text-xs text-gray-600">Rows</label>
              <input
                type="number"
                min="1"
                max="10"
                value={rowsA}
                onChange={e => {
                  const val = Math.max(
                    1,
                    Math.min(10, parseInt(e.target.value) || 1)
                  );
                  setRowsA(val);
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 bg-white"
                style={{ color: 'black', WebkitTextFillColor: 'black' }}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Columns</label>
              <input
                type="number"
                min="1"
                max="10"
                value={colsA}
                onChange={e => {
                  const val = Math.max(
                    1,
                    Math.min(10, parseInt(e.target.value) || 1)
                  );
                  setColsA(val);
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 bg-white"
                style={{ color: 'black', WebkitTextFillColor: 'black' }}
                autoComplete="off"
              />
            </div>
          </div>

          <div className={containerStyle}>
            {matrixA.map((row, i) => (
              <div key={i} className="flex gap-1 mb-1">
                {row.map((cell, j) => (
                  <input
                    key={`${i}-${j}`}
                    type="number"
                    step="any"
                    value={cell}
                    onChange={e => handleAChange(i, j, e.target.value)}
                    onFocus={e => e.target.select()}
                    className="w-14 h-10 border border-gray-400 rounded text-center text-sm font-mono text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      minWidth: '3.5rem',
                      color: 'black',
                      WebkitTextFillColor: 'black',
                    }}
                    autoComplete="off"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Matrix B</h2>
          <div className="flex gap-4 mb-3">
            <div>
              <label className="block text-xs text-gray-600">Rows</label>
              <input
                type="number"
                min="1"
                max="10"
                value={rowsB}
                onChange={e => {
                  const val = Math.max(
                    1,
                    Math.min(10, parseInt(e.target.value) || 1)
                  );
                  setRowsB(val);
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 bg-white"
                style={{ color: 'black', WebkitTextFillColor: 'black' }}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Columns</label>
              <input
                type="number"
                min="1"
                max="10"
                value={colsB}
                onChange={e => {
                  const val = Math.max(
                    1,
                    Math.min(10, parseInt(e.target.value) || 1)
                  );
                  setColsB(val);
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 bg-white"
                style={{ color: 'black', WebkitTextFillColor: 'black' }}
                autoComplete="off"
              />
            </div>
          </div>

          <div className={containerStyle}>
            {matrixB.map((row, i) => (
              <div key={i} className="flex gap-1 mb-1">
                {row.map((cell, j) => (
                  <input
                    key={`${i}-${j}`}
                    type="number"
                    step="any"
                    value={cell}
                    onChange={e => handleBChange(i, j, e.target.value)}
                    onFocus={e => e.target.select()}
                    className="w-14 h-10 border border-gray-400 rounded text-center text-sm font-mono text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      minWidth: '3.5rem',
                      color: 'black',
                      WebkitTextFillColor: 'black',
                    }}
                    autoComplete="off"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={calculate}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Calculate
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Result</h2>
          <div className="flex justify-center">
            <div className="border border-gray-300 rounded p-4 bg-gray-50 max-w-xs overflow-auto">
              {result.map((row, i) => (
                <div key={i} className="flex gap-1">
                  {row.map((val, j) => (
                    <span
                      key={`${i}-${j}`}
                      className="w-14 h-10 flex items-center justify-center text-sm font-mono text-gray-800"
                    >
                      {Number.isInteger(val) ? val : val.toFixed(2)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
