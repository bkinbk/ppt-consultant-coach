export type QuizSpec = {
  question: string;
  choices: string[];
  correctIdx: number;
  explanation: string;
};

export type TipSpec = {
  slug: string;
  title: string;
  category: TipCategory;
  summary: string;
  body: string;
  doList: string[];
  dontList: string[];
  colorNote?: string;
  quiz: QuizSpec[];
};

export type TipCategory =
  | "storyline"
  | "layout"
  | "color"
  | "typography"
  | "charts"
  | "mechanics";

export const TIP_CATEGORY_LABEL: Record<TipCategory, string> = {
  storyline: "โครงเรื่อง & Storyline",
  layout: "การจัด Layout",
  color: "การใช้สี",
  typography: "ตัวอักษร & Typography",
  charts: "กราฟ & ข้อมูล",
  mechanics: "กลไกของเดค (Deck Mechanics)",
};

export type LayoutBoxKind =
  | "title"
  | "box"
  | "accent"
  | "chart"
  | "text"
  | "arrow"
  | "line"
  | "dot";

export type LayoutBox = {
  x: number; // 0-100
  y: number; // 0-56.25 (16:9 canvas)
  w: number;
  h: number;
  label?: string;
  kind: LayoutBoxKind;
  sub?: string;
};

export type TemplateSpec = {
  slug: string;
  name: string;
  dataType: string;
  whenToUse: string;
  layoutDesc: string;
  layoutSpec: LayoutBox[];
  doList: string[];
  dontList: string[];
  colorAdvice: string;
  quiz: QuizSpec[];
};
