// Slight shade variation on learned cells, purely for visual texture.
const SHADES = ["bg-accent", "bg-accent/75", "bg-accent/90", "bg-accent/60", "bg-accent/85"];

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
