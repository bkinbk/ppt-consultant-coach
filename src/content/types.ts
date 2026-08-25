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

export type ExerciseType = "REORDER" | "POSITION" | "MATCH";

export type ExerciseZone = {
  id: string;
  label: string;
  x?: number; // 0-100, only used when layout === "canvas"
  y?: number; // 0-56.25, only used when layout === "canvas"
  w?: number;
  h?: number;
  // If true, the zone's label is scenario data the learner needs to read
  // (e.g. a number to compare), not an answer hint — so it stays visible
  // even before checking. Canvas-layout zones hide their label by default
  // until checked, since the label usually names the correct answer.
  alwaysShowLabel?: boolean;
};

export type ExerciseChip = {
  id: string;
  label: string;
  correctZoneId: string;
};

export type ExerciseAxisLabel = {
  label: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
};

export type ExerciseData = {
  layout: "canvas" | "row" | "list";
  zones: ExerciseZone[];
  chips: ExerciseChip[];
  // Static, always-visible captions for canvas layouts (e.g. matrix axis
  // labels) — not drop targets, just context needed to solve the exercise.
  axisLabels?: ExerciseAxisLabel[];
};

export type ExerciseSpec = {
  slug: string;
  type: ExerciseType;
  title: string;
  instructions: string;
  data: ExerciseData;
  explanation: string;
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
