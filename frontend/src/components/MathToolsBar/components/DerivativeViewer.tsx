// import React, { useState, useEffect } from 'react';
// declare const nerdamer: any;

// const DerivativeViewer: React.FC = () => {
//   const [expression, setExpression] = useState<string>('x^2');
//   const [derivative, setDerivative] = useState<string>('');
//   const [point, setPoint] = useState<number>(2);
//   const [error, setError] = useState<string>('');
//   const [fValues, setFValues] = useState<{ x: number; y: number }[]>([]);
//   const [fpValues, setFpValues] = useState<{ x: number; y: number }[]>([]);

//   useEffect(() => {
//     setError('');
//     try {
//       const derivExpr = nerdamer(`diff(${expression}, x)`);
//       setDerivative(derivExpr.toString());

//       const xRange = Array.from(
//         { length: 200 },
//         (_, i) => -10 + (i * 20) / 200
//       );
//       const fData = xRange
//         .map(x => {
//           try {
//             const y = nerdamer(expression).evaluate({ x }).valueOf();
//             return { x, y: typeof y === 'number' ? y : NaN };
//           } catch {
//             return { x, y: NaN };
//           }
//         })
//         .filter(p => !isNaN(p.y) && isFinite(p.y));

//       const fpData = xRange
//         .map(x => {
//           try {
//             const y = derivExpr.evaluate({ x }).valueOf();
//             return { x, y: typeof y === 'number' ? y : NaN };
//           } catch {
//             return { x, y: NaN };
//           }
//         })
//         .filter(p => !isNaN(p.y) && isFinite(p.y));

//       setFValues(fData);
//       setFpValues(fpData);
//     } catch (err) {
//       setError('Invalid function or derivative.');
//       setFValues([]);
//       setFpValues([]);
//     }
//   }, [expression]);

//   const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = parseFloat(e.target.value);
//     if (!isNaN(val)) setPoint(val);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200">
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">
//         Derivative Viewer
//       </h3>

//       <div className="mb-4">
//         <label
//           htmlFor="func"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           f(x) =
//         </label>
//         <input
//           id="func"
//           type="text"
//           value={expression}
//           onChange={e => setExpression(e.target.value)}
//           placeholder="e.g., x^2, sin(x), x^3 - 3*x"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           x = {point.toFixed(2)}
//         </label>
//         <input
//           type="range"
//           min="-5"
//           max="5"
//           step="0.1"
//           value={point}
//           onChange={handlePointChange}
//           className="w-full"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h4 className="text-sm font-medium text-gray-700 mb-2">f(x)</h4>
//           <svg
//             className="w-full h-60 border rounded-lg bg-gray-50"
//             viewBox="-10 -10 20 20"
//           >
//             <defs>
//               <marker
//                 id="arrow"
//                 markerWidth="6"
//                 markerHeight="6"
//                 refX="5"
//                 refY="3"
//                 orient="auto"
//               >
//                 <path d="M0,0 L6,3 L0,6 Z" fill="black" />
//               </marker>
//             </defs>
//             <line
//               x1="-10"
//               y1="0"
//               x2="10"
//               y2="0"
//               stroke="black"
//               strokeWidth="0.1"
//               markerEnd="url(#arrow)"
//             />
//             <line
//               x1="0"
//               y1="10"
//               x2="0"
//               y2="-10"
//               stroke="black"
//               strokeWidth="0.1"
//               markerEnd="url(#arrow)"
//             />

//             {fValues.length > 1 &&
//               fValues.map((p, i) => (
//                 <circle
//                   key={i}
//                   cx={p.x * 2}
//                   cy={-p.y * 2}
//                   r="0.1"
//                   fill="blue"
//                 />
//               ))}

//             <circle
//               cx={point * 2}
//               cy={-nerdamer(expression).evaluate({ x: point }).valueOf() * 2}
//               r="0.2"
//               fill="red"
//             />
//           </svg>
//         </div>

//         <div>
//           <h4 className="text-sm font-medium text-gray-700 mb-2">
//             f'(x) = {derivative}
//           </h4>
//           <svg
//             className="w-full h-60 border rounded-lg bg-gray-50"
//             viewBox="-10 -10 20 20"
//           >
//             <line
//               x1="-10"
//               y1="0"
//               x2="10"
//               y2="0"
//               stroke="black"
//               strokeWidth="0.1"
//               markerEnd="url(#arrow)"
//             />
//             <line
//               x1="0"
//               y1="10"
//               x2="0"
//               y2="-10"
//               stroke="black"
//               strokeWidth="0.1"
//               markerEnd="url(#arrow)"
//             />

//             {fpValues.length > 1 &&
//               fpValues.map((p, i) => (
//                 <circle
//                   key={i}
//                   cx={p.x * 2}
//                   cy={-p.y * 2}
//                   r="0.1"
//                   fill="green"
//                 />
//               ))}

//             <circle
//               cx={point * 2}
//               cy={-nerdamer(derivative).evaluate({ x: point }).valueOf() * 2}
//               r="0.2"
//               fill="red"
//             />
//           </svg>
//         </div>
//       </div>

//       <p className="text-xs text-gray-500 mt-4">
//         🔍 Move the slider to see how the slope of <strong>f(x)</strong> matches
//         the value of <strong>f'(x)</strong>.
//       </p>
//     </div>
//   );
// };

// export default DerivativeViewer;
