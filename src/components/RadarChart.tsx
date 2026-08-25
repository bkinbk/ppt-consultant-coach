export type RadarPoint = { label: string; value: number }; // value 0-100

const RINGS = [0.25, 0.5, 0.75, 1];

export function RadarChart({ data, size = 280 }: { data: RadarPoint[]; size?: number }) {
  const center = size / 2;
  const maxR = size / 2 - 46;
  const n = data.length;

  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pointFor = (i: number, frac: number): [number, number] => {
    const a = angleFor(i);
    return [center + maxR * frac * Math.cos(a), center + maxR * frac * Math.sin(a)];
  };

  const dataPoints = data.map((d, i) => pointFor(i, Math.max(0, Math.min(100, d.value)) / 100));
  const polygon = dataPoints.map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-sm mx-auto">
      {RINGS.map((r, ri) => (
        <polygon
          key={ri}
          points={data.map((_, i) => pointFor(i, r).join(",")).join(" ")}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = pointFor(i, 1);
        return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="var(--border)" strokeWidth={1} />;
      })}

      <polygon points={polygon} fill="#f97316" fillOpacity={0.3} stroke="#f97316" strokeWidth={2} />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill="#f97316" />
      ))}

      {data.map((d, i) => {
        const [lx, ly] = pointFor(i, 1.3);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            fontSize={11}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--muted)"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
