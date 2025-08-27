import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Typography } from "../Typography/Typography";
import { Select } from "../Select/Select";

type Matrix = number[][];

const MatrixCalculator = ({ onClose }: { onClose?: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
        x: window.innerWidth - 500,
        y: 100,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const [rowsA, setRowsA] = useState<number>(2);
    const [colsA, setColsA] = useState<number>(2);
    const [rowsB, setRowsB] = useState<number>(2);
    const [colsB, setColsB] = useState<number>(2);

    const [matrixA, setMatrixA] = useState<Matrix>(createEmptyMatrix(2, 2));
    const [matrixB, setMatrixB] = useState<Matrix>(createEmptyMatrix(2, 2));
    const [operation, setOperation] = useState<"add" | "subtract" | "multiply">(
        "add"
    );
    const [result, setResult] = useState<Matrix | null>(null);
    const [error, setError] = useState<string>("");

    function createEmptyMatrix(rows: number, cols: number): Matrix {
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
    }

    const handleAChange = (i: number, j: number, value: string) => {
        const val = parseFloat(value) || 0;
        setMatrixA((prev) =>
            prev.map((row, idx) =>
                idx === i
                    ? row.map((cell, jdx) => (jdx === j ? val : cell))
                    : row
            )
        );
    };

    const handleBChange = (i: number, j: number, value: string) => {
        const val = parseFloat(value) || 0;
        setMatrixB((prev) =>
            prev.map((row, idx) =>
                idx === i
                    ? row.map((cell, jdx) => (jdx === j ? val : cell))
                    : row
            )
        );
    };

    useEffect(() => {
        setMatrixA(createEmptyMatrix(rowsA, colsA));
        setResult(null);
        setError("");
    }, [rowsA, colsA]);

    useEffect(() => {
        setMatrixB(createEmptyMatrix(rowsB, colsB));
        setResult(null);
        setError("");
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
        setError("");
        setResult(null);
        if (operation === "add" || operation === "subtract") {
            if (rowsA !== rowsB || colsA !== colsB) {
                setError(
                    `For ${operation}, matrices must have the same dimensions.`
                );
                return;
            }
        }
        if (operation === "multiply" && colsA !== rowsB) {
            setError(
                "For multiplication, columns of Matrix A must equal rows of Matrix B."
            );
            return;
        }
        try {
            let res: Matrix;
            if (operation === "add") res = addMatrices(matrixA, matrixB);
            else if (operation === "subtract")
                res = subtractMatrices(matrixA, matrixB);
            else res = multiplyMatrices(matrixA, matrixB);
            setResult(res);
        } catch {
            setError("An error occurred during calculation.");
        }
    };

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
        const target = e.target as HTMLElement;
        if (["INPUT", "SELECT", "BUTTON"].includes(target.tagName)) return;
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsDragging(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed z-50 h-4/5 cursor-move overflow-auto"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: "var(--color-background-light)",
                color: "var(--color-foreground-normal)",
            }}
            onMouseDown={handleMouseDown}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded"
                    style={{
                        backgroundColor: "var(--color-secondary-normal)",
                        color: "white",
                    }}
                >
                    ✕
                </button>
            )}
            <div
                className="mx-auto max-w-md rounded-lg p-6"
                style={{
                    backgroundColor: "var(--color-background-light)",
                    border: "1px solid var(--color-background-dark)",
                }}
            >
                <Typography
                    variant="h4"
                    className="mb-6"
                    style={{ color: "var(--color-foreground-darker)" }}
                >
                    Matrix Calculator
                </Typography>

                <div className="mb-6">
                    <Typography
                        variant="label"
                        className="mb-2 block text-sm"
                        style={{ color: "var(--color-foreground-dark)" }}
                    >
                        Operation
                    </Typography>
                    <Select
                        name="matrix-operation"
                        value={operation}
                        label="Operation"
                        options={["add", "subtract", "multiply"] as const}
                        MapOptions={(value) => {
                            const labels = {
                                add: "Addition (A + B)",
                                subtract: "Subtraction (A - B)",
                                multiply: "Multiplication (A × B)",
                            };
                            return labels[value];
                        }}
                        onChange={(e) => setOperation(e.target.value as any)}
                        className="w-full"
                        variant="default"
                        doesTextGrow={true}
                        doesHaveMinimumWidth={false}
                        style={{
                            backgroundColor: "var(--color-background-normal)",
                            borderColor: "var(--color-background-dark)",
                        }}
                    />
                </div>

                <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <Typography
                            variant="h5"
                            className="mb-3"
                            style={{ color: "var(--color-foreground-dark)" }}
                        >
                            Matrix A
                        </Typography>
                        <div className="mb-3 flex gap-4">
                            <div>
                                <Typography
                                    variant="label"
                                    className="block text-xs"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Rows
                                </Typography>
                                <Input
                                    name="matrix-a-rows"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={rowsA}
                                    onChange={(e) => {
                                        const val = Math.max(
                                            1,
                                            Math.min(
                                                10,
                                                parseInt(e.target.value) || 1
                                            )
                                        );
                                        setRowsA(val);
                                    }}
                                    className="w-20"
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="label"
                                    className="block text-xs"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Columns
                                </Typography>
                                <Input
                                    name="matrix-a-cols"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={colsA}
                                    onChange={(e) => {
                                        const val = Math.max(
                                            1,
                                            Math.min(
                                                10,
                                                parseInt(e.target.value) || 1
                                            )
                                        );
                                        setColsA(val);
                                    }}
                                    className="w-20"
                                />
                            </div>
                        </div>

                        <div
                            className="max-h-48 overflow-y-auto rounded border p-2"
                            style={{
                                borderColor: "var(--color-background-dark)",
                                backgroundColor:
                                    "var(--color-background-normal)",
                            }}
                        >
                            {matrixA.map((row, i) => (
                                <div key={i} className="mb-1 flex gap-1">
                                    {row.map((cell, j) => (
                                        <Input
                                            key={`${i}-${j}`}
                                            name={`matrix-a-${i}-${j}`}
                                            type="number"
                                            step="any"
                                            value={cell}
                                            onChange={(e) =>
                                                handleAChange(
                                                    i,
                                                    j,
                                                    e.target.value
                                                )
                                            }
                                            onFocus={(e) => e.target.select()}
                                            className="h-10 w-14 text-center font-mono text-sm"
                                            style={{
                                                backgroundColor:
                                                    "var(--color-background-light)",
                                                borderColor:
                                                    "var(--color-background-dark)",
                                                color: "var(--color-foreground-darker)",
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Typography
                            variant="h5"
                            className="mb-3"
                            style={{ color: "var(--color-foreground-dark)" }}
                        >
                            Matrix B
                        </Typography>
                        <div className="mb-3 flex gap-4">
                            <div>
                                <Typography
                                    variant="label"
                                    className="block text-xs"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Rows
                                </Typography>
                                <Input
                                    name="matrix-b-rows"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={rowsB}
                                    onChange={(e) => {
                                        const val = Math.max(
                                            1,
                                            Math.min(
                                                10,
                                                parseInt(e.target.value) || 1
                                            )
                                        );
                                        setRowsB(val);
                                    }}
                                    className="w-20"
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="label"
                                    className="block text-xs"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Columns
                                </Typography>
                                <Input
                                    name="matrix-b-cols"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={colsB}
                                    onChange={(e) => {
                                        const val = Math.max(
                                            1,
                                            Math.min(
                                                10,
                                                parseInt(e.target.value) || 1
                                            )
                                        );
                                        setColsB(val);
                                    }}
                                    className="w-20"
                                />
                            </div>
                        </div>

                        <div
                            className="max-h-48 overflow-y-auto rounded border p-2"
                            style={{
                                borderColor: "var(--color-background-dark)",
                                backgroundColor:
                                    "var(--color-background-normal)",
                            }}
                        >
                            {matrixB.map((row, i) => (
                                <div key={i} className="mb-1 flex gap-1">
                                    {row.map((cell, j) => (
                                        <Input
                                            key={`${i}-${j}`}
                                            name={`matrix-b-${i}-${j}`}
                                            type="number"
                                            step="any"
                                            value={cell}
                                            onChange={(e) =>
                                                handleBChange(
                                                    i,
                                                    j,
                                                    e.target.value
                                                )
                                            }
                                            onFocus={(e) => e.target.select()}
                                            className="h-10 w-14 text-center font-mono text-sm"
                                            style={{
                                                backgroundColor:
                                                    "var(--color-background-light)",
                                                borderColor:
                                                    "var(--color-background-dark)",
                                                color: "var(--color-foreground-darker)",
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex justify-center">
                    <Button
                        onClick={calculate}
                        variant="default"
                        thickness="normal"
                        className="px-6 py-2"
                        style={{
                            backgroundColor: "var(--color-primary-normal)",
                            color: "white",
                        }}
                    >
                        Calculate
                    </Button>
                </div>

                {error && (
                    <Typography
                        variant="p"
                        className="mb-4 text-center"
                        style={{ color: "var(--color-secondary-dark)" }}
                    >
                        {error}
                    </Typography>
                )}

                {result && (
                    <div className="mt-6">
                        <Typography
                            variant="h5"
                            className="mb-3"
                            style={{ color: "var(--color-foreground-dark)" }}
                        >
                            Result
                        </Typography>
                        <div className="flex justify-center">
                            <div
                                className="overflow-auto rounded border p-4"
                                style={{
                                    borderColor: "var(--color-background-dark)",
                                    backgroundColor:
                                        "var(--color-background-normal)",
                                }}
                            >
                                {result.map((row, i) => (
                                    <div key={i} className="flex gap-1">
                                        {row.map((val, j) => (
                                            <span
                                                key={`${i}-${j}`}
                                                className="flex h-10 w-14 items-center justify-center font-mono text-sm"
                                                style={{
                                                    color: "var(--color-foreground-darker)",
                                                }}
                                            >
                                                {Number.isInteger(val)
                                                    ? val
                                                    : val.toFixed(2)}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatrixCalculator;

// import { useState, useEffect, useRef } from "react";

// type Matrix = number[][];

// interface MatrixCalculatorProps {
//     onClose?: () => void;
// }

// export default function MatrixCalculator({ onClose }: MatrixCalculatorProps) {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [position, setPosition] = useState({
//         x: window.innerWidth - 500,
//         y: 100,
//     });
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//     const [rowsA, setRowsA] = useState<number>(2);
//     const [colsA, setColsA] = useState<number>(2);
//     const [rowsB, setRowsB] = useState<number>(2);
//     const [colsB, setColsB] = useState<number>(2);

//     const [matrixA, setMatrixA] = useState<Matrix>(createEmptyMatrix(2, 2));
//     const [matrixB, setMatrixB] = useState<Matrix>(createEmptyMatrix(2, 2));
//     const [operation, setOperation] = useState<"add" | "subtract" | "multiply">(
//         "add"
//     );
//     const [result, setResult] = useState<Matrix | null>(null);
//     const [error, setError] = useState<string>("");

//     function createEmptyMatrix(rows: number, cols: number): Matrix {
//         return Array.from({ length: rows }, () =>
//             Array.from({ length: cols }, () => 0)
//         );
//     }

//     const handleAChange = (i: number, j: number, value: string) => {
//         const val = parseFloat(value) || 0;
//         setMatrixA((prev) =>
//             prev.map((row, idx) =>
//                 idx === i
//                     ? row.map((cell, jdx) => (jdx === j ? val : cell))
//                     : row
//             )
//         );
//     };

//     const handleBChange = (i: number, j: number, value: string) => {
//         const val = parseFloat(value) || 0;
//         setMatrixB((prev) =>
//             prev.map((row, idx) =>
//                 idx === i
//                     ? row.map((cell, jdx) => (jdx === j ? val : cell))
//                     : row
//             )
//         );
//     };

//     useEffect(() => {
//         setMatrixA(createEmptyMatrix(rowsA, colsA));
//         setResult(null);
//         setError("");
//     }, [rowsA, colsA]);

//     useEffect(() => {
//         setMatrixB(createEmptyMatrix(rowsB, colsB));
//         setResult(null);
//         setError("");
//     }, [rowsB, colsB]);

//     const addMatrices = (a: Matrix, b: Matrix): Matrix => {
//         return a.map((row, i) => row.map((val, j) => val + b[i][j]));
//     };

//     const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
//         return a.map((row, i) => row.map((val, j) => val - b[i][j]));
//     };

//     const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
//         const result: Matrix = Array.from({ length: a.length }, () =>
//             Array.from({ length: b[0].length }, () => 0)
//         );

//         for (let i = 0; i < a.length; i++) {
//             for (let j = 0; j < b[0].length; j++) {
//                 let sum = 0;
//                 for (let k = 0; k < b.length; k++) {
//                     sum += a[i][k] * b[k][j];
//                 }
//                 result[i][j] = sum;
//             }
//         }
//         return result;
//     };

//     const calculate = () => {
//         setError("");
//         setResult(null);

//         if (operation === "add" || operation === "subtract") {
//             if (rowsA !== rowsB || colsA !== colsB) {
//                 setError(
//                     `For ${operation}, matrices must have the same dimensions.`
//                 );
//                 return;
//             }
//         }

//         if (operation === "multiply" && colsA !== rowsB) {
//             setError(
//                 "For multiplication, columns of Matrix A must equal rows of Matrix B."
//             );
//             return;
//         }

//         try {
//             let res: Matrix;
//             if (operation === "add") {
//                 res = addMatrices(matrixA, matrixB);
//             } else if (operation === "subtract") {
//                 res = subtractMatrices(matrixA, matrixB);
//             } else {
//                 res = multiplyMatrices(matrixA, matrixB);
//             }
//             setResult(res);
//         } catch (err) {
//             setError("An error occurred during calculation.");
//         }
//     };

//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             if (!isDragging) return;
//             setPosition({
//                 x: e.clientX - dragOffset.x,
//                 y: e.clientY - dragOffset.y,
//             });
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
//         const target = e.target as HTMLElement;
//         if (
//             target.tagName === "INPUT" ||
//             target.tagName === "SELECT" ||
//             target.tagName === "BUTTON"
//         ) {
//             return;
//         }

//         if (containerRef.current) {
//             const rect = containerRef.current.getBoundingClientRect();
//             setDragOffset({
//                 x: e.clientX - rect.left,
//                 y: e.clientY - rect.top,
//             });
//             setIsDragging(true);
//         }
//     };

//     const containerStyle =
//         "max-h-48 overflow-y-auto border border-gray-300 rounded p-2 bg-gray-50";

//     return (
//         <div
//             ref={containerRef}
//             className="fixed z-50 h-4/5 cursor-move overflow-auto"
//             style={{ left: `${position.x}px`, top: `${position.y}px` }}
//             onMouseDown={handleMouseDown}
//         >
//             <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
//                 <h1 className="mb-6 text-xl font-bold text-gray-800">
//                     Matrix Calculator
//                 </h1>

//                 <div className="mb-6">
//                     <label className="mb-2 block text-sm font-medium text-gray-700">
//                         Operation
//                     </label>
//                     <select
//                         value={operation}
//                         onChange={(e) => setOperation(e.target.value as any)}
//                         className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     >
//                         <option value="add">Addition (A + B)</option>
//                         <option value="subtract">Subtraction (A - B)</option>
//                         <option value="multiply">Multiplication (A × B)</option>
//                     </select>
//                 </div>

//                 <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2">
//                     <div>
//                         <h2 className="mb-3 text-lg font-semibold text-gray-700">
//                             Matrix A
//                         </h2>
//                         <div className="mb-3 flex gap-4">
//                             <div>
//                                 <label className="block text-xs text-gray-600">
//                                     Rows
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     max="10"
//                                     value={rowsA}
//                                     onChange={(e) => {
//                                         const val = Math.max(
//                                             1,
//                                             Math.min(
//                                                 10,
//                                                 parseInt(e.target.value) || 1
//                                             )
//                                         );
//                                         setRowsA(val);
//                                     }}
//                                     className="w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
//                                     style={{
//                                         color: "black",
//                                         WebkitTextFillColor: "black",
//                                     }}
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-xs text-gray-600">
//                                     Columns
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     max="10"
//                                     value={colsA}
//                                     onChange={(e) => {
//                                         const val = Math.max(
//                                             1,
//                                             Math.min(
//                                                 10,
//                                                 parseInt(e.target.value) || 1
//                                             )
//                                         );
//                                         setColsA(val);
//                                     }}
//                                     className="w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
//                                     style={{
//                                         color: "black",
//                                         WebkitTextFillColor: "black",
//                                     }}
//                                     autoComplete="off"
//                                 />
//                             </div>
//                         </div>

//                         <div className={containerStyle}>
//                             {matrixA.map((row, i) => (
//                                 <div key={i} className="mb-1 flex gap-1">
//                                     {row.map((cell, j) => (
//                                         <input
//                                             key={`${i}-${j}`}
//                                             type="number"
//                                             step="any"
//                                             value={cell}
//                                             onChange={(e) =>
//                                                 handleAChange(
//                                                     i,
//                                                     j,
//                                                     e.target.value
//                                                 )
//                                             }
//                                             onFocus={(e) => e.target.select()}
//                                             className="h-10 w-14 rounded border border-gray-400 bg-white text-center font-mono text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500"
//                                             style={{
//                                                 minWidth: "3.5rem",
//                                                 color: "black",
//                                                 WebkitTextFillColor: "black",
//                                             }}
//                                             autoComplete="off"
//                                         />
//                                     ))}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div>
//                         <h2 className="mb-3 text-lg font-semibold text-gray-700">
//                             Matrix B
//                         </h2>
//                         <div className="mb-3 flex gap-4">
//                             <div>
//                                 <label className="block text-xs text-gray-600">
//                                     Rows
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     max="10"
//                                     value={rowsB}
//                                     onChange={(e) => {
//                                         const val = Math.max(
//                                             1,
//                                             Math.min(
//                                                 10,
//                                                 parseInt(e.target.value) || 1
//                                             )
//                                         );
//                                         setRowsB(val);
//                                     }}
//                                     className="w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
//                                     style={{
//                                         color: "black",
//                                         WebkitTextFillColor: "black",
//                                     }}
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-xs text-gray-600">
//                                     Columns
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     max="10"
//                                     value={colsB}
//                                     onChange={(e) => {
//                                         const val = Math.max(
//                                             1,
//                                             Math.min(
//                                                 10,
//                                                 parseInt(e.target.value) || 1
//                                             )
//                                         );
//                                         setColsB(val);
//                                     }}
//                                     className="w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
//                                     style={{
//                                         color: "black",
//                                         WebkitTextFillColor: "black",
//                                     }}
//                                     autoComplete="off"
//                                 />
//                             </div>
//                         </div>

//                         <div className={containerStyle}>
//                             {matrixB.map((row, i) => (
//                                 <div key={i} className="mb-1 flex gap-1">
//                                     {row.map((cell, j) => (
//                                         <input
//                                             key={`${i}-${j}`}
//                                             type="number"
//                                             step="any"
//                                             value={cell}
//                                             onChange={(e) =>
//                                                 handleBChange(
//                                                     i,
//                                                     j,
//                                                     e.target.value
//                                                 )
//                                             }
//                                             onFocus={(e) => e.target.select()}
//                                             className="h-10 w-14 rounded border border-gray-400 bg-white text-center font-mono text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500"
//                                             style={{
//                                                 minWidth: "3.5rem",
//                                                 color: "black",
//                                                 WebkitTextFillColor: "black",
//                                             }}
//                                             autoComplete="off"
//                                         />
//                                     ))}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mb-6 flex justify-center">
//                     <button
//                         onClick={calculate}
//                         className="rounded bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Calculate
//                     </button>
//                 </div>

//                 {error && (
//                     <p className="mb-4 text-center font-medium text-red-500">
//                         {error}
//                     </p>
//                 )}

//                 {result && (
//                     <div className="mt-6">
//                         <h2 className="mb-3 text-lg font-semibold text-gray-700">
//                             Result
//                         </h2>
//                         <div className="flex justify-center">
//                             <div className="max-w-xs overflow-auto rounded border border-gray-300 bg-gray-50 p-4">
//                                 {result.map((row, i) => (
//                                     <div key={i} className="flex gap-1">
//                                         {row.map((val, j) => (
//                                             <span
//                                                 key={`${i}-${j}`}
//                                                 className="flex h-10 w-14 items-center justify-center font-mono text-sm text-gray-800"
//                                             >
//                                                 {Number.isInteger(val)
//                                                     ? val
//                                                     : val.toFixed(2)}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
