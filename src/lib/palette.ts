import { TipCategory } from "@/content/types";

export const TAG_PALETTE = [
  { bg: "bg-tag1-bg", fg: "text-tag1-fg" }, // Navy
  { bg: "bg-tag2-bg", fg: "text-tag2-fg" }, // Teal
  { bg: "bg-tag3-bg", fg: "text-tag3-fg" }, // Sand
  { bg: "bg-tag4-bg", fg: "text-tag4-fg" }, // Lilac
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
  charts: 1,
  mechanics: 3,
};

export function tagByCategory(category: TipCategory) {
  return tagByIndex(CATEGORY_TAG_INDEX[category]);
}
