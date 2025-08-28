import { useState, useEffect, useRef } from "react";
import { Typography } from "../Typography/Typography";
import { Input } from "../Input/Input";

const ProbabilityRulesExplorer = ({ onClose }: { onClose?: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
        x: window.innerWidth - 800,
        y: 100,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const [P_A, setP_A] = useState<string>("0.3");
    const [P_B, setP_B] = useState<string>("0.5");
    const [P_A_and_B, setP_A_and_B] = useState<string>("0.1");

    const [P_D, setP_D] = useState<string>("0.01");
    const [P_T_given_D, setP_T_given_D] = useState<string>("0.99");
    const [P_T_given_notD, setP_T_given_notD] = useState<string>("0.02");

    const num = (s: string) => Math.max(0, Math.min(1, parseFloat(s) || 0));

    const pA = num(P_A);
    const pB = num(P_B);
    const pAandB = Math.min(pA, pB, num(P_A_and_B));
    const pAorB = pA + pB - pAandB;
    const pA_given_B = pB > 0 ? pAandB / pB : 0;
    const pB_given_A = pA > 0 ? pAandB / pA : 0;
    const independent = Math.abs(pAandB - pA * pB) < 0.01;

    const pD = num(P_D);
    const pTgD = num(P_T_given_D);
    const pTgND = num(P_T_given_notD);
    const pT = pTgD * pD + pTgND * (1 - pD);
    const pDgT = pD > 0 && pT > 0 ? (pTgD * pD) / pT : 0;

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
        if (
            ["INPUT", "LABEL"].includes(target.tagName) ||
            (target.parentElement && target.parentElement.tagName === "LABEL")
        ) {
            return;
        }
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
            className="fixed z-50 h-4/5 cursor-move"
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
                className="mx-auto max-w-4xl rounded-xl p-6"
                style={{
                    width: "600px",
                    backgroundColor: "var(--color-background-light)",
                    border: "1px solid var(--color-background-dark)",
                }}
            >
                <Typography
                    variant="h2"
                    className="mb-2"
                    style={{ color: "var(--color-foreground-darker)" }}
                >
                    Probability Rules Explorer
                </Typography>
                <Typography
                    variant="p"
                    className="mb-6 text-sm"
                    style={{ color: "var(--color-foreground-normal)" }}
                >
                    Explore real probability theorems with interactive examples.
                    All formulas are mathematically correct.
                </Typography>

                <div
                    className="max-h-[60vh] overflow-y-auto pr-2"
                    style={{ maxHeight: "60vh" }}
                >
                    <section className="mb-6">
                        <Typography
                            variant="h3"
                            className="mb-4"
                            style={{ color: "var(--color-foreground-dark)" }}
                        >
                            1. Basic Probability Rules
                        </Typography>

                        <div className="mb-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <Typography
                                    variant="label"
                                    className="mb-1 block text-sm"
                                    style={{
                                        color: "var(--color-foreground-dark)",
                                    }}
                                >
                                    P(A)
                                </Typography>
                                <Input
                                    name="prob-A"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_A}
                                    onChange={(e) => setP_A(e.target.value)}
                                    placeholder="e.g. 0.3"
                                    className="w-full"
                                    style={{
                                        backgroundColor:
                                            "var(--color-background-normal)",
                                        borderColor:
                                            "var(--color-background-dark)",
                                        color: "var(--color-foreground-darker)",
                                    }}
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="label"
                                    className="mb-1 block text-sm"
                                    style={{
                                        color: "var(--color-foreground-dark)",
                                    }}
                                >
                                    P(B)
                                </Typography>
                                <Input
                                    name="prob-B"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_B}
                                    onChange={(e) => setP_B(e.target.value)}
                                    placeholder="e.g. 0.5"
                                    className="w-full"
                                    style={{
                                        backgroundColor:
                                            "var(--color-background-normal)",
                                        borderColor:
                                            "var(--color-background-dark)",
                                        color: "var(--color-foreground-darker)",
                                    }}
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="label"
                                    className="mb-1 block text-sm"
                                    style={{
                                        color: "var(--color-foreground-dark)",
                                    }}
                                >
                                    P(A ∩ B)
                                </Typography>
                                <Input
                                    name="prob-A-and-B"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_A_and_B}
                                    onChange={(e) =>
                                        setP_A_and_B(e.target.value)
                                    }
                                    placeholder="e.g. 0.1"
                                    className="w-full"
                                    style={{
                                        backgroundColor:
                                            "var(--color-background-normal)",
                                        borderColor:
                                            "var(--color-background-dark)",
                                        color: "var(--color-foreground-darker)",
                                    }}
                                />
                            </div>
                        </div>

                        <div
                            className="space-y-2 rounded-lg p-4"
                            style={{
                                backgroundColor:
                                    "var(--color-background-normal)",
                                border: "1px solid var(--color-background-dark)",
                            }}
                        >
                            <div>
                                <Typography
                                    variant="strong"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    Addition Rule:
                                </Typography>{" "}
                                <Typography
                                    variant="code"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                                </Typography>
                            </div>
                            <div
                                className="ml-4"
                                style={{
                                    color: "var(--color-foreground-darker)",
                                }}
                            >
                                = {pA.toFixed(3)} + {pB.toFixed(3)} -{" "}
                                {pAandB.toFixed(3)} ={" "}
                                <Typography variant="strong">
                                    {pAorB.toFixed(3)}
                                </Typography>
                            </div>

                            <div className="mt-2">
                                <Typography
                                    variant="strong"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    Conditional Probability:
                                </Typography>
                            </div>
                            <div
                                className="ml-4"
                                style={{
                                    color: "var(--color-foreground-darker)",
                                }}
                            >
                                P(A|B) = P(A ∩ B) / P(B) = {pAandB.toFixed(3)} /{" "}
                                {pB.toFixed(3)} ={" "}
                                <Typography variant="strong">
                                    {pA_given_B.toFixed(3)}
                                </Typography>
                            </div>
                            <div
                                className="ml-4"
                                style={{
                                    color: "var(--color-foreground-darker)",
                                }}
                            >
                                P(B|A) = P(A ∩ B) / P(A) = {pAandB.toFixed(3)} /{" "}
                                {pA.toFixed(3)} ={" "}
                                <Typography variant="strong">
                                    {pB_given_A.toFixed(3)}
                                </Typography>
                            </div>

                            <div className="mt-2">
                                <Typography
                                    variant="strong"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    Independence:
                                </Typography>{" "}
                                <span
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    A and B are{" "}
                                    {independent ? (
                                        <Typography variant="strong">
                                            independent
                                        </Typography>
                                    ) : (
                                        "not independent"
                                    )}{" "}
                                    because:
                                </span>
                            </div>
                            <div
                                className="ml-4"
                                style={{
                                    color: "var(--color-foreground-darker)",
                                }}
                            >
                                P(A)·P(B) = {pA.toFixed(3)} × {pB.toFixed(3)} ={" "}
                                {(pA * pB).toFixed(3)}, P(A ∩ B) ={" "}
                                {pAandB.toFixed(3)}
                            </div>
                        </div>
                    </section>

                    <section className="mb-6">
                        <Typography
                            variant="h3"
                            className="mb-4"
                            style={{ color: "var(--color-foreground-dark)" }}
                        >
                            2. Bayes’ Theorem (Medical Test Example)
                        </Typography>

                        <div className="mb-6 grid gap-4 md:grid-cols-3">
                            <div>
                                <Typography
                                    variant="label"
                                    className="mb-1 block text-sm"
                                    style={{
                                        color: "var(--color-foreground-dark)",
                                    }}
                                >
                                    P(D)
                                </Typography>
                                <Input
                                    name="prob-D"
                                    type="number"
                                    step="0.001"
                                    min="0"
                                    max="1"
                                    value={P_D}
                                    onChange={(e) => setP_D(e.target.value)}
                                    placeholder="P(Disease)"
                                    className="w-full"
                                    style={{
                                        backgroundColor:
                                            "var(--color-background-normal)",
                                        borderColor:
                                            "var(--color-background-dark)",
                                        color: "var(--color-foreground-darker)",
                                    }}
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="label"
                                    className="mb-1 block text-sm"
                                    style={{
                                        color: "var(--color-foreground-dark)",
                                    }}
                                >
                                    P(T|D)
                                </Typography>
                                <Input
                                    name="prob-T-given-D"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_T_given_D}
                                    onChange={(e) =>
                                        setP_T_given_D(e.target.value)
                                    }
                                    placeholder="P(Test+ | Disease)"
                                    className="w-full"
                                    style={{
                                        backgroundColor:
                                            "var(--color-background-normal)",
                                        borderColor:
                                            "var(--color-background-dark)",
                                        color: "var(--color-foreground-darker)",
                                    }}
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="label"
                                    className="mb-1 block text-sm"
                                    style={{
                                        color: "var(--color-foreground-dark)",
                                    }}
                                >
                                    P(T|¬D)
                                </Typography>
                                <Input
                                    name="prob-T-given-notD"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_T_given_notD}
                                    onChange={(e) =>
                                        setP_T_given_notD(e.target.value)
                                    }
                                    placeholder="P(Test+ | No Disease)"
                                    className="w-full"
                                    style={{
                                        backgroundColor:
                                            "var(--color-background-normal)",
                                        borderColor:
                                            "var(--color-background-dark)",
                                        color: "var(--color-foreground-darker)",
                                    }}
                                />
                            </div>
                        </div>

                        <div
                            className="space-y-2 rounded-lg p-4"
                            style={{
                                backgroundColor:
                                    "var(--color-background-normal)",
                                border: "1px solid var(--color-background-dark)",
                            }}
                        >
                            <div>
                                <Typography
                                    variant="strong"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    Total Probability:
                                </Typography>{" "}
                                <Typography
                                    variant="code"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    P(T) = P(T|D)P(D) + P(T|¬D)P(¬D)
                                </Typography>
                            </div>
                            <div
                                className="ml-4"
                                style={{
                                    color: "var(--color-foreground-darker)",
                                }}
                            >
                                = ({pTgD})({pD}) + ({pTgND})(1−{pD}) ={" "}
                                {pT.toFixed(4)}
                            </div>

                            <div className="mt-2">
                                <Typography
                                    variant="strong"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    Bayes’ Theorem:
                                </Typography>{" "}
                                <Typography
                                    variant="code"
                                    style={{
                                        color: "var(--color-foreground-darker)",
                                    }}
                                >
                                    P(D|T) = [P(T|D) P(D)] / P(T)
                                </Typography>
                            </div>
                            <div
                                className="ml-4"
                                style={{
                                    color: "var(--color-foreground-darker)",
                                }}
                            >
                                = ({pTgD} × {pD}) / {pT.toFixed(4)} ={" "}
                                <Typography variant="strong">
                                    {pDgT.toFixed(4)}
                                </Typography>
                            </div>

                            <div
                                className="mt-2 inline-block rounded p-2"
                                style={{
                                    backgroundColor:
                                        "var(--color-tertiary-light)",
                                    color: "var(--color-tertiary-dark)",
                                }}
                            >
                                <Typography variant="strong">
                                    Interpretation:
                                </Typography>{" "}
                                Even with a positive test, there's only a{" "}
                                {Math.round(pDgT * 100)}% chance of having the
                                disease.
                            </div>
                        </div>
                    </section>

                    <section>
                        <Typography
                            variant="h3"
                            className="mb-4"
                            style={{ color: "var(--color-foreground-dark)" }}
                        >
                            3. Venn Diagram
                        </Typography>
                        <div className="flex justify-center">
                            <svg
                                width="300"
                                height="200"
                                className="rounded"
                                style={{
                                    border: "1px solid var(--color-background-dark)",
                                    backgroundColor:
                                        "var(--color-background-light)",
                                }}
                            >
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="60"
                                    fill="rgba(91, 160, 251, 0.3)"
                                    stroke="var(--color-tertiary-normal)"
                                    strokeWidth="2"
                                />
                                <circle
                                    cx="180"
                                    cy="100"
                                    r="60"
                                    fill="rgba(0, 175, 100, 0.3)"
                                    stroke="var(--color-primary-normal)"
                                    strokeWidth="2"
                                />
                                <text
                                    x="80"
                                    y="60"
                                    fontSize="14"
                                    fill="var(--color-foreground-darker)"
                                    fontFamily="Arial, sans-serif"
                                    fontWeight="bold"
                                >
                                    A
                                </text>
                                <text
                                    x="200"
                                    y="60"
                                    fontSize="14"
                                    fill="var(--color-foreground-darker)"
                                    fontFamily="Arial, sans-serif"
                                    fontWeight="bold"
                                >
                                    B
                                </text>
                                <text
                                    x="130"
                                    y="100"
                                    fontSize="12"
                                    fill="var(--color-foreground-normal)"
                                    fontFamily="Arial, sans-serif"
                                >
                                    A ∩ B
                                </text>
                                <text
                                    x="50"
                                    y="180"
                                    fontSize="12"
                                    fill="var(--color-foreground-normal)"
                                    fontFamily="Arial, sans-serif"
                                >
                                    P(A) = {pA.toFixed(2)}
                                </text>
                                <text
                                    x="170"
                                    y="180"
                                    fontSize="12"
                                    fill="var(--color-foreground-normal)"
                                    fontFamily="Arial, sans-serif"
                                >
                                    P(B) = {pB.toFixed(2)}
                                </text>
                                <text
                                    x="120"
                                    y="150"
                                    fontSize="12"
                                    fill="var(--color-foreground-normal)"
                                    fontFamily="Arial, sans-serif"
                                >
                                    P(A∩B) = {pAandB.toFixed(2)}
                                </text>
                            </svg>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProbabilityRulesExplorer;
