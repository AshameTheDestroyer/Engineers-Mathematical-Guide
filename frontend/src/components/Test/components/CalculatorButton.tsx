import { useState } from 'react';

const CalculatorButton = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
      >
        {show ? 'Hide Calculator' : 'Open Desmos Calculator'}
      </button>

      {show && (
        <div className="mt-2 border rounded overflow-hidden shadow">
          <div id="calculator" style={{ width: '100%', height: '400px' }}></div>
        </div>
      )}
    </div>
  );
};
