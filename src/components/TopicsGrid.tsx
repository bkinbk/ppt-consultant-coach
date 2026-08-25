// Slight shade variation on learned cells, purely for visual texture.
const SHADES = ["bg-orange-500", "bg-orange-400", "bg-orange-600", "bg-orange-300", "bg-orange-500"];

export function TopicsGrid({ cells, columns = 12 }: { cells: boolean[]; columns?: number }) {
  return (
    <div
      className="grid gap-1.5 w-full"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cells.map((learned, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[4px] ${learned ? SHADES[i % SHADES.length] : "bg-border"}`}
        />
      ))}
    </div>
  );
}
