// import React, { useState, useEffect, useRef } from "react";
// declare const nerdamer: any;

// const DerivativeViewer: React.FC = () => {
//     const [expression, setExpression] = useState<string>("x^2");
//     const [derivative, setDerivative] = useState<string>("");
//     const [point, setPoint] = useState<number>(2);
//     const [error, setError] = useState<string>("");
//     const [fValues, setFValues] = useState<{ x: number; y: number }[]>([]);
//     const [fpValues, setFpValues] = useState<{ x: number; y: number }[]>([]);
//     const [position, setPosition] = useState({
//         x: window.innerWidth - 600,
//         y: 100,
//     });
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             if (!isDragging) return;
//             const newX = e.clientX - dragOffset.x;
//             const newY = e.clientY - dragOffset.y;
//             setPosition({ x: newX, y: newY });
//         };

//         const handleMouseUp = () => {
//             setIsDragging(false);
//         };

//         document.addEventListener("mousemove", handleMouseMove);
//         document.addEventListener("mouseup", handleMouseUp);

//         return () => {
//             document.removeEventListener("mousemove", handleMouseMove);
//             document.removeEventListener("mouseup", handleMouseUp);
//         };
//     }, [isDragging, dragOffset]);

//     const handleMouseDown = (e: React.MouseEvent) => {
//         if (containerRef.current && e.target instanceof HTMLElement) {
//             const rect = containerRef.current.getBoundingClientRect();
//             setDragOffset({
//                 x: e.clientX - rect.left,
//                 y: e.clientY - rect.top,
//             });
//             setIsDragging(true);
//         }
//     };

//     useEffect(() => {
//         setError("");
//         try {
//             const derivExpr = nerdamer(`diff(${expression}, x)`);
//             setDerivative(derivExpr.toString());

//             const xRange = Array.from(
//                 { length: 200 },
//                 (_, i) => -10 + (i * 20) / 200
//             );
//             const fData = xRange
//                 .map((x) => {
//                     try {
//                         const y = nerdamer(expression)
//                             .evaluate({ x })
//                             .valueOf();
//                         return { x, y: typeof y === "number" ? y : NaN };
//                     } catch {
//                         return { x, y: NaN };
//                     }
//                 })
//                 .filter((p) => !isNaN(p.y) && isFinite(p.y));

//             const fpData = xRange
//                 .map((x) => {
//                     try {
//                         const y = derivExpr.evaluate({ x }).valueOf();
//                         return { x, y: typeof y === "number" ? y : NaN };
//                     } catch {
//                         return { x, y: NaN };
//                     }
//                 })
//                 .filter((p) => !isNaN(p.y) && isFinite(p.y));

//             setFValues(fData);
//             setFpValues(fpData);
//         } catch (err) {
//             setError("Invalid function or derivative.");
//             setFValues([]);
//             setFpValues([]);
//         }
//     }, [expression]);

//     const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const val = parseFloat(e.target.value);
//         if (!isNaN(val)) setPoint(val);
//     };

//     return (
//         <div
//             ref={containerRef}
//             className="fixed z-50 cursor-move"
//             style={{ left: `${position.x}px`, top: `${position.y}px` }}
//             onMouseDown={handleMouseDown}
//         >
//             <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
//                 <h3 className="mb-4 text-xl font-semibold text-gray-800">
//                     Derivative Viewer
//                 </h3>

//                 <div className="mb-4">
//                     <label
//                         htmlFor="func"
//                         className="mb-1 block text-sm font-medium text-gray-700"
//                     >
//                         f(x) =
//                     </label>
//                     <input
//                         id="func"
//                         type="text"
//                         value={expression}
//                         onChange={(e) => setExpression(e.target.value)}
//                         placeholder="e.g., x^2, sin(x), x^3 - 3*x"
//                         className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 {error && (
//                     <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">
//                         {error}
//                     </div>
//                 )}

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                         x = {point.toFixed(2)}
//                     </label>
//                     <input
//                         type="range"
//                         min="-5"
//                         max="5"
//                         step="0.1"
//                         value={point}
//                         onChange={handlePointChange}
//                         className="w-full"
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                     <div>
//                         <h4 className="mb-2 text-sm font-medium text-gray-700">
//                             f(x)
//                         </h4>
//                         <svg
//                             className="h-60 w-full rounded-lg border bg-gray-50"
//                             viewBox="-10 -10 20 20"
//                         >
//                             <defs>
//                                 <marker
//                                     id="arrow"
//                                     markerWidth="6"
//                                     markerHeight="6"
//                                     refX="5"
//                                     refY="3"
//                                     orient="auto"
//                                 >
//                                     <path d="M0,0 L6,3 L0,6 Z" fill="black" />
//                                 </marker>
//                             </defs>
//                             <line
//                                 x1="-10"
//                                 y1="0"
//                                 x2="10"
//                                 y2="0"
//                                 stroke="black"
//                                 strokeWidth="0.1"
//                                 markerEnd="url(#arrow)"
//                             />
//                             <line
//                                 x1="0"
//                                 y1="10"
//                                 x2="0"
//                                 y2="-10"
//                                 stroke="black"
//                                 strokeWidth="0.1"
//                                 markerEnd="url(#arrow)"
//                             />

//                             {fValues.length > 1 &&
//                                 fValues.map((p, i) => (
//                                     <circle
//                                         key={i}
//                                         cx={p.x * 2}
//                                         cy={-p.y * 2}
//                                         r="0.1"
//                                         fill="blue"
//                                     />
//                                 ))}

//                             <circle
//                                 cx={point * 2}
//                                 cy={
//                                     -nerdamer(expression)
//                                         .evaluate({ x: point })
//                                         .valueOf() * 2
//                                 }
//                                 r="0.2"
//                                 fill="red"
//                             />
//                         </svg>
//                     </div>

//                     <div>
//                         <h4 className="mb-2 text-sm font-medium text-gray-700">
//                             f'(x) = {derivative}
//                         </h4>
//                         <svg
//                             className="h-60 w-full rounded-lg border bg-gray-50"
//                             viewBox="-10 -10 20 20"
//                         >
//                             <line
//                                 x1="-10"
//                                 y1="0"
//                                 x2="10"
//                                 y2="0"
//                                 stroke="black"
//                                 strokeWidth="0.1"
//                                 markerEnd="url(#arrow)"
//                             />
//                             <line
//                                 x1="0"
//                                 y1="10"
//                                 x2="0"
//                                 y2="-10"
//                                 stroke="black"
//                                 strokeWidth="0.1"
//                                 markerEnd="url(#arrow)"
//                             />

//                             {fpValues.length > 1 &&
//                                 fpValues.map((p, i) => (
//                                     <circle
//                                         key={i}
//                                         cx={p.x * 2}
//                                         cy={-p.y * 2}
//                                         r="0.1"
//                                         fill="green"
//                                     />
//                                 ))}

//                             <circle
//                                 cx={point * 2}
//                                 cy={
//                                     -nerdamer(derivative)
//                                         .evaluate({ x: point })
//                                         .valueOf() * 2
//                                 }
//                                 r="0.2"
//                                 fill="red"
//                             />
//                         </svg>
//                     </div>
//                 </div>

//                 <p className="mt-4 text-xs text-gray-500">
//                     🔍 Move the slider to see how the slope of{" "}
//                     <strong>f(x)</strong> matches the value of{" "}
//                     <strong>f'(x)</strong>.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default DerivativeViewer;
