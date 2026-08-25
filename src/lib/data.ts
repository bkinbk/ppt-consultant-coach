import { prisma } from "./prisma";
import { bangkokDateString, bangkokDayIndex, addDaysToDateString } from "./date";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";

const TIP_CATEGORIES: TipCategory[] = ["storyline", "layout", "color", "typography", "charts", "mechanics"];

export async function getAllTips() {
  return prisma.tip.findMany({ orderBy: { order: "asc" } });
}

export async function getAllTipSummaries() {
  return prisma.tip.findMany({
    orderBy: { order: "asc" },
    select: { slug: true, title: true, summary: true, category: true },
  });
}

export async function getTipBySlug(slug: string) {
  return prisma.tip.findUnique({
    where: { slug },
    include: { quizQuestions: true },
  });
}

export async function getAllTemplates() {
  return prisma.template.findMany({ orderBy: { order: "asc" } });
}

export async function getTemplateBySlug(slug: string) {
  return prisma.template.findUnique({
    where: { slug },
    include: { quizQuestions: true },
  });
}

export async function getAllExercises() {
  return prisma.exercise.findMany({ orderBy: { order: "asc" } });
}

export async function getExerciseBySlug(slug: string) {
  return prisma.exercise.findUnique({ where: { slug } });
}

export async function getTipOfDay() {
  const tips = await getAllTips();
  if (tips.length === 0) return null;
  const idx = bangkokDayIndex() % tips.length;
  return tips[idx];
}

export async function getTodayStreakLog() {
  const today = bangkokDateString();
  return prisma.streakLog.findUnique({ where: { date: today } });
}

export async function getStreakInfo() {
  const logs = await prisma.streakLog.findMany({
    where: { completed: true },
    orderBy: { date: "desc" },
    select: { date: true },
  });
  const dates = new Set(logs.map((l) => l.date));

  const today = bangkokDateString();
  const yesterday = addDaysToDateString(today, -1);

  // Streak counts consecutive completed days ending today (or yesterday, so
  // the streak doesn't reset to 0 the moment a new day begins before today's
  // tip is marked done).
  let cursor = dates.has(today) ? today : dates.has(yesterday) ? yesterday : null;
  let current = 0;
  while (cursor && dates.has(cursor)) {
    current += 1;
    cursor = addDaysToDateString(cursor, -1);
  }

  // Longest streak across all history.
  const sorted = [...dates].sort();
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const d of sorted) {
    if (prev && addDaysToDateString(prev, 1) === d) run += 1;
    else run = 1;
    longest = Math.max(longest, run);
    prev = d;
  }

  return {
    currentStreak: current,
    longestStreak: Math.max(longest, current),
    completedToday: dates.has(today),
    totalDaysCompleted: dates.size,
  };
}

export async function getTopicsLearnedGrid() {
  const [tips, templates, exercises, reviewCards] = await Promise.all([
    prisma.tip.findMany({ orderBy: { order: "asc" }, select: { slug: true } }),
    prisma.template.findMany({ orderBy: { order: "asc" }, select: { slug: true } }),
    prisma.exercise.findMany({ orderBy: { order: "asc" }, select: { slug: true } }),
    prisma.reviewCard.findMany({ select: { itemType: true, itemSlug: true } }),
  ]);

  const learnedKeys = new Set(reviewCards.map((rc) => `${rc.itemType}:${rc.itemSlug}`));

  const cells = [
    ...tips.map((t) => learnedKeys.has(`TIP:${t.slug}`)),
    ...templates.map((t) => learnedKeys.has(`TEMPLATE:${t.slug}`)),
    ...exercises.map((e) => learnedKeys.has(`EXERCISE:${e.slug}`)),
  ];

  return {
    cells,
    learnedCount: cells.filter(Boolean).length,
    totalCount: cells.length,
  };
}

// Returns every tip quiz question, in stable order. The 5-question test is
// picked client-side (once, on mount) from this pool — picking randomly on
// the server would re-shuffle mid-test whenever Next.js re-renders the route
// after a server action (e.g. after each answer), desyncing the displayed
// question from the answer just submitted.
export async function getTipQuizPool() {
  const questions = await prisma.quizQuestion.findMany({
    where: { itemType: "TIP" },
    include: { tip: true },
    orderBy: { id: "asc" },
  });
  return questions
    .filter((q) => q.tip)
    .map((q) => ({
      id: q.id,
      question: q.question,
      choices: JSON.parse(q.choices) as string[],
      category: q.tip!.category as TipCategory,
    }));
}

export async function getCategoryProficiency() {
  const attempts = await prisma.quizAttempt.findMany({
    where: { quizQuestion: { itemType: "TIP" } },
    include: { quizQuestion: { include: { tip: true } } },
  });

  const stats: Record<TipCategory, { correct: number; total: number }> = {
    storyline: { correct: 0, total: 0 },
    layout: { correct: 0, total: 0 },
    color: { correct: 0, total: 0 },
    typography: { correct: 0, total: 0 },
    charts: { correct: 0, total: 0 },
    mechanics: { correct: 0, total: 0 },
  };

  for (const a of attempts) {
    const cat = a.quizQuestion.tip?.category as TipCategory | undefined;
    if (!cat) continue;
    stats[cat].total += 1;
    if (a.correct) stats[cat].correct += 1;
  }

  return TIP_CATEGORIES.map((category) => {
    const { correct, total } = stats[category];
    return {
      category,
      label: TIP_CATEGORY_LABEL[category],
      correct,
      total,
      pct: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  });
}
