import React, { useState } from 'react';
import MatrixCalculator from './components/MatriciesCalculator';
import DerivativeIntegralCalculator from './components/DerivativeIntegralCalculator';
// import VectorMatrixVisualizer from './components/VectorMatrixVisualizer';
import { UnitCircleWidget } from './components/UnitCirculeWidget';
import { PolygonFromAnglesBuilder } from './components/PolygonFromAnglesBuilder';
import { PolygonAngleExplorer } from './components/PolygonAngleExplorer';
import { ProbabilityRulesExplorer } from './components/ProbabilityRulesExplorer';
import { MathGraphWidget } from './components/MathGraphWidget';
import DerivativeViewer from './components/DerivativeViewer';
import { ProbabilitySimulator } from './components/ProbabilitySimulator';

// Define the calculator names as a union type
type CalculatorName =
  | 'matricesCalc'
  | 'derivativeIntegralCalculator'
  | 'derivativeViewer'
  | 'mathGraphWidget'
  | 'probabilityRulesExplorer'
  | 'probabilitySimulator'
  | 'unitCircleWidget'
  | 'vectorMatrixVisualizer';

function MathToolsBar() {
  const [calcName, setCalcName] = useState<CalculatorName | ''>('');
  const [isShowMathToolsBar, setIsShowMathToolsBar] = useState(true);

  if (isShowMathToolsBar) {
    return (
      <section className="flex flex-col gap-5 overflow-hidden border-b-2 border-gray-200">
        <div className="flex flex-wrap items-center gap-2 bg-red-400 p-2">
          {/* Matrices Calculator Button */}
          <button
            className={`p-2 rounded transition-colors ${
              calcName === 'matricesCalc'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
            onClick={() =>
              setCalcName(calcName === 'matricesCalc' ? '' : 'matricesCalc')
            }
          >
            {/* {calcName === 'matricesCalc' ? 'Close' : 'Matrices Calculator'} */}
            Matrices Calculator
          </button>

          {/* Derivative Integral Calculator */}
          <button
            className={`p-2 rounded transition-colors ${
              calcName === 'derivativeIntegralCalculator'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
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

          {/* Derivative Viewer */}
          <button
            className={`p-2 rounded transition-colors ${
              calcName === 'derivativeViewer'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
            onClick={() =>
              setCalcName(
                calcName === 'derivativeViewer' ? '' : 'derivativeViewer'
              )
            }
          >
            Derivative Viewer
          </button>

          {/* Math Graph Widget */}
          <button
            className={`p-2 rounded transition-colors ${
              calcName === 'mathGraphWidget'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
            onClick={() =>
              setCalcName(
                calcName === 'mathGraphWidget' ? '' : 'mathGraphWidget'
              )
            }
          >
            Math Graph Widget
          </button>

          {/* Probability Rules Explorer */}
          <button
            className={`p-2 rounded transition-colors ${
              calcName === 'probabilityRulesExplorer'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
            onClick={() =>
              setCalcName(
                calcName === 'probabilityRulesExplorer'
                  ? ''
                  : 'probabilityRulesExplorer'
              )
            }
          >
            Probability Rules Explorer
          </button>

          {/* Probability Simulator */}
          <button
            className={`p-2 rounded transition-colors ${
              calcName === 'probabilitySimulator'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
            onClick={() =>
              setCalcName(
                calcName === 'probabilitySimulator'
                  ? ''
                  : 'probabilitySimulator'
              )
            }
          >
            Probability Simulator
          </button>

          {/* Unit Circle Widget */}
          <button
            className={`p-2 rounded transition-colors ${
              calcName === 'unitCircleWidget'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
            onClick={() =>
              setCalcName(
                calcName === 'unitCircleWidget' ? '' : 'unitCircleWidget'
              )
            }
          >
            Unit Circle Widget
          </button>

          {/* Vector Matrix Visualizer */}
          {/* <button
            className={`p-2 rounded transition-colors ${
              calcName === 'vectorMatrixVisualizer'
                ? 'bg-white text-blue-600 font-medium'
                : 'hover:bg-red-300'
            }`}
            onClick={() =>
              setCalcName(
                calcName === 'vectorMatrixVisualizer'
                  ? ''
                  : 'vectorMatrixVisualizer'
              )
            }
          >
            Vector Matrix Visualizer
          </button> */}

          {/* Close Button */}
          <button
            className="ml-auto p-2 bg-gray-200 hover:bg-gray-300 rounded font-bold text-lg"
            onClick={() => setIsShowMathToolsBar(false)}
            aria-label="Close math tools bar"
          >
            x
          </button>
        </div>

        <main className={calcName ? 'p-4 min-h-40' : 'hidden'}>
          {calcName === 'matricesCalc' && <MatrixCalculator />}
          {calcName === 'derivativeIntegralCalculator' && (
            <DerivativeIntegralCalculator />
          )}
          {/* {calcName === 'vectorMatrixVisualizer' && <VectorMatrixVisualizer />} */}
          {calcName === 'derivativeViewer' && <DerivativeViewer />}
          {calcName === 'mathGraphWidget' && <MathGraphWidget />}
          {calcName === 'probabilityRulesExplorer' && (
            <ProbabilityRulesExplorer />
          )}
          {calcName === 'probabilitySimulator' && <ProbabilitySimulator />}
          {calcName === 'unitCircleWidget' && <UnitCircleWidget />}
        </main>
      </section>
    );
  }

  return (
    <button
      className="bg-yellow-300 p-5 font-medium hover:bg-yellow-400 transition"
      onClick={() => setIsShowMathToolsBar(true)}
    >
      Open Math Tools
    </button>
  );
}

export default MathToolsBar;
