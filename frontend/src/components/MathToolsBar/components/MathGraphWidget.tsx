import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        nerdamer: any;
    }
}

const { nerdamer } = window;

type Graph = {
    id: number;
    expr: string;
    color: string;
};

interface MathGraphWidgetProps {
    onClose?: () => void;
}

export const MathGraphWidget: React.FC<MathGraphWidgetProps> = ({
    onClose,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState<string>("x^2");
    const [color, setColor] = useState<string>("#4f46e5");
    const [graphs, setGraphs] = useState<Graph[]>([
        { id: Date.now(), expr: "x^2", color: "#4f46e5" },
    ]);
    const [error, setError] = useState<string | null>(null);
    const [position, setPosition] = useState({
        x: window.innerWidth - 680,
        y: 100,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsDragging(true);
        }
    };

    const addGraph = () => {
        if (!input.trim()) return;
        try {
            nerdamer(input);
            setGraphs((prev) => [
                ...prev,
                { id: Date.now(), expr: input, color },
            ]);
            setInput("");
            setError(null);
        } catch {
            setError("Invalid function. Example: x^2, sin(x), e^x");
        }
    };

    const removeGraph = (id: number) => {
        setGraphs((prev) => prev.filter((g) => g.id !== id));
    };

    const drawGraphs = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 50;

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        graphs.forEach(({ expr: exprStr, color }) => {
            let parsedExpr;
            try {
                parsedExpr = nerdamer(exprStr);
            } catch {
                return;
            }

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();

            let firstPoint = true;

            for (let screenX = 0; screenX < width; screenX++) {
                const x = (screenX - centerX) / scale;
                let y: number;

                try {
                    y = parsedExpr.evaluate({ x }).valueOf();
                    if (typeof y !== "number" || !isFinite(y)) continue;
                } catch {
                    continue;
                }

                const screenY = centerY - y * scale;

                if (screenY >= 0 && screenY <= height) {
                    if (firstPoint) {
                        ctx.moveTo(screenX, screenY);
                        firstPoint = false;
                    } else {
                        ctx.lineTo(screenX, screenY);
                    }
                } else if (!firstPoint) {
                    ctx.stroke();
                    ctx.beginPath();
                    firstPoint = true;
                }
            }

            if (!firstPoint) ctx.stroke();
        });
    };

    useEffect(() => {
        drawGraphs();
    }, [graphs]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addGraph();
    };

    return (
        // <div
        //     ref={containerRef}
        //     className="fixed z-50 h-4/5 cursor-move overflow-auto"
        //     style={{ left: `${position.x}px`, top: `${position.y}px` }}
        //     onMouseDown={handleMouseDown}
        // >
        //     {onClose && (
        //         <button
        //             onClick={onClose}
        //             className="absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white hover:bg-red-600"
        //         >
        //             ✕
        //         </button>
        //     )}
        //     <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 font-sans shadow-lg">
        //         <h2 className="mb-4 text-2xl font-bold text-gray-800">
        //             Advanced Math Grapher
        //         </h2>
        //         <p className="mb-4 text-sm text-gray-600">
        //             Enter a function of{" "}
        //             <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-black">
        //                 x
        //             </code>
        //             : e.g.{" "}
        //             <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-black">
        //                 x^2
        //             </code>
        //             ,{" "}
        //             <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-black">
        //                 sin(x)
        //             </code>
        //         </p>

        //         <form
        //             onSubmit={handleSubmit}
        //             className="mb-6 flex flex-wrap items-center gap-2"
        //         >
        //             <input
        //                 type="text"
        //                 value={input}
        //                 onChange={(e) => setInput(e.target.value)}
        //                 placeholder="e.g. sin(x), 2*x + 1"
        //                 className="min-w-48 flex-grow rounded-lg border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 aria-label="Math function input"
        //             />
        //             <input
        //                 type="color"
        //                 value={color}
        //                 onChange={(e) => setColor(e.target.value)}
        //                 className="h-10 w-10 cursor-pointer rounded border border-gray-300"
        //                 title="Pick graph color"
        //             />
        //             <button
        //                 type="submit"
        //                 className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800"
        //             >
        //                 Add Graph
        //             </button>
        //         </form>

        //         {error && (
        //             <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        //                 {error}
        //             </div>
        //         )}

        //         <div className="mb-4 max-h-32 space-y-2 overflow-y-auto pr-2">
        //             {graphs.length === 0 ? (
        //                 <p className="text-sm text-gray-500">
        //                     No graphs added.
        //                 </p>
        //             ) : (
        //                 graphs.map((g) => (
        //                     <div
        //                         key={g.id}
        //                         className="flex items-center gap-2 text-sm"
        //                     >
        //                         <span
        //                             className="inline-block h-4 w-4 rounded border"
        //                             style={{ backgroundColor: g.color }}
        //                             aria-label={`Color: ${g.color}`}
        //                         />
        //                         <code className="flex-grow truncate rounded bg-gray-100 px-1.5 py-0.5 font-mono text-black">
        //                             {g.expr}
        //                         </code>
        //                         <button
        //                             onClick={() => removeGraph(g.id)}
        //                             className="px-2 py-1 text-xs text-red-500 hover:text-red-700"
        //                             aria-label="Remove graph"
        //                         >
        //                             ✕
        //                         </button>
        //                     </div>
        //                 ))
        //             )}
        //         </div>

        //         <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        //             <canvas
        //                 ref={canvasRef}
        //                 width={600}
        //                 height={400}
        //                 className="block w-full bg-gray-50"
        //                 aria-label="Math function graph"
        //             />
        //         </div>
        //     </div>
        // </div>
        <div>dkfgnlfdg</div>
    );
};
