"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { sm2Update, QUALITY } from "./sm2";
import { bangkokDateString } from "./date";

async function ensureReviewCard(itemType: "TIP" | "TEMPLATE" | "EXERCISE", itemSlug: string) {
  const existing = await prisma.reviewCard.findUnique({
    where: { itemType_itemSlug: { itemType, itemSlug } },
  });
  if (existing) return existing;
  return prisma.reviewCard.create({
    data: { itemType, itemSlug },
  });
}

export async function markTipRead(tipSlug: string) {
  const today = bangkokDateString();
  await prisma.streakLog.upsert({
    where: { date: today },
    update: { completed: true, tipSlug },
    create: { date: today, tipSlug, completed: true },
  });
  // Tracks that this tip has been engaged with, for the topics-learned grid.
  await ensureReviewCard("TIP", tipSlug);
  revalidatePath("/");
}

export async function submitQuizAnswer(quizQuestionId: number, choiceIdx: number) {
  const question = await prisma.quizQuestion.findUnique({ where: { id: quizQuestionId } });
  if (!question) throw new Error("Quiz question not found");

  const correct = question.correctIdx === choiceIdx;

  await prisma.quizAttempt.create({
    data: { quizQuestionId, correct },
  });

  const itemType = question.itemType;
  let itemSlug: string | null = null;
  if (itemType === "TIP" && question.tipId) {
    const tip = await prisma.tip.findUnique({ where: { id: question.tipId } });
    itemSlug = tip?.slug ?? null;
  } else if (itemType === "TEMPLATE" && question.templateId) {
    const template = await prisma.template.findUnique({ where: { id: question.templateId } });
    itemSlug = template?.slug ?? null;
  }

  if (itemSlug) {
    const card = await ensureReviewCard(itemType, itemSlug);
    const quality = correct ? QUALITY.GOOD : QUALITY.FORGOT;
    const updated = sm2Update(card, quality);
    await prisma.reviewCard.update({
      where: { id: card.id },
      data: {
        easeFactor: updated.easeFactor,
        intervalDays: updated.intervalDays,
        repetitions: updated.repetitions,
        dueDate: updated.dueDate,
        lastReviewedAt: new Date(),
      },
    });
  }

  revalidatePath("/test");
  revalidatePath("/");

  return { correct, correctIdx: question.correctIdx, explanation: question.explanation };
}

export async function submitExercise(exerciseSlug: string, correct: boolean) {
  const exercise = await prisma.exercise.findUnique({ where: { slug: exerciseSlug } });
  if (!exercise) throw new Error("Exercise not found");

  await prisma.exerciseAttempt.create({
    data: { exerciseId: exercise.id, correct },
  });

  const card = await ensureReviewCard("EXERCISE", exerciseSlug);
  const quality = correct ? QUALITY.GOOD : QUALITY.FORGOT;
  const updated = sm2Update(card, quality);
  await prisma.reviewCard.update({
    where: { id: card.id },
    data: {
      easeFactor: updated.easeFactor,
      intervalDays: updated.intervalDays,
      repetitions: updated.repetitions,
      dueDate: updated.dueDate,
      lastReviewedAt: new Date(),
    },
  });

  revalidatePath("/");
}

export async function resetProgress() {
  await prisma.quizAttempt.deleteMany();
  await prisma.exerciseAttempt.deleteMany();
  await prisma.reviewCard.deleteMany();
  revalidatePath("/");
  revalidatePath("/test");
}
