import React, { useState } from 'react';
import MatrixCalculator from './components/MatriciesCalculator';
import DerivativeIntegralCalculator from './components/DerivativeIntegralCalculator';

// interface Props {}

function MathToolsBar() {
  const [calcName, setCalcName] = useState('');
  const [isShowMathToolsBar, setIsShowMathToolsBar] = useState(true);

  if (isShowMathToolsBar) {
    return (
      <section className="flex flex-col gap-5 ">
        <div className="flex justify-between w-full bg-red-400 p-2">
          <button
            className={` p-2
              ${calcName === 'matricesCalc' ? 'bg-white text-blue-600' : ''}
            `}
            onClick={() =>
              setCalcName(calcName === 'matricesCalc' ? '' : 'matricesCalc')
            }
          >
            {/* {calcName === 'matricesCalc' ? 'Close' : 'Matrices Calculator'} */}
            Matrices Calculator
          </button>
          <button className="p-2">Scientific Calculator</button>
          <button className="p-2">Graph Calculator</button>
          <button className="p-2">Simple Calculator</button>
          <button
            className={` p-2
              ${calcName === 'derivativeIntegralCalculator' ? 'bg-white text-blue-600' : ''}
            `}
            onClick={() =>
              setCalcName(
                calcName === 'derivativeIntegralCalculator'
                  ? ''
                  : 'derivativeIntegralCalculator'
              )
            }
          >
            Derivative Integral Calculator
          </button>
          <button className="p-2" onClick={() => setIsShowMathToolsBar(false)}>
            x
          </button>
        </div>
        <main>
          {calcName == 'matricesCalc' && <MatrixCalculator />}
          {calcName == 'derivativeIntegralCalculator' && (
            <DerivativeIntegralCalculator />
          )}
        </main>
      </section>
    );
  } else {
    // <button
    //   className="bg-yellow-300 p-5"
    //   onClick={() => setIsShowMathToolsBar(true)}
    // >
    //   open
    // </button>;
  }
}

export default MathToolsBar;
