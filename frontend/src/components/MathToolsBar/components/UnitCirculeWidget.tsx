// components/UnitCircleWidget.tsx
import { useState, useEffect, useRef } from 'react';

export const UnitCircleWidget = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState<number>(0); // in degrees
  const [mode, setMode] = useState<'degrees' | 'radians'>('degrees');
  const [isDragging, setIsDragging] = useState(false);

  const radius = 150;
  const centerX = 180;
  const centerY = 180;

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(centerX - radius - 20, centerY);
    ctx.lineTo(centerX + radius + 20, centerY);
    ctx.moveTo(centerX, centerY - radius - 20);
    ctx.lineTo(centerX, centerY + radius + 20);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Labels: 0°, 90°, 180°, 270°
    const labels = [
      { angle: 0, x: 1, y: 0, label: '0°' },
      { angle: 90, x: 0, y: -1, label: '90°' },
      { angle: 180, x: -1, y: 0, label: '180°' },
      { angle: 270, x: 0, y: 1, label: '270°' },
    ];

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#000'; // ✅ Black text
    labels.forEach(l => {
      const x = centerX + (radius + 20) * l.x;
      const y = centerY + (radius + 20) * l.y;
      ctx.fillText(l.label, x - 10, y + 5);
    });

    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad);
    const y = -Math.sin(rad); // flip Y for canvas
    const px = centerX + x * radius;
    const py = centerY + y * radius;

    // Draw radius
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw point
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#4f46e5';
    ctx.fill();

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, centerY);
    ctx.lineTo(px, py);
    ctx.closePath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#10b98120';
    ctx.fill();

    // Triangle labels (✅ all black text)
    ctx.fillStyle = '#000'; // ✅ Black
    ctx.font = '14px sans-serif';
    ctx.fillText('1', (centerX + px) / 2 - 5, (centerY + py) / 2 + 10);
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

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    updateAngle(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) updateAngle(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateAngle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    let rad = Math.atan2(-y, x); // negative y for correct orientation
    let deg = (rad * 180) / Math.PI;
    if (deg < 0) deg += 360;
    setAngle(deg);
  };

  const sinVal = Math.sin((angle * Math.PI) / 180).toFixed(3);
  const cosVal = Math.cos((angle * Math.PI) / 180).toFixed(3);
  const tanVal =
    Math.abs(90 - (angle % 180)) < 1e-5
      ? '∞'
      : Math.tan((angle * Math.PI) / 180).toFixed(3);

  const formatAngle = () => {
    if (mode === 'degrees') return `${Math.round(angle)}°`;
    const r = angle * (Math.PI / 180);
    const piFrac = r / Math.PI;
    if (Math.abs(piFrac - 0.5) < 0.01) return 'π/2';
    if (Math.abs(piFrac - 1) < 0.01) return 'π';
    if (Math.abs(piFrac - 1.5) < 0.01) return '3π/2';
    if (Math.abs(piFrac - 2) < 0.01) return '2π';
    return `${r.toFixed(3)} rad`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Unit Circle Explorer
      </h2>
      <p className="text-sm text-gray-700 mb-6">
        Click or drag around the circle to explore trigonometric functions.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Angle: {formatAngle()}
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={e => setAngle(Number(e.target.value))}
            className="w-48"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mode
          </label>
          <select
            value={mode}
            onChange={e => setMode(e.target.value as any)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="degrees">Degrees</option>
            <option value="radians">Radians</option>
          </select>
        </div>

        <button
          onClick={() => setAngle(0)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Reset
        </button>
      </div>

      {/* Unit Circle */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div>
          <canvas
            ref={canvasRef}
            width={360}
            height={360}
            className="border border-gray-300 rounded-lg cursor-pointer"
            onMouseDown={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        {/* Values Panel */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3 flex-1 min-w-48">
          <h3 className="font-semibold text-gray-800">
            Values at θ = {formatAngle()}
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong className="text-blue-600">sin(θ)</strong> ={' '}
              <span className="font-mono text-black">{sinVal}</span>
            </div>
            <div>
              <strong className="text-green-600">cos(θ)</strong> ={' '}
              <span className="font-mono text-black">{cosVal}</span>
            </div>
            <div>
              <strong className="text-purple-600">tan(θ)</strong> ={' '}
              <span className="font-mono text-black">{tanVal}</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-gray-800">
              Quadrant:{' '}
              <strong>
                {angle < 90
                  ? 'I'
                  : angle < 180
                    ? 'II'
                    : angle < 270
                      ? 'III'
                      : 'IV'}
              </strong>
              <br />
              Signs: ({angle < 90 || angle > 270 ? '+' : '-'},
              {angle < 180 ? '+' : '-'},
              {tanVal !== '∞' && Number(tanVal) >= 0 ? '+' : '-'})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
