import { LayoutBox } from "@/content/types";

const CANVAS_H = 56.25; // 16:9 canvas in the same units as x/w (0-100)

function pctH(v: number) {
  return (v / CANVAS_H) * 100;
}

function boxClass(kind: LayoutBox["kind"]) {
  switch (kind) {
    case "title":
      return "bg-brand text-brand-foreground font-semibold rounded-md flex items-center justify-center text-center px-2";
    case "accent":
      return "bg-accent-soft border-2 border-accent text-foreground font-medium rounded-md flex items-center justify-center text-center px-2 whitespace-pre-line";
    case "box":
      return "bg-surface border border-border text-foreground rounded-md flex items-center justify-center text-center px-2 whitespace-pre-line";
    case "chart":
      return "bg-background border border-dashed border-muted text-muted rounded-md flex items-center justify-center text-center px-2";
    case "text":
      return "text-muted flex items-center justify-center text-center px-1";
    case "arrow":
      return "text-muted flex items-center justify-center text-xl";
    case "line":
      return "bg-border rounded-full";
    case "dot":
      return "bg-accent rounded-full";
    default:
      return "";
  }
}

export function SlideLayoutPreview({ layoutSpec }: { layoutSpec: LayoutBox[] }) {
  return (
    <div className="w-full aspect-video bg-background border border-border rounded-lg relative overflow-hidden shadow-sm">
      {layoutSpec.map((box, i) => (
        <div
          key={i}
          className={`absolute text-[9px] sm:text-[11px] leading-tight ${boxClass(box.kind)}`}
          style={{
            left: `${box.x}%`,
            top: `${pctH(box.y)}%`,
            width: `${box.w}%`,
            height: `${pctH(box.h)}%`,
          }}
        >
          {box.kind === "arrow" ? "→" : box.label}
        </div>
      ))}
    </div>
  );
}
