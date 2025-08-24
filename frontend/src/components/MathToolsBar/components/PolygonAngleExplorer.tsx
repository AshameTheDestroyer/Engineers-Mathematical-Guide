// components/PolygonAngleExplorer.tsx
import { useState, useEffect, useRef } from "react";

export const PolygonAngleExplorer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [sides, setSides] = useState<number>(6);
    const [radius, setRadius] = useState<number>(120);
    const [isRegular, setIsRegular] = useState<boolean>(true);
    const [vertices, setVertices] = useState<{ x: number; y: number }[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const centerX = 180;
    const centerY = 180;
    const canvasSize = 360;

    // Generate regular polygon vertices
    const generateRegular = () => {
        if (sides < 3) {
            setVertices([]);
            return;
        }

        const points = [];
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
            points.push({
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
            });
        }
        setVertices(points);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // Draw circle guide (faint)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#d1d5db";
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw polygon
        if (vertices.length > 0) {
            ctx.beginPath();
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let i = 1; i < vertices.length; i++) {
                ctx.lineTo(vertices[i].x, vertices[i].y);
            }
            ctx.closePath();
            ctx.strokeStyle = "#1f2937";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Fill with light color
            ctx.fillStyle = "#3b82f620";
            ctx.fill();
        }

        // Draw vertices
        vertices.forEach((v, i) => {
            const isDragging = draggedIndex === i;
            ctx.beginPath();
            ctx.arc(v.x, v.y, isDragging ? 8 : 6, 0, 2 * Math.PI);
            ctx.fillStyle = isDragging ? "#ef4444" : "#3b82f6";
            ctx.fill();
            ctx.strokeStyle = "#111";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Label vertex number (small)
            ctx.fillStyle = "#000";
            ctx.font = "12px sans-serif";
            ctx.fillText(`${i + 1}`, v.x + 8, v.y - 8);
        });

        // Draw central angles (green)
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1;
        vertices.forEach((v) => {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(v.x, v.y);
            ctx.stroke();
        });

        // Draw one interior angle (blue)
        // Draw one interior angle (blue)
        if (vertices.length >= 3) {
            const i = 0;
            const prev = vertices[(i - 1 + sides) % sides];
            const curr = vertices[i];
            const next = vertices[(i + 1) % sides];

            // Skip if any vertex is missing
            if (!prev || !curr || !next) return;

            // Calculate angles
            const angle1 = Math.atan2(prev.y - curr.y, prev.x - curr.x);
            const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);

            const startAngle = Math.min(angle1, angle2);
            const endAngle = Math.max(angle1, angle2);

            ctx.beginPath();
            ctx.arc(curr.x, curr.y, 20, startAngle, endAngle);
            ctx.strokeStyle = "#3b82f6";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label interior angle
            ctx.fillStyle = "#3b82f6";
            ctx.font = "14px sans-serif";
            const interiorAngle = ((sides - 2) * 180) / sides;
            ctx.fillText(
                `${interiorAngle.toFixed(1)}°`,
                curr.x + 25,
                curr.y - 10
            );
        }

        // Draw one exterior angle (red)
        if (vertices.length >= 3) {
            const i = 0;
            const curr = vertices[i];
            const next = vertices[(i + 1) % sides];

            const dx = next.x - curr.x;
            const dy = next.y - curr.y;
            const angle = Math.atan2(dy, dx);

            ctx.save();
            ctx.translate(curr.x, curr.y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.arc(15, 0, 15, 0, Math.PI * 0.6);
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();

            ctx.fillStyle = "#ef4444";
            ctx.font = "14px sans-serif";
            const exteriorAngle = 360 / sides;
            ctx.fillText(
                `${exteriorAngle.toFixed(1)}°`,
                curr.x + 40,
                curr.y + 10
            );
        }
    };

    useEffect(() => {
        draw();
    }, [vertices, sides]);

    // Mouse interaction
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isRegular) return;

        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        vertices.forEach((v, i) => {
            const dx = v.x - x;
            const dy = v.y - y;
            if (dx * dx + dy * dy < 64) {
                setDraggedIndex(i);
            }
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (draggedIndex === null || isRegular) return;

        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - centerX;
        const dy = y - centerY;
        // @ts-expect-error
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Keep on circle (snap to radius)
        const angle = Math.atan2(dy, dx);
        const snappedX = centerX + radius * Math.cos(angle);
        const snappedY = centerY + radius * Math.sin(angle);

        const updated = [...vertices];
        updated[draggedIndex] = { x: snappedX, y: snappedY };
        setVertices(updated);
    };

    const handleMouseUp = () => {
        setDraggedIndex(null);
    };

    // Reset to regular
    const makeRegular = () => {
        setIsRegular(true);
        generateRegular();
    };

    // Calculate values
    const interiorAngle =
        sides >= 3 ? (((sides - 2) * 180) / sides).toFixed(1) : "0";
    const interiorSum = sides >= 3 ? (sides - 2) * 180 : 0;
    const exteriorAngle = sides >= 3 ? (360 / sides).toFixed(1) : "0";
    const centralAngle = exteriorAngle;

    return (
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
                Polygon Angle Explorer
            </h2>
            <p className="mb-6 text-sm text-gray-600">
                Drag vertices or adjust sides to explore interior, exterior, and
                central angles.
            </p>

            <div className="mb-6 flex flex-wrap gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sides: {sides}
                    </label>
                    <input
                        type="range"
                        min="3"
                        max="12"
                        value={sides}
                        onChange={(e) => setSides(Number(e.target.value))}
                        className="w-40"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Radius: {radius}px
                    </label>
                    <input
                        type="range"
                        min="80"
                        max="150"
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="w-40"
                    />
                </div>

                <div className="flex items-end gap-2">
                    <button
                        onClick={makeRegular}
                        disabled={isRegular}
                        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Make Regular
                    </button>
                    <button
                        onClick={() => setIsRegular(false)}
                        disabled={!isRegular}
                        className="rounded bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
                    >
                        Allow Drag
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6 md:flex-row">
                <div>
                    <canvas
                        ref={canvasRef}
                        width={canvasSize}
                        height={canvasSize}
                        className="rounded-lg border border-gray-300 bg-gray-50"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    />
                </div>

                <div className="min-w-64 space-y-3 rounded-lg bg-gray-50 p-5">
                    <h3 className="font-semibold text-gray-800">Key Angles</h3>
                    <div className="space-y-2 text-sm">
                        <div>
                            <strong className="text-blue-600">
                                Interior Angle:
                            </strong>{" "}
                            <span className="font-mono text-black">
                                {interiorAngle}°
                            </span>
                        </div>
                        <div>
                            <strong className="text-blue-600">
                                Interior Sum:
                            </strong>{" "}
                            <span className="font-mono text-black">
                                {interiorSum}°
                            </span>
                        </div>
                        <div>
                            <strong className="text-red-600">
                                Exterior Angle:
                            </strong>{" "}
                            <span className="font-mono text-black">
                                {exteriorAngle}°
                            </span>
                        </div>
                        <div>
                            <strong className="text-green-600">
                                Central Angle:
                            </strong>{" "}
                            <span className="font-mono text-black">
                                {centralAngle}°
                            </span>
                        </div>
                    </div>

                    <div className="border-t pt-3">
                        <p className="text-xs text-gray-600">
                            💡 As sides increase → polygon approaches a{" "}
                            <strong>circle</strong>.<br />
                            💡 Exterior angles always sum to{" "}
                            <strong>360°</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
