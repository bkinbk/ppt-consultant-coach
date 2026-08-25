import { TipCategory } from "@/content/types";

export const TAG_PALETTE = [
  { bg: "bg-tag1-bg", fg: "text-tag1-fg" },
  { bg: "bg-tag2-bg", fg: "text-tag2-fg" },
  { bg: "bg-tag3-bg", fg: "text-tag3-fg" },
  { bg: "bg-tag4-bg", fg: "text-tag4-fg" },
  { bg: "bg-tag5-bg", fg: "text-tag5-fg" },
  { bg: "bg-tag6-bg", fg: "text-tag6-fg" },
];

export function tagByIndex(index: number) {
  const t = TAG_PALETTE[index % TAG_PALETTE.length];
  return `${t.bg} ${t.fg}`;
}

const CATEGORY_TAG_INDEX: Record<TipCategory, number> = {
  storyline: 0,
  layout: 1,
  color: 2,
  typography: 3,
  charts: 4,
  mechanics: 5,
};

export function tagByCategory(category: TipCategory) {
  return tagByIndex(CATEGORY_TAG_INDEX[category]);
}
