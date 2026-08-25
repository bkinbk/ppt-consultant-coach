import { prisma } from "./prisma";
import { bangkokDateString, bangkokDayIndex, addDaysToDateString } from "./date";

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

export async function getDueReviewCount() {
  return prisma.reviewCard.count({ where: { dueDate: { lte: new Date() } } });
}

export async function getDueReviewCards(limit = 10) {
  const cards = await prisma.reviewCard.findMany({
    where: { dueDate: { lte: new Date() } },
    orderBy: { dueDate: "asc" },
    take: limit,
  });

  const results = [];
  for (const card of cards) {
    if (card.itemType === "TIP") {
      const tip = await prisma.tip.findUnique({
        where: { slug: card.itemSlug },
        include: { quizQuestions: true },
      });
      if (tip) results.push({ card, tip, template: null as null, exercise: null as null });
    } else if (card.itemType === "TEMPLATE") {
      const template = await prisma.template.findUnique({
        where: { slug: card.itemSlug },
        include: { quizQuestions: true },
      });
      if (template) results.push({ card, tip: null as null, template, exercise: null as null });
    } else {
      const exercise = await prisma.exercise.findUnique({ where: { slug: card.itemSlug } });
      if (exercise) results.push({ card, tip: null as null, template: null as null, exercise });
    }
  }
  return results;
}

export async function getReviewStats() {
  const total = await prisma.reviewCard.count();
  const due = await getDueReviewCount();
  return { total, due };
}
