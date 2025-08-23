// components/PolygonFromAnglesBuilder.tsx
import { useState, useEffect, useRef } from 'react';

export const PolygonFromAnglesBuilder = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sides, setSides] = useState<number>(4);
  const [lengths, setLengths] = useState<number[]>([80, 80, 80, 80]);
  const [angles, setAngles] = useState<number[]>([90, 90, 90, 90]);
  const [error, setError] = useState<string | null>(null);
  const [vertices, setVertices] = useState<{ x: number; y: number }[]>([]);

  const canvasSize = 400;
  const centerX = canvasSize / 2 - 50;
  const centerY = canvasSize / 2 + 50;

  // Update arrays when side count changes
  useEffect(() => {
    setLengths(prev => {
      const newArr = [...Array(sides).fill(80)];
      for (let i = 0; i < Math.min(prev.length, sides); i++)
        newArr[i] = prev[i];
      return newArr;
    });
    setAngles(prev => {
      const newArr = [...Array(sides).fill(90)];
      for (let i = 0; i < Math.min(prev.length, sides); i++)
        newArr[i] = prev[i];
      return newArr;
    });
  }, [sides]);

  const isValidPolygon = () => {
    const expectedSum = (sides - 2) * 180;
    const actualSum = angles.reduce((a, b) => a + b, 0);
    return Math.abs(actualSum - expectedSum) < 1;
  };

  const drawPolygon = () => {
    if (!isValidPolygon()) {
      setError('Sum of interior angles must be (n−2)×180°');
      setVertices([]);
      return;
    }

    setError(null);
    const points = [];
    let x = 0,
      y = 0;
    let direction = 0;

    points.push({ x, y });

    for (let i = 0; i < sides; i++) {
      const length = lengths[i];
      const interiorAngle = angles[i];
      const turningAngle = 180 - interiorAngle;
      direction += (turningAngle * Math.PI) / 180;

      x += length * Math.cos(direction);
      y += length * Math.sin(direction);

      points.push({ x, y });
    }

    // Center and scale
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    const width = maxX - minX;
    const height = maxY - minY;

    const scale = Math.min(
      (canvasSize - 60) / (width || 1),
      (canvasSize - 60) / (height || 1)
    );
    const offsetX = centerX - (minX + width / 2) * scale;
    const offsetY = centerY - (minY + height / 2) * scale;

    const centeredPoints = points.map(p => ({
      x: offsetX + p.x * scale,
      y: offsetY + p.y * scale,
    }));

    setVertices(centeredPoints);
  };

  useEffect(() => {
    drawPolygon();
  }, [lengths, angles, sides]);

  const updateLength = (index: number, value: string) => {
    const num = parseFloat(value) || 0;
    const newLengths = [...lengths];
    newLengths[index] = num;
    setLengths(newLengths);
  };

  const updateAngle = (index: number, value: string) => {
    const num = parseFloat(value) || 0;
    const newAngles = [...angles];
    newAngles[index] = num;
    setAngles(newAngles);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || vertices.length === 0) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    if (error) return;

    // Draw polygon
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#3b82f620';
    ctx.fill();

    // Draw vertices
    vertices.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(v.x, v.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#4f46e5';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ✅ Label vertex number (clear black text)
      ctx.fillStyle = '#000'; // ✅ Black
      ctx.font = '14px Arial, sans-serif'; // ✅ Larger, readable font
      ctx.fillText(`${i + 1}`, v.x + 10, v.y - 10);
    });

    // ✅ Draw side lengths on midpoints
    for (let i = 0; i < vertices.length - 1; i++) {
      const midX = (vertices[i].x + vertices[i + 1].x) / 2;
      const midY = (vertices[i].y + vertices[i + 1].y) / 2;

      ctx.fillStyle = '#000'; // ✅ Black
      ctx.font = '13px Arial, sans-serif';
      ctx.fillText(`${lengths[i]}`, midX + 8, midY - 8);
    }
  };

  useEffect(() => {
    draw();
  }, [vertices, error]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg font-sans">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Polygon Builder from Angles & Sides
      </h2>
      <p className="text-sm text-gray-800 mb-6">
        Enter side lengths and interior angles to build a polygon. Watch it
        close — or fail to close!
      </p>

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Number of Sides
          </label>
          <input
            type="number"
            min="3"
            max="10"
            value={sides}
            onChange={e => setSides(Number(e.target.value))}
            className="px-3 py-2 border text-black border-gray-400 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="text-sm text-gray-600">
          Tip: Sum of angles must be{' '}
          <strong>
            ({sides - 2}×180 = {(sides - 2) * 180}°)
          </strong>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 text-sm rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="border border-gray-300 px-3 py-2">Side</th>
              {lengths.map((_, i) => (
                <th key={i} className="border border-gray-300 px-3 py-2">
                  Side {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800">
                Length
              </td>
              {lengths.map((len, i) => (
                <td key={i} className="border border-gray-300 px-3 py-2">
                  <input
                    type="number"
                    value={len}
                    onChange={e => updateLength(i, e.target.value)}
                    className="w-16 px-2 py-1 border text-black border-gray-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800">
                Interior Angle
              </td>
              {angles.map((angle, i) => (
                <td key={i} className="border border-gray-300 px-3 py-2">
                  <input
                    type="number"
                    value={angle}
                    onChange={e => updateAngle(i, e.target.value)}
                    className="w-16 px-2 py-1 border text-black border-gray-400 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="deg"
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="border border-gray-400 rounded-lg bg-gray-50 shadow-sm"
        />
        <div className="bg-gray-50 p-5 rounded-lg min-w-64 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">
            Rules to Remember
          </h3>
          <ul className="space-y-2 text-sm text-gray-800">
            <li>
              • Sum of interior angles = <strong>({sides}−2)×180°</strong>
            </li>
            <li>• Must close to form a polygon</li>
            <li>• Try: 60°,60°,60° → equilateral triangle</li>
            <li>• Try: 90°,90°,90°,90° → rectangle</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
