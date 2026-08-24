export type Sm2State = {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
};

export type Sm2Result = Sm2State & { dueDate: Date };

/**
 * SuperMemo-2 spaced repetition update.
 * quality: 0-5 recall rating (0 = total blank, 5 = perfect recall).
 * Below 3 resets the streak of repetitions and forces a same/next-day review.
 */
export function sm2Update(state: Sm2State, quality: number): Sm2Result {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  let { easeFactor, intervalDays, repetitions } = state;

  if (q < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + intervalDays);

  return { easeFactor, intervalDays, repetitions, dueDate };
}

export const QUALITY = {
  FORGOT: 2,
  GOOD: 4,
  EASY: 5,
} as const;
