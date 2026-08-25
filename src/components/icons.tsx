import type { ComponentType } from "react";
import type { TipCategory } from "@/content/types";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FlameIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 2c-1.2 3-4 4.3-4 8.2A4 4 0 0 0 12 14a4 4 0 0 0 4-3.8c0-1-.4-1.8-.8-2.5.9.9 2.3 2.7 2.3 5A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-5.5-5.5C6.5 7.5 9.8 6 12 2z" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3l2.6 5.6 6 .7-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.3l6-.7L12 3z" />
    </svg>
  );
}

export function CalendarCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function CursorClickIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6 3l4.5 15.5 2-6 6-2L6 3z" />
      <path d="M14.5 14.5L20 20" />
    </svg>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1.5" />
    </svg>
  );
}

export function PyramidIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function LayoutGridIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M3.5 10h17M10 10v10.5" />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 2-2 2 2 0 0 1 2-2h1a3 3 0 0 0 3-3 9 9 0 0 0-9-11z" />
      <circle cx="7.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TypeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 6h14M12 6v13" />
      <path d="M9 19h6" />
    </svg>
  );
}

export function BarChartIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 20V10M12 20V4M19 20v-7" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12.5l8 4.5 8-4.5" />
      <path d="M4 16.5l8 4.5 8-4.5" />
    </svg>
  );
}

export function ArrowsUpDownIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M8 3v14M8 3L4.5 6.5M8 3l3.5 3.5" />
      <path d="M16 21V7M16 21l3.5-3.5M16 21l-3.5-3.5" />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const CATEGORY_ICON: Record<TipCategory, ComponentType<IconProps>> = {
  storyline: PyramidIcon,
  layout: LayoutGridIcon,
  color: PaletteIcon,
  typography: TypeIcon,
  charts: BarChartIcon,
  mechanics: LayersIcon,
};

export function LinkIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M9 15l6-6" />
      <path d="M10.5 6.5l1-1a4 4 0 0 1 5.7 5.7l-1.2 1.2" />
      <path d="M13.5 17.5l-1 1a4 4 0 0 1-5.7-5.7l1.2-1.2" />
    </svg>
  );
}
