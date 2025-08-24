import { useState, useRef, useEffect } from "react";

interface ProbabilityRulesExplorerProps {
    onClose?: () => void;
}

export const ProbabilityRulesExplorer: React.FC<
    ProbabilityRulesExplorerProps
> = ({ onClose }) => {
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

    const num = (s: string) => Math.max(0, Math.min(1, parseFloat(s) || 0));

    const pA = num(P_A);
    const pB = num(P_B);
    const pAandB = Math.min(pA, pB, num(P_A_and_B));

    const pAorB = pA + pB - pAandB;
    const pA_given_B = pB > 0 ? pAandB / pB : 0;
    const pB_given_A = pA > 0 ? pAandB / pA : 0;
    const independent = Math.abs(pAandB - pA * pB) < 0.01;

    const [P_D, setP_D] = useState<string>("0.01");
    const [P_T_given_D, setP_T_given_D] = useState<string>("0.99");
    const [P_T_given_notD, setP_T_given_notD] = useState<string>("0.02");

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

        const handleMouseUp = () => {
            setIsDragging(false);
        };

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
            target.tagName === "INPUT" ||
            target.tagName === "LABEL" ||
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
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleMouseDown}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                >
                    ✕
                </button>
            )}
            <div
                className="mx-auto max-w-4xl rounded-xl bg-white p-6 font-sans shadow-lg"
                style={{ width: "600px" }}
            >
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Probability Rules Explorer
                </h2>
                <p className="mb-6 text-sm text-gray-800">
                    Explore real probability theorems with interactive examples.
                    All formulas are mathematically correct.
                </p>

                <div
                    className="max-h-[60vh] overflow-y-auto pr-2"
                    style={{ maxHeight: "60vh" }}
                >
                    <section className="mb-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            1. Basic Probability Rules
                        </h3>

                        <div className="mb-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    P(A)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_A}
                                    onChange={(e) => setP_A(e.target.value)}
                                    className="w-full rounded border border-gray-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 0.3"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    P(B)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_B}
                                    onChange={(e) => setP_B(e.target.value)}
                                    className="w-full rounded border border-gray-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 0.5"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    P(A ∩ B)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_A_and_B}
                                    onChange={(e) =>
                                        setP_A_and_B(e.target.value)
                                    }
                                    className="w-full rounded border border-gray-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 0.1"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
                            <div>
                                <strong className="text-gray-900">
                                    Addition Rule:
                                </strong>{" "}
                                <span className="font-mono text-gray-900">
                                    P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                                </span>
                            </div>
                            <div className="ml-4 text-gray-900">
                                = {pA.toFixed(3)} + {pB.toFixed(3)} -{" "}
                                {pAandB.toFixed(3)} ={" "}
                                <strong>{pAorB.toFixed(3)}</strong>
                            </div>

                            <div className="mt-2">
                                <strong className="text-gray-900">
                                    Conditional Probability:
                                </strong>
                            </div>
                            <div className="ml-4 text-gray-900">
                                P(A|B) = P(A ∩ B) / P(B) = {pAandB.toFixed(3)} /{" "}
                                {pB.toFixed(3)} ={" "}
                                <strong>{pA_given_B.toFixed(3)}</strong>
                            </div>
                            <div className="ml-4 text-gray-900">
                                P(B|A) = P(A ∩ B) / P(A) = {pAandB.toFixed(3)} /{" "}
                                {pA.toFixed(3)} ={" "}
                                <strong>{pB_given_A.toFixed(3)}</strong>
                            </div>

                            <div className="mt-2">
                                <strong className="text-gray-900">
                                    Independence:
                                </strong>{" "}
                                <span className="text-gray-900">
                                    A and B are{" "}
                                    {independent ? (
                                        <strong>independent</strong>
                                    ) : (
                                        "not independent"
                                    )}{" "}
                                    because:
                                </span>
                            </div>
                            <div className="ml-4 text-gray-900">
                                P(A)·P(B) = {pA.toFixed(3)} × {pB.toFixed(3)} ={" "}
                                {(pA * pB).toFixed(3)}, P(A ∩ B) ={" "}
                                {pAandB.toFixed(3)}
                            </div>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            2. Bayes’ Theorem (Medical Test Example)
                        </h3>

                        <div className="mb-6 grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    P(D)
                                </label>
                                <input
                                    type="number"
                                    step="0.001"
                                    min="0"
                                    max="1"
                                    value={P_D}
                                    onChange={(e) => setP_D(e.target.value)}
                                    className="w-full rounded border border-gray-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="P(Disease)"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    P(T|D)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_T_given_D}
                                    onChange={(e) =>
                                        setP_T_given_D(e.target.value)
                                    }
                                    className="w-full rounded border border-gray-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="P(Test+ | Disease)"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    P(T|¬D)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={P_T_given_notD}
                                    onChange={(e) =>
                                        setP_T_given_notD(e.target.value)
                                    }
                                    className="w-full rounded border border-gray-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="P(Test+ | No Disease)"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
                            <div>
                                <strong className="text-gray-900">
                                    Total Probability:
                                </strong>{" "}
                                <span className="font-mono text-gray-900">
                                    P(T) = P(T|D)P(D) + P(T|¬D)P(¬D)
                                </span>
                            </div>
                            <div className="ml-4 text-gray-900">
                                = ({pTgD})({pD}) + ({pTgND})(1−{pD}) ={" "}
                                {pT.toFixed(4)}
                            </div>

                            <div className="mt-2">
                                <strong className="text-gray-900">
                                    Bayes’ Theorem:
                                </strong>{" "}
                                <span className="font-mono text-gray-900">
                                    P(D|T) = [P(T|D) P(D)] / P(T)
                                </span>
                            </div>
                            <div className="ml-4 text-gray-900">
                                = ({pTgD} × {pD}) / {pT.toFixed(4)} ={" "}
                                <strong>{pDgT.toFixed(4)}</strong>
                            </div>

                            <div className="mt-2 inline-block rounded bg-blue-50 p-2 text-blue-800">
                                <strong>Interpretation:</strong> Even with a
                                positive test, there's only a{" "}
                                {Math.round(pDgT * 100)}% chance of having the
                                disease.
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            3. Venn Diagram
                        </h3>
                        <div className="flex justify-center">
                            <svg
                                width="300"
                                height="200"
                                className="rounded border border-gray-400 bg-white"
                            >
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
        </div>
    );
};
