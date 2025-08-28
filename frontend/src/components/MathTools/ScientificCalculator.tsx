// FileName: ScientificCalculator.tsx

import React, { useState, useRef, useEffect } from "react";
import * as math from "mathjs";
import { Button } from "@components/Button/Button";
import { Typography } from "@components/Typography/Typography";

function ScientificCalculator({ onClose }: { onClose?: () => void }) {
    const [expression, setExpression] = useState("");
    const [screenVal, setScreenVal] = useState("");
    const [mode, setMode] = useState<"rad" | "deg">("rad");
    const [isMathPanelOpen, setIsMathPanelOpen] = useState(false);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({
        x: window.innerWidth - 400,
        y: 100,
    });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const mathPanelRef = useRef<HTMLDivElement>(null);
    const [panelWidth, setPanelWidth] = useState(180); // Default width

    // Measure panel width when mounted
    useEffect(() => {
        if (mathPanelRef.current) {
            setPanelWidth(mathPanelRef.current.offsetWidth);
        }
    }, []);

    // Auto-close parentheses and functions
    const handleFunctionClick = (func: string) => {
        if (
            ["sqrt(", "cbrt(", "log(", "exp(", "abs(", "round("].includes(func)
        ) {
            setExpression((prev) => prev + func + ")");
        } else if (
            ["sin(", "cos(", "tan(", "asin(", "acos(", "atan("].includes(func)
        ) {
            setExpression((prev) => prev + func + ")");
        } else if (func === "pi") {
            setExpression((prev) => prev + "pi");
        } else if (func === "e") {
            setExpression((prev) => prev + "e");
        }
    };

    const handleNumberClick = (input: string) => {
        if (input === "±") {
            setExpression((prev) => {
                if (prev.endsWith("-")) return prev.slice(0, -1);
                return prev + "-(";
            });
        } else {
            setExpression((prev) => prev + input);
        }
    };

    const handleOperatorClick = (op: string) => {
        setExpression((prev) => prev + op);
    };

    const handleParentheses = (type: "open" | "close") => {
        if (type === "open") {
            setExpression((prev) => prev + "(");
        } else {
            const openCount = (expression.match(/\(/g) || []).length;
            const closeCount = (expression.match(/\)/g) || []).length;
            if (openCount > closeCount) {
                setExpression((prev) => prev + ")");
            }
        }
    };

    const calculate = () => {
        try {
            const allVariables = {
                pi: Math.PI,
                e: Math.E,
                fact: math.factorial,
                sin:
                    mode === "rad"
                        ? Math.sin
                        : (x: number) => math.sin(math.unit(x, "deg")),
                cos:
                    mode === "rad"
                        ? Math.cos
                        : (x: number) => math.cos(math.unit(x, "deg")),
                tan:
                    mode === "rad"
                        ? Math.tan
                        : (x: number) => math.tan(math.unit(x, "deg")),
                asin:
                    mode === "rad"
                        ? Math.asin
                        : (x: number) => math.asin(x) * (180 / Math.PI),
                acos:
                    mode === "rad"
                        ? Math.acos
                        : (x: number) => math.acos(x) * (180 / Math.PI),
                atan:
                    mode === "rad"
                        ? Math.atan
                        : (x: number) => math.atan(x) * (180 / Math.PI),
            };

            const result = math.evaluate(expression, allVariables);
            setScreenVal(
                typeof result === "number" && !isNaN(result)
                    ? result.toFixed(4)
                    : "Error: Invalid expression"
            );
        } catch {
            setScreenVal("Error: Invalid expression");
        }
    };

    const clearScreen = () => {
        setExpression("");
        setScreenVal("");
    };

    const backspace = () => {
        setExpression((prev) => prev.slice(0, -1));
    };

    const toggleMathPanel = () => {
        setIsMathPanelOpen((prev) => !prev);
    };

    const toggleMode = () => {
        setMode((prev) => (prev === "rad" ? "deg" : "rad"));
    };

    // Enhanced drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (["BUTTON", "INPUT", "SELECT", "CANVAS"].includes(target.tagName))
            return;

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsDragging(true);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            const boundedX = Math.max(
                10,
                Math.min(window.innerWidth - 300, newX)
            );
            const boundedY = Math.max(
                10,
                Math.min(window.innerHeight - 300, newY)
            );

            setPosition({ x: boundedX, y: boundedY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    return (
        <div
            ref={containerRef}
            className="w-90 z-49 fixed cursor-move rounded-xl shadow-lg"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: "var(--color-background-light)",
                border: "1px solid var(--color-background-dark)",
            }}
            onMouseDown={handleMouseDown}
        >
            {onClose && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded"
                    style={{
                        backgroundColor: "var(--color-secondary-normal)",
                        color: "white",
                    }}
                >
                    ✕
                </button>
            )}
            {/* Main calculator with sliding math panel */}
            <div className="flex" style={{ width: "400px" }}>
                {/* Main calculator */}
                <div className="bg-background-normal h-150 absolute z-50 flex-1 rounded-xl p-10">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <Typography
                            variant="h2"
                            className="font-bold"
                            style={{ color: "var(--color-foreground-darker)" }}
                        >
                            Mathware Calculator
                        </Typography>
                        <Button
                            thickness="thin"
                            onClick={toggleMathPanel}
                            className="flex items-center gap-1 px-2 py-1 text-xs"
                        >
                            {isMathPanelOpen ? "◀" : "▶"}
                        </Button>
                    </div>

                    {/* Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={expression}
                            readOnly
                            className="mb-2 w-full rounded border px-3 py-2 font-mono text-sm"
                            style={{
                                backgroundColor:
                                    "var(--color-background-normal)",
                                borderColor: "var(--color-background-dark)",
                                color: "var(--color-foreground-darker)",
                            }}
                        />
                        <div
                            className="w-full text-right text-sm"
                            style={{ color: "var(--color-foreground-normal)" }}
                        >
                            <span className="font-semibold">Result:</span>{" "}
                            {screenVal}
                        </div>
                    </div>

                    {/* Main keypad */}
                    <div className="grid grid-cols-4 gap-2">
                        {/* Row 1 */}
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("7")}
                            className="text-lg"
                        >
                            7
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("8")}
                            className="text-lg"
                        >
                            8
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("9")}
                            className="text-lg"
                        >
                            9
                        </Button>
                        <Button
                            variant="secondary"
                            thickness="normal"
                            onClick={clearScreen}
                            className="text-lg font-bold"
                        >
                            C
                        </Button>

                        {/* Row 2 */}
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("4")}
                            className="text-lg"
                        >
                            4
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("5")}
                            className="text-lg"
                        >
                            5
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("6")}
                            className="text-lg"
                        >
                            6
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleOperatorClick("/")}
                            className="text-lg font-bold"
                        >
                            /
                        </Button>

                        {/* Row 3 */}
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("1")}
                            className="text-lg"
                        >
                            1
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("2")}
                            className="text-lg"
                        >
                            2
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("3")}
                            className="text-lg"
                        >
                            3
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleOperatorClick("*")}
                            className="text-lg font-bold"
                        >
                            *
                        </Button>

                        {/* Row 4 */}
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick("0")}
                            className="text-lg"
                        >
                            0
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleNumberClick(".")}
                            className="text-lg"
                        >
                            .
                        </Button>
                        <Button
                            variant="information"
                            thickness="normal"
                            onClick={backspace}
                            className="text-lg font-bold"
                        >
                            ⌫
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleOperatorClick("-")}
                            className="text-lg font-bold"
                        >
                            -
                        </Button>

                        {/* Row 5 */}
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleParentheses("open")}
                            className="text-lg font-bold"
                        >
                            (
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleParentheses("close")}
                            className="text-lg font-bold"
                        >
                            )
                        </Button>
                        <Button
                            variant="primary"
                            thickness="normal"
                            onClick={calculate}
                            className="text-lg font-bold"
                        >
                            =
                        </Button>
                        <Button
                            variant="default"
                            thickness="normal"
                            onClick={() => handleOperatorClick("+")}
                            className="text-lg font-bold"
                        >
                            +
                        </Button>
                    </div>
                </div>

                {/* Sliding Math Panel */}
                <div
                    ref={mathPanelRef}
                    // style={{
                    //     width: "180px",
                    //     transform: `translateX(${isMathPanelOpen ? -panelWidth : panelWidth + 20}px)`,
                    //     transition:
                    //         "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    // }}
                    className="z-48 absolute border-l p-4"
                    style={{
                        ...{
                            width: "180px",
                            transform: `translateX(${isMathPanelOpen ? 0 : panelWidth + 40}px)`,
                            transition:
                                "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                        },
                        borderLeftColor: "var(--color-background-dark)",
                        backgroundColor: "var(--color-background-normal)",
                    }}
                >
                    <Typography
                        variant="h3"
                        className="mb-3 font-semibold"
                        style={{ color: "var(--color-foreground-darker)" }}
                    >
                        Functions
                    </Typography>

                    <div className="space-y-2">
                        {[
                            "sin(",
                            "cos(",
                            "tan(",
                            "sqrt(",
                            "cbrt(",
                            "log(",
                            "exp(",
                            "abs(",
                            "round(",
                        ].map((fn) => (
                            <Button
                                key={fn}
                                variant="default"
                                thickness="normal"
                                onClick={() => handleFunctionClick(fn)}
                                className="w-full justify-start text-base font-semibold"
                                style={{
                                    backgroundColor:
                                        "var(--color-tertiary-light)",
                                    color: "var(--color-tertiary-darker)",
                                }}
                            >
                                {fn.slice(0, -1)}
                            </Button>
                        ))}

                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <Button
                                variant="default"
                                thickness="normal"
                                onClick={() => handleFunctionClick("pi")}
                                className="text-base font-bold"
                                style={{
                                    backgroundColor:
                                        "var(--color-primary-light)",
                                    color: "var(--color-primary-darker)",
                                }}
                            >
                                π
                            </Button>
                            <Button
                                variant="default"
                                thickness="normal"
                                onClick={() => handleFunctionClick("e")}
                                className="text-base font-bold"
                                style={{
                                    backgroundColor:
                                        "var(--color-primary-light)",
                                    color: "var(--color-primary-darker)",
                                }}
                            >
                                e
                            </Button>
                            <Button
                                variant="default"
                                thickness="normal"
                                onClick={toggleMode}
                                className="col-span-2 text-sm font-bold"
                                style={{
                                    backgroundColor:
                                        "var(--color-secondary-light)",
                                    color: "var(--color-secondary-darker)",
                                }}
                            >
                                {mode.toUpperCase()}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScientificCalculator;
