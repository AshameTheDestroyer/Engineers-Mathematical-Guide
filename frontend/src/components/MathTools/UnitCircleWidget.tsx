import { useState, useEffect, useRef } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Typography } from "../Typography/Typography";
import { Flexbox } from "../Flexbox/Flexbox";
import { Icon } from "../Icon/Icon";
import pi_icon from "@/assets/images/logo.png";
import { Image } from "../Image/Image";
import { ButtonBox } from "../ButtonBox/ButtonBox";

const UnitCircleWidget = ({ onClose }: { onClose?: () => void }) => {
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
    const [showTriangle, setShowTriangle] = useState(true);

    const radius = 150;
    const centerX = 180;
    const centerY = 180;

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const step = 30;
        ctx.beginPath();
        ctx.strokeStyle = "var(--color-foreground-lighter)";
        ctx.lineWidth = 0.5;

        for (let y = 0; y <= canvas.height; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }
        for (let x = 0; x <= canvas.width; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }
        ctx.stroke();

        const tickAngles = [
            30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330,
        ];
        ctx.beginPath();
        ctx.strokeStyle = "var(--color-foreground-dark)";
        ctx.lineWidth = 1.5;

        tickAngles.forEach((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = Math.cos(rad);
            const y = -Math.sin(rad);

            const innerX = centerX + x * radius;
            const innerY = centerY + y * radius;
            const outerX = centerX + x * (radius + 8);
            const outerY = centerY + y * (radius + 8);

            ctx.moveTo(innerX, innerY);
            ctx.lineTo(outerX, outerY);
        });
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "var(--color-foreground-normal)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX - radius - 20, centerY);
        ctx.lineTo(centerX + radius + 20, centerY);
        ctx.moveTo(centerX, centerY - radius - 20);
        ctx.lineTo(centerX, centerY + radius + 20);
        ctx.strokeStyle = "var(--color-foreground-light)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const labels =
            mode === "degrees"
                ? [
                      { x: 1, y: 0, label: "0°" },
                      { x: 0, y: -1, label: "90°" },
                      { x: -1, y: 0, label: "180°" },
                      { x: 0, y: 1, label: "270°" },
                  ]
                : [
                      { x: 1, y: 0, label: "0" },
                      { x: 0, y: -1, label: "π/2" },
                      { x: -1, y: 0, label: "π" },
                      { x: 0, y: 1, label: "3π/2" },
                  ];

        ctx.font = "16px sans-serif";
        ctx.fillStyle = "var(--color-foreground-dark)";
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

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = "var(--color-primary-normal)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "var(--color-primary-normal)";
        ctx.fill();

        if (showTriangle) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(px, centerY);
            ctx.lineTo(px, py);
            ctx.closePath();
            ctx.strokeStyle = "var(--color-tertiary-normal)";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = "rgba(50, 80, 130, 0.1)";
            ctx.fill();
        }

        if (Math.abs(90 - (angle % 180)) > 1e-5) {
            const tanLength = Math.tan(rad) * radius;
            const ty1 = centerY - tanLength; // Top
            const ty2 = centerY + tanLength; // Bottom

            ctx.beginPath();
            ctx.moveTo(centerX + radius, ty1); // x = 1 line (right edge)
            ctx.lineTo(centerX + radius, ty2);
            ctx.strokeStyle = "rgba(255, 150, 150, 100)"; // Red dashed
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Optional: Point at (1, tan)
            ctx.beginPath();
            ctx.arc(centerX + radius, centerY - tanLength, 4, 0, 2 * Math.PI);
            // ctx.fillStyle = "rgba(0, 0, 68, 0.8)";
            ctx.fill();
        }

        ctx.fillStyle = "white";
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

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") setAngle((a) => (a + 1) % 360);
            if (e.key === "ArrowLeft") setAngle((a) => (a - 1 + 360) % 360);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

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
        if (["CANVAS", "INPUT", "BUTTON", "SELECT"].includes(target.tagName))
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
            className={`text-background-dark w-200 bg-background-light shadow-foreground-light fixed z-50 cursor-move rounded-xl shadow-lg`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
            onMouseDown={handleMouseDown}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="bg-secondary-normal text-foreground-dark absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded"
                >
                    ✕
                </button>
            )}
            <div
                className="bg-background-light mx-auto max-w-3xl rounded-xl p-6"
                style={{
                    border: "1px solid var(--color-background-dark)",
                }}
            >
                <Flexbox
                    direction="row"
                    // justifyContent="center"
                    gap={5}
                    alignItems="center"
                    className="mb-5"
                >
                    <Image
                        source={pi_icon}
                        alternative="pi_icon"
                        className="h-15 w-15"
                    />
                    <Typography
                        variant="h2"
                        className="text-foreground-darker text-2xl"
                    >
                        Unit Circle Explorer
                    </Typography>
                </Flexbox>
                <Typography
                    variant="p"
                    className="text-foreground-normal mb-6 text-sm"
                >
                    Click or drag around the circle to explore trigonometric
                    functions.
                </Typography>

                <Flexbox
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="wrap"
                    className="mb-6"
                >
                    <Flexbox
                        gap={10}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            variant="label"
                            className="text-foreground-dark mb-1 block"
                        >
                            Angle: {formatAngle()}
                        </Typography>
                        <Input
                            name="unit-circle-angle"
                            type="range"
                            min="0"
                            max="360"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                            className="w-48"
                        />
                    </Flexbox>

                    <div>
                        <Typography
                            variant="label"
                            className="text-foreground-dark mb-1 block text-sm"
                        >
                            Mode
                        </Typography>
                        <select
                            name="unit-circle-mode"
                            value={mode}
                            onChange={(e) => setMode(e.target.value as any)}
                            className="bg-background-normal border-background-dark text-foreground-dark rounded border px-2 py-1"
                        >
                            <option value="degrees">Degrees</option>
                            <option value="radians">Radians</option>
                        </select>
                    </div>

                    <ButtonBox>
                        <Button
                            onClick={() => setAngle(0)}
                            variant="default"
                            thickness="normal"
                            className="text-vibrant-purple-dark bold"
                        >
                            Reset
                        </Button>
                        {/* <Button
                            onClick={() => setShowTriangle(!showTriangle)}
                            variant="default"
                            thickness="thin"
                            className="text-tertiary-dark"
                        >
                            {showTriangle ? "Hide" : "Show"} Triangle
                        </Button> */}
                    </ButtonBox>
                </Flexbox>

                <Flexbox
                    direction="row"
                    gap={6}
                    className="flex-col md:flex-row"
                >
                    <div className="text-white">
                        <canvas
                            ref={canvasRef}
                            width={360}
                            height={360}
                            className="cursor-crosshair rounded-lg"
                            style={{
                                border: "1px solid var(--color-background-dark)",
                            }}
                            onMouseDown={handleCanvasMouseDown}
                        />
                    </div>

                    <div className="text-foreground-dark bg-background-dark flex-1 space-y-3 rounded-lg p-4">
                        <Typography
                            variant="h3"
                            className="text-foreground-dark font-semibold"
                        >
                            Values at θ = {formatAngle()}
                        </Typography>
                        <div className="space-y-2">
                            <div>
                                <Typography
                                    variant="strong"
                                    className="text-primary-normal"
                                >
                                    sin(θ)
                                </Typography>{" "}
                                ={" "}
                                <Typography
                                    variant="code"
                                    className="text-foreground-dark"
                                >
                                    {sinVal}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="strong"
                                    className="text-red-500"
                                >
                                    cos(θ)
                                </Typography>{" "}
                                ={" "}
                                <Typography
                                    variant="code"
                                    className="text-foreground-darker"
                                >
                                    {cosVal}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="strong"
                                    className="text-secondary-normal"
                                >
                                    tan(θ)
                                </Typography>{" "}
                                ={" "}
                                <Typography
                                    variant="code"
                                    className="text-foreground-darker"
                                >
                                    {tanVal}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="strong"
                                    className="text-violet-600"
                                >
                                    csc(θ)
                                </Typography>{" "}
                                ={" "}
                                <Typography variant="code">
                                    {Math.abs(angle % 180) < 1e-5
                                        ? "∞"
                                        : (
                                              1 /
                                              Math.sin((angle * Math.PI) / 180)
                                          ).toFixed(3)}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="strong"
                                    className="text-yellow-200"
                                >
                                    sec(θ)
                                </Typography>{" "}
                                ={" "}
                                <Typography variant="code">
                                    {Math.abs(90 - (angle % 180)) < 1e-5
                                        ? "∞"
                                        : (
                                              1 /
                                              Math.cos((angle * Math.PI) / 180)
                                          ).toFixed(3)}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="strong"
                                    className="text-pink-500"
                                >
                                    cot(θ)
                                </Typography>{" "}
                                ={" "}
                                <Typography variant="code">
                                    {Math.abs(angle % 180) < 1e-5
                                        ? "∞"
                                        : (
                                              1 /
                                              Math.tan((angle * Math.PI) / 180)
                                          ).toFixed(3)}
                                </Typography>
                            </div>
                        </div>

                        <div className="border-foreground-dark border-t pt-2">
                            <Typography
                                variant="p"
                                className="text-foreground-dark"
                            >
                                Quadrant:{" "}
                                <Typography variant="strong">
                                    {angle < 90
                                        ? "I"
                                        : angle < 180
                                          ? "II"
                                          : angle < 270
                                            ? "III"
                                            : "IV"}
                                </Typography>
                                <br />
                                Signs: ({angle < 90 || angle > 270 ? "+" : "-"},
                                {angle < 180 ? "+" : "-"},
                                {tanVal !== "∞" && Number(tanVal) >= 0
                                    ? "+"
                                    : "-"}
                                )
                            </Typography>
                        </div>
                    </div>
                </Flexbox>
            </div>
        </div>
    );
};

export default UnitCircleWidget;
