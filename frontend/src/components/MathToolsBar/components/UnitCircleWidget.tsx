import { useState, useEffect, useRef } from "react";

interface UnitCircleWidgetProps {
    onClose?: () => void;
}

export const UnitCircleWidget: React.FC<UnitCircleWidgetProps> = ({
    onClose,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState<number>(0);
    const [mode, setMode] = useState<"degrees" | "radians">("degrees");
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({
        x: window.innerWidth - 700,
        y: 100,
    });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const radius = 150;
    const centerX = 180;
    const centerY = 180;

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Axes
        ctx.beginPath();
        ctx.moveTo(centerX - radius - 20, centerY);
        ctx.lineTo(centerX + radius + 20, centerY);
        ctx.moveTo(centerX, centerY - radius - 20);
        ctx.lineTo(centerX, centerY + radius + 20);
        ctx.strokeStyle = "#6b7280";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Labels
        const labels = [
            { angle: 0, x: 1, y: 0, label: "0°" },
            { angle: 90, x: 0, y: -1, label: "90°" },
            { angle: 180, x: -1, y: 0, label: "180°" },
            { angle: 270, x: 0, y: 1, label: "270°" },
        ];

        ctx.font = "14px sans-serif";
        ctx.fillStyle = "#000";
        labels.forEach((l) => {
            const x = centerX + (radius + 20) * l.x;
            const y = centerY + (radius + 20) * l.y;
            ctx.fillText(l.label, x - 10, y + 5);
        });

        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad);
        const y = -Math.sin(rad);
        const px = centerX + x * radius;
        const py = centerY + y * radius;

        // Radius
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = "#4f46e5";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Point
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#4f46e5";
        ctx.fill();

        // Triangle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, centerY);
        ctx.lineTo(px, py);
        ctx.closePath();
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#10b98120";
        ctx.fill();

        // Labels
        ctx.fillStyle = "#000";
        ctx.font = "14px sans-serif";
        ctx.fillText("1", (centerX + px) / 2 - 5, (centerY + py) / 2 + 10);
        ctx.fillText(
            `cos(${Math.round(angle)}°)`,
            (centerX + px) / 2,
            centerY + 20
        );
        ctx.fillText(`sin(${Math.round(angle)}°)`, px + 10, (centerY + py) / 2);
    };

    useEffect(() => {
        draw();
    }, [angle]);

    // Handle dragging the window
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

    // Mouse down on container — only allow drag if not on interactive elements
    const handleMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        // If clicking on canvas, input, button, or select — don't drag
        if (
            target.tagName === "CANVAS" ||
            target.tagName === "INPUT" ||
            target.tagName === "BUTTON" ||
            target.tagName === "SELECT"
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

    // Handle canvas interaction
    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;
        let rad = Math.atan2(-y, x);
        let deg = (rad * 180) / Math.PI;
        if (deg < 0) deg += 360;
        setAngle(deg);

        const handleMove = (e: MouseEvent) => {
            const x = e.clientX - rect.left - centerX;
            const y = e.clientY - rect.top - centerY;
            let rad = Math.atan2(-y, x);
            let deg = (rad * 180) / Math.PI;
            if (deg < 0) deg += 360;
            setAngle(deg);
        };

        const handleUp = () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleUp);
        };

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleUp);
    };

    const sinVal = Math.sin((angle * Math.PI) / 180).toFixed(3);
    const cosVal = Math.cos((angle * Math.PI) / 180).toFixed(3);
    const tanVal =
        Math.abs(90 - (angle % 180)) < 1e-5
            ? "∞"
            : Math.tan((angle * Math.PI) / 180).toFixed(3);

    const formatAngle = () => {
        if (mode === "degrees") return `${Math.round(angle)}°`;
        const r = angle * (Math.PI / 180);
        const piFrac = r / Math.PI;
        if (Math.abs(piFrac - 0.5) < 0.01) return "π/2";
        if (Math.abs(piFrac - 1) < 0.01) return "π";
        if (Math.abs(piFrac - 1.5) < 0.01) return "3π/2";
        if (Math.abs(piFrac - 2) < 0.01) return "2π";
        return `${r.toFixed(3)} rad`;
    };

    return (
        <div
            ref={containerRef}
            className="fixed z-50 cursor-move"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleMouseDown}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded bg-gray-800 text-white"
                >
                    ✕
                </button>
            )}
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    Unit Circle Explorer
                </h2>
                <p className="mb-6 text-sm text-gray-700">
                    Click or drag around the circle to explore trigonometric
                    functions.
                </p>

                <div className="mb-6 flex flex-wrap items-center gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Angle: {formatAngle()}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                            className="w-48"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Mode
                        </label>
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as any)}
                            className="rounded border border-gray-300 px-2 py-1 text-sm text-black"
                        >
                            <option value="degrees">Degrees</option>
                            <option value="radians">Radians</option>
                        </select>
                    </div>

                    <button
                        onClick={() => setAngle(0)}
                        className="rounded bg-blue-700 bg-gray-200 px-3 py-1 text-sm text-black hover:bg-gray-300"
                    >
                        Reset
                    </button>
                </div>

                <div className="flex flex-col items-start gap-6 md:flex-row">
                    <div>
                        <canvas
                            ref={canvasRef}
                            width={360}
                            height={360}
                            className="cursor-crosshair rounded-lg border border-gray-300"
                            onMouseDown={handleCanvasMouseDown}
                        />
                    </div>

                    <div className="min-w-48 flex-1 space-y-3 rounded-lg bg-gray-50 p-4">
                        <h3 className="font-semibold text-gray-800">
                            Values at θ = {formatAngle()}
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div>
                                <strong className="text-blue-600">
                                    sin(θ)
                                </strong>{" "}
                                ={" "}
                                <span className="font-mono text-black">
                                    {sinVal}
                                </span>
                            </div>
                            <div>
                                <strong className="text-green-600">
                                    cos(θ)
                                </strong>{" "}
                                ={" "}
                                <span className="font-mono text-black">
                                    {cosVal}
                                </span>
                            </div>
                            <div>
                                <strong className="text-purple-600">
                                    tan(θ)
                                </strong>{" "}
                                ={" "}
                                <span className="font-mono text-black">
                                    {tanVal}
                                </span>
                            </div>
                        </div>

                        <div className="border-t pt-2">
                            <p className="text-sm text-gray-800">
                                Quadrant:{" "}
                                <strong>
                                    {angle < 90
                                        ? "I"
                                        : angle < 180
                                          ? "II"
                                          : angle < 270
                                            ? "III"
                                            : "IV"}
                                </strong>
                                <br />
                                Signs: ({angle < 90 || angle > 270 ? "+" : "-"},
                                {angle < 180 ? "+" : "-"},
                                {tanVal !== "∞" && Number(tanVal) >= 0
                                    ? "+"
                                    : "-"}
                                )
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
