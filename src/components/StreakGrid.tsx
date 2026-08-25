type StreakDay = { date: string; completed: boolean; isToday: boolean };

// Slight shade variation on completed days, purely for visual texture —
// mirrors the varied-tile look of habit-tracker grids while staying on-brand.
const SHADES = ["bg-accent", "bg-accent/75", "bg-accent/90", "bg-accent/60", "bg-accent/85"];

export function StreakGrid({ history }: { history: StreakDay[] }) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {history.map((day, i) => (
        <div
          key={day.date}
          title={`${day.date}${day.completed ? " — ฝึกแล้ว" : ""}`}
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-[5px] ${
            day.completed ? SHADES[i % SHADES.length] : "bg-border"
          } ${day.isToday ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : ""}`}
        />
      ))}
    </div>
  );
}
