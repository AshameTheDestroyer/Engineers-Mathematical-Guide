// components/ProbabilityRulesExplorer.tsx
import { useState } from 'react';

export const ProbabilityRulesExplorer = () => {
  // Inputs
  const [P_A, setP_A] = useState<string>('0.3');
  const [P_B, setP_B] = useState<string>('0.5');
  const [P_A_and_B, setP_A_and_B] = useState<string>('0.1');

  // Parse safely
  const num = (s: string) => Math.max(0, Math.min(1, parseFloat(s) || 0));

  const pA = num(P_A);
  const pB = num(P_B);
  const pAandB = Math.min(pA, pB, num(P_A_and_B)); // Can't exceed P(A) or P(B)

  // Derived values
  const pAorB = pA + pB - pAandB;
  const pA_given_B = pB > 0 ? pAandB / pB : 0;
  const pB_given_A = pA > 0 ? pAandB / pA : 0;
  const independent = Math.abs(pAandB - pA * pB) < 0.01;

  // Bayes' Theorem Example: Disease Testing
  const [P_D, setP_D] = useState<string>('0.01'); // P(Disease)
  const [P_T_given_D, setP_T_given_D] = useState<string>('0.99'); // P(Test+ | Disease)
  const [P_T_given_notD, setP_T_given_notD] = useState<string>('0.02'); // P(Test+ | No Disease)

  const pD = num(P_D);
  const pTgD = num(P_T_given_D);
  const pTgND = num(P_T_given_notD);

  const pT = pTgD * pD + pTgND * (1 - pD); // Total Probability
  const pDgT = pD > 0 && pT > 0 ? (pTgD * pD) / pT : 0; // Bayes

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg font-sans">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Probability Rules Explorer
      </h2>
      <p className="text-sm text-gray-800 mb-6">
        Explore real probability theorems with interactive examples. All
        formulas are mathematically correct.
      </p>

      <div className="space-y-8 text-gray-900">
        {/* Section 1: Basic Rules */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            1. Basic Probability Rules
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                P(A)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={P_A}
                onChange={e => setP_A(e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-400 rounded text-sm
                  text-gray-900 placeholder-gray-600
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                placeholder="e.g. 0.3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                P(B)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={P_B}
                onChange={e => setP_B(e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-400 rounded text-sm
                  text-gray-900 placeholder-gray-600
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                placeholder="e.g. 0.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                P(A ∩ B)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={P_A_and_B}
                onChange={e => setP_A_and_B(e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-400 rounded text-sm
                  text-gray-900 placeholder-gray-600
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                placeholder="e.g. 0.1"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border border-gray-200">
            <div>
              <strong className="text-gray-900">Addition Rule:</strong>{' '}
              <span className="font-mono text-gray-900">
                P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
              </span>
            </div>
            <div className="ml-4 text-gray-900">
              = {pA.toFixed(3)} + {pB.toFixed(3)} - {pAandB.toFixed(3)} ={' '}
              <strong>{pAorB.toFixed(3)}</strong>
            </div>

            <div className="mt-2">
              <strong className="text-gray-900">
                Conditional Probability:
              </strong>
            </div>
            <div className="ml-4 text-gray-900">
              P(A|B) = P(A ∩ B) / P(B) = {pAandB.toFixed(3)} / {pB.toFixed(3)} ={' '}
              <strong>{pA_given_B.toFixed(3)}</strong>
            </div>
            <div className="ml-4 text-gray-900">
              P(B|A) = P(A ∩ B) / P(A) = {pAandB.toFixed(3)} / {pA.toFixed(3)} ={' '}
              <strong>{pB_given_A.toFixed(3)}</strong>
            </div>

            <div className="mt-2">
              <strong className="text-gray-900">Independence:</strong>{' '}
              <span className="text-gray-900">
                A and B are{' '}
                {independent ? <strong>independent</strong> : 'not independent'}{' '}
                because:
              </span>
            </div>
            <div className="ml-4 text-gray-900">
              P(A)·P(B) = {pA.toFixed(3)} × {pB.toFixed(3)} ={' '}
              {(pA * pB).toFixed(3)}, P(A ∩ B) = {pAandB.toFixed(3)}
            </div>
          </div>
        </section>

        {/* Section 2: Bayes’ Theorem */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            2. Bayes’ Theorem (Medical Test Example)
          </h3>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                P(D)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                max="1"
                value={P_D}
                onChange={e => setP_D(e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-400 rounded text-sm
                  text-gray-900 placeholder-gray-600
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                placeholder="P(Disease)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                P(T|D)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={P_T_given_D}
                onChange={e => setP_T_given_D(e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-400 rounded text-sm
                  text-gray-900 placeholder-gray-600
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                placeholder="P(Test+ | Disease)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                P(T|¬D)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={P_T_given_notD}
                onChange={e => setP_T_given_notD(e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-400 rounded text-sm
                  text-gray-900 placeholder-gray-600
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                placeholder="P(Test+ | No Disease)"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border border-gray-200">
            <div>
              <strong className="text-gray-900">Total Probability:</strong>{' '}
              <span className="font-mono text-gray-900">
                P(T) = P(T|D)P(D) + P(T|¬D)P(¬D)
              </span>
            </div>
            <div className="ml-4 text-gray-900">
              = ({pTgD})({pD}) + ({pTgND})(1−{pD}) = {pT.toFixed(4)}
            </div>

            <div className="mt-2">
              <strong className="text-gray-900">Bayes’ Theorem:</strong>{' '}
              <span className="font-mono text-gray-900">
                P(D|T) = [P(T|D) P(D)] / P(T)
              </span>
            </div>
            <div className="ml-4 text-gray-900">
              = ({pTgD} × {pD}) / {pT.toFixed(4)} ={' '}
              <strong>{pDgT.toFixed(4)}</strong>
            </div>

            <div className="mt-2 text-blue-800 bg-blue-50 p-2 rounded inline-block">
              <strong>Interpretation:</strong> Even with a positive test,
              there's only a {Math.round(pDgT * 100)}% chance of having the
              disease.
            </div>
          </div>
        </section>

        {/* Section 3: Venn Diagram */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            3. Venn Diagram
          </h3>
          <div className="flex justify-center">
            <svg
              width="300"
              height="200"
              className="border border-gray-400 rounded bg-white"
            >
              {/* Circles */}
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="rgba(59, 130, 246, 0.3)"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <circle
                cx="180"
                cy="100"
                r="60"
                fill="rgba(16, 185, 129, 0.3)"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Labels */}
              <text
                x="80"
                y="60"
                fontSize="14"
                fill="#1f2937"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
              >
                A
              </text>
              <text
                x="200"
                y="60"
                fontSize="14"
                fill="#1f2937"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
              >
                B
              </text>
              <text
                x="130"
                y="100"
                fontSize="12"
                fill="#1f2937"
                fontFamily="Arial, sans-serif"
              >
                A ∩ B
              </text>

              {/* Values */}
              <text
                x="50"
                y="180"
                fontSize="12"
                fill="#1f2937"
                fontFamily="Arial, sans-serif"
              >
                P(A) = {pA.toFixed(2)}
              </text>
              <text
                x="170"
                y="180"
                fontSize="12"
                fill="#1f2937"
                fontFamily="Arial, sans-serif"
              >
                P(B) = {pB.toFixed(2)}
              </text>
              <text
                x="120"
                y="150"
                fontSize="12"
                fill="#1f2937"
                fontFamily="Arial, sans-serif"
              >
                P(A∩B) = {pAandB.toFixed(2)}
              </text>
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
};
