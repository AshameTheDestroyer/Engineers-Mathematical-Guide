import { FC, useState, useRef, useEffect } from "react";
import { Typography } from "../Typography/Typography";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

// Declare nerdamer (if loaded via CDN)
declare const nerdamer: any;

interface DerivativeIntegralCalculatorProps {
    onClose?: () => void;
}

export const DerivativeIntegralCalculator: FC<
    DerivativeIntegralCalculatorProps
> = ({ onClose }) => {
    const [expression, setExpression] = useState<string>("x^2");
    const [variable, setVariable] = useState<string>("x");
    const [result, setResult] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [operation, setOperation] = useState<"derivative" | "integral">(
        "derivative"
    );
    const [position, setPosition] = useState({
        x: window.innerWidth - 400,
        y: 100,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
            });
        };

        const handleMouseUp = () => setIsDragging(false);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsDragging(true);
        }
    };

    const handleCalculate = () => {
        setError("");
        setResult("");

        if (!expression.trim()) {
            setError("Please enter an expression.");
            return;
        }

        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(variable)) {
            setError(
                "Invalid variable name. Use letters and numbers, starting with a letter."
            );
            return;
        }

        try {
            let resultExpr = "";

            if (operation === "derivative") {
                const deriv = nerdamer(`diff(${expression}, ${variable})`);
                resultExpr = deriv.toString();
            } else {
                const integral = nerdamer(
                    `integrate(${expression}, ${variable})`
                );
                resultExpr = integral.toString();
            }

            if (
                !resultExpr ||
                resultExpr.includes("integrate") ||
                resultExpr.includes("diff")
            ) {
                setError(
                    "Could not compute — expression may be too complex or unsupported."
                );
                return;
            }

            resultExpr = nerdamer(resultExpr).toString();

            setResult(resultExpr);
        } catch (err: any) {
            setError(
                "Calculation error: Invalid expression or unsupported operation."
            );
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed z-50 cursor-move rounded-xl shadow-lg"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: "var(--color-background-light)",
                border: "1px solid var(--color-background-dark)",
            }}
            onMouseDown={handleMouseDown}
        >
            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full"
                    style={{
                        backgroundColor: "var(--color-secondary-light)",
                        color: "var(--color-secondary-darker)",
                    }}
                >
                    <Typography variant="span" className="text-sm font-bold">
                        ✕
                    </Typography>
                </button>
            )}

            <div className="rounded-xl p-6">
                <Typography
                    variant="h3"
                    className="mb-5 font-semibold"
                    style={{ color: "var(--color-foreground-darker)" }}
                >
                    Derivative & Integral Calculator
                </Typography>

                {/* Operation */}
                <div className="mb-4">
                    <Typography
                        variant="label"
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "var(--color-foreground-dark)" }}
                    >
                        Operation
                    </Typography>
                    <div className="flex space-x-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                checked={operation === "derivative"}
                                onChange={() => setOperation("derivative")}
                                className="h-4 w-4"
                                style={{
                                    accentColor: "var(--color-primary-normal)",
                                }}
                            />
                            <Typography
                                variant="span"
                                className="ml-2 text-sm"
                                style={{
                                    color: "var(--color-foreground-normal)",
                                }}
                            >
                                Derivative
                            </Typography>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                checked={operation === "integral"}
                                onChange={() => setOperation("integral")}
                                className="h-4 w-4"
                                style={{
                                    accentColor: "var(--color-primary-normal)",
                                }}
                            />
                            <Typography
                                variant="span"
                                className="ml-2 text-sm"
                                style={{
                                    color: "var(--color-foreground-normal)",
                                }}
                            >
                                Integral
                            </Typography>
                        </label>
                    </div>
                </div>

                {/* Expression */}
                <div className="mb-4">
                    <Typography
                        variant="label"
                        className="mb-1 block text-sm font-medium"
                        style={{ color: "var(--color-foreground-dark)" }}
                    >
                        Function f({variable})
                    </Typography>
                    <Input
                        name="calc"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        placeholder="e.g., x^2, sin(x), exp(x)"
                        className="w-full"
                        style={{
                            backgroundColor: "var(--color-background-normal)",
                            borderColor: "var(--color-background-dark)",
                            color: "var(--color-foreground-darker)",
                        }}
                    />
                </div>

                {/* Variable */}
                <div className="mb-5">
                    <Typography
                        variant="label"
                        className="mb-1 block text-sm font-medium"
                        style={{ color: "var(--color-foreground-dark)" }}
                    >
                        Variable
                    </Typography>
                    <Input
                        name="calc"
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                        placeholder="x"
                        className="w-20"
                        style={{
                            backgroundColor: "var(--color-background-normal)",
                            borderColor: "var(--color-background-dark)",
                            color: "var(--color-foreground-darker)",
                        }}
                    />
                </div>

                {/* Calculate Button */}
                <Button
                    onClick={handleCalculate}
                    variant="default"
                    className="mb-4 w-full"
                    style={{
                        backgroundColor: "var(--color-primary-normal)",
                        color: "white",
                    }}
                >
                    Calculate{" "}
                    {operation === "derivative" ? "Derivative" : "Integral"}
                </Button>

                {/* Error */}
                {error && (
                    <div
                        className="mt-3 rounded border-l-4 px-3 py-2 text-sm"
                        style={{
                            borderColor: "var(--color-secondary-normal)",
                            backgroundColor: "var(--color-secondary-light)",
                            color: "var(--color-secondary-darker)",
                        }}
                    >
                        <Typography variant="p">{error}</Typography>
                    </div>
                )}

                {/* Result */}
                {result && !error && (
                    <div
                        className="mt-3 rounded-lg border px-4 py-3"
                        style={{
                            borderColor: "var(--color-primary-light)",
                            backgroundColor: "var(--color-primary-light)",
                            color: "var(--color-primary-darker)",
                        }}
                    >
                        <Typography variant="p" className="text-sm">
                            <strong>
                                {operation === "derivative"
                                    ? `f'(${variable}) = `
                                    : `∫f(${variable})d${variable} = `}
                            </strong>
                            <code
                                className="rounded px-1.5 py-0.5 font-mono"
                                style={{
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                    fontFamily: "monospace",
                                }}
                            >
                                {result}
                            </code>
                        </Typography>
                    </div>
                )}

                {/* Examples */}
                <div
                    className="mt-5 rounded-lg p-3 text-xs"
                    style={{
                        backgroundColor: "var(--color-background-normal)",
                        color: "var(--color-foreground-light)",
                    }}
                >
                    <Typography variant="strong" className="mb-1 block">
                        Examples:
                    </Typography>
                    <Typography variant="p" className="block">
                        sin(x) → deriv: cos(x), integral: -cos(x)
                    </Typography>
                    <Typography variant="p" className="block">
                        x^2 → integral: x^3/3
                    </Typography>
                    <Typography variant="p" className="block">
                        exp(x) → both: exp(x)
                    </Typography>
                </div>
            </div>
        </div>
    );
};

// import React, { useState, useRef, useEffect } from "react";
// declare const nerdamer: any;

// interface DerivativeIntegralCalculatorProps {
//     onClose?: () => void;
// }

// const DerivativeIntegralCalculator: React.FC<
//     DerivativeIntegralCalculatorProps
// > = ({ onClose }) => {
//     const [expression, setExpression] = useState<string>("x^2");
//     const [variable, setVariable] = useState<string>("x");
//     const [result, setResult] = useState<string>("");
//     const [error, setError] = useState<string>("");
//     const [operation, setOperation] = useState<"derivative" | "integral">(
//         "derivative"
//     );
//     const [position, setPosition] = useState({
//         x: window.innerWidth - 400,
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

//     const handleCalculate = () => {
//         setError("");
//         setResult("");

//         try {
//             if (!expression.trim()) {
//                 setError("Please enter an expression.");
//                 return;
//             }

//             if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(variable)) {
//                 setError(
//                     "Invalid variable name. Use letters and numbers, starting with a letter."
//                 );
//                 return;
//             }

//             let resultExpr = "";

//             if (operation === "derivative") {
//                 try {
//                     const deriv = nerdamer(`diff(${expression}, ${variable})`);
//                     resultExpr = deriv.toString();
//                 } catch (err) {
//                     throw new Error("Derivative computation failed");
//                 }
//             } else {
//                 try {
//                     const integral = nerdamer(
//                         `integrate(${expression}, ${variable})`
//                     );
//                     resultExpr = integral.toString();
//                 } catch (err) {
//                     resultExpr = "";
//                 }
//             }

//             if (
//                 !resultExpr ||
//                 resultExpr === "" ||
//                 resultExpr.includes("integrate(")
//             ) {
//                 setError(
//                     "Could not compute result — expression may be too complex or unsupported."
//                 );
//                 return;
//             }

//             try {
//                 resultExpr = nerdamer(resultExpr).toString();
//             } catch {}

//             setResult(resultExpr);
//         } catch (err: any) {
//             setError(
//                 "Calculation error: Invalid expression or unsupported operation."
//             );
//         }
//     };

//     return (
//         <div
//             ref={containerRef}
//             className="fixed z-50 cursor-move"
//             style={{ left: `${position.x}px`, top: `${position.y}px` }}
//             onMouseDown={handleMouseDown}
//         >
//             {onClose && (
//                 <button
//                     onClick={onClose}
//                     className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
//                 >
//                     ✕
//                 </button>
//             )}
//             <button className="bg-red absolute right-5 top-5 rounded-2xl p-3 text-white">
//                 x
//             </button>
//             <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
//                 <h3 className="mb-5 text-xl font-semibold text-gray-800">
//                     Derivative & Integral Calculator
//                 </h3>

//                 <div className="mb-4">
//                     <label className="mb-2 block text-sm font-medium text-gray-700">
//                         Operation
//                     </label>
//                     <div className="flex space-x-6">
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 value="derivative"
//                                 checked={operation === "derivative"}
//                                 onChange={() => setOperation("derivative")}
//                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">
//                                 Derivative
//                             </span>
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 value="integral"
//                                 checked={operation === "integral"}
//                                 onChange={() => setOperation("integral")}
//                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">
//                                 Integral
//                             </span>
//                         </label>
//                     </div>
//                 </div>

//                 <div className="mb-4">
//                     <label
//                         htmlFor="expression"
//                         className="mb-1 block text-sm font-medium text-gray-700"
//                     >
//                         Function f({variable})
//                     </label>
//                     <input
//                         id="expression"
//                         type="text"
//                         value={expression}
//                         onChange={(e) => setExpression(e.target.value)}
//                         placeholder="e.g., x^2, sin(x), exp(x)"
//                         className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div className="mb-5">
//                     <label
//                         htmlFor="variable"
//                         className="mb-1 block text-sm font-medium text-gray-700"
//                     >
//                         Variable
//                     </label>
//                     <input
//                         id="variable"
//                         type="text"
//                         value={variable}
//                         onChange={(e) => setVariable(e.target.value)}
//                         placeholder="x"
//                         className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 <button
//                     onClick={handleCalculate}
//                     className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     Calculate{" "}
//                     {operation === "derivative" ? "Derivative" : "Integral"}
//                 </button>

//                 {error && (
//                     <div className="mt-4 rounded border-l-4 border-red-400 bg-red-50 p-3 text-sm text-red-700">
//                         <p>{error}</p>
//                     </div>
//                 )}

//                 {result && !error && (
//                     <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
//                         <p className="text-sm text-green-800">
//                             <strong>
//                                 {operation === "derivative"
//                                     ? `f'(${variable}) = `
//                                     : `∫f(${variable})d${variable} = `}
//                             </strong>
//                             <code className="rounded bg-green-100 px-1.5 py-0.5 font-mono text-green-900">
//                                 {result}
//                             </code>
//                         </p>
//                     </div>
//                 )}

//                 <div className="mt-5 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
//                     <p className="mb-1 font-medium">Examples:</p>
//                     <p>
//                         <code>sin(x)</code> → derivative: <code>cos(x)</code>,
//                         integral: <code>-cos(x)</code>
//                     </p>
//                     <p>
//                         <code>x^2</code> → integral: <code>x^3/3</code>
//                     </p>
//                     <p>
//                         <code>exp(x)</code> → both derivative and integral:{" "}
//                         <code>exp(x)</code>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DerivativeIntegralCalculator;
