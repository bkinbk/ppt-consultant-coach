"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitQuizAnswer } from "@/lib/actions";
import { tagByCategory } from "@/lib/palette";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";

type TestQuestion = {
  id: number;
  question: string;
  choices: string[];
  category: TipCategory;
};

type Feedback = { correct: boolean; correctIdx: number; explanation: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TestRunner({ pool, count = 5 }: { pool: TestQuestion[]; count?: number }) {
  const router = useRouter();
  // Picked once on mount so a mid-test server re-render (e.g. after a server
  // action revalidates this route) can't reshuffle the in-progress test.
  const [questions] = useState(() => shuffle(pool).slice(0, count));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [results, setResults] = useState<{ category: TipCategory; correct: boolean }[]>([]);
  const [isPending, startTransition] = useTransition();

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl bg-surface border border-border p-6 text-center text-sm text-muted">
        ยังไม่มีคำถามให้ทดสอบตอนนี้ — ลองอ่าน Tips สักหมวดก่อน แล้วกลับมาใหม่
      </div>
    );
  }

  const current = questions[index];
  const isDone = index >= questions.length;

  if (isDone) {
    const score = results.filter((r) => r.correct).length;
    const byCategory = new Map<TipCategory, { correct: number; total: number }>();
    for (const r of results) {
      const e = byCategory.get(r.category) ?? { correct: 0, total: 0 };
      e.total += 1;
      if (r.correct) e.correct += 1;
      byCategory.set(r.category, e);
    }
    return (
      <div className="rounded-2xl bg-surface border border-border p-6">
        <p className="text-lg font-bold text-foreground mb-1">
          ทำบททดสอบเสร็จแล้ว: {score}/{questions.length} ข้อ
        </p>
        <p className="text-sm text-muted mb-4">
          ผลของรอบนี้ถูกบันทึกรวมเข้ากับสถิติความชำนาญของคุณด้านล่างแล้ว
        </p>
        <div className="flex flex-wrap gap-2">
          {[...byCategory.entries()].map(([cat, e]) => (
            <span
              key={cat}
              className={`text-xs font-bold px-3 py-1 rounded-full ${tagByCategory(cat)}`}
            >
              {TIP_CATEGORY_LABEL[cat]}: {e.correct}/{e.total}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function handleSelect(choiceIdx: number) {
    if (feedback) return;
    setSelected(choiceIdx);
    startTransition(async () => {
      const res = await submitQuizAnswer(current.id, choiceIdx);
      setFeedback(res);
      setResults((r) => [...r, { category: current.category, correct: res.correct }]);
    });
  }

  function handleNext() {
    const next = index + 1;
    setIndex(next);
    setSelected(null);
    setFeedback(null);
    if (next >= questions.length) router.refresh();
  }

  return (
    <div className="rounded-2xl bg-surface border border-border p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted">
          ข้อ {index + 1} / {questions.length}
        </p>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagByCategory(current.category)}`}>
          {TIP_CATEGORY_LABEL[current.category]}
        </span>
      </div>
      <p className="font-medium text-foreground mb-4">{current.question}</p>
      <div className="flex flex-col gap-2">
        {current.choices.map((choice, i) => {
          let style = "border-border hover:border-accent hover:bg-background";
          if (feedback) {
            if (i === feedback.correctIdx) style = "border-good bg-good/10 text-good";
            else if (i === selected) style = "border-bad bg-bad/10 text-bad";
            else style = "border-border opacity-60";
          } else if (selected === i) {
            style = "border-accent bg-background";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={!!feedback || isPending}
              className={`text-left px-4 py-2 rounded-md border transition-colors text-sm ${style}`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="mt-4 text-sm">
          <p className={feedback.correct ? "text-good font-medium" : "text-bad font-medium"}>
            {feedback.correct ? "ถูกต้อง!" : "ยังไม่ถูก"}
          </p>
          <p className="text-muted mt-1">{feedback.explanation}</p>
          <button
            onClick={handleNext}
            className="mt-3 px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold hover:opacity-90"
          >
            {index + 1 < questions.length ? "ข้อถัดไป" : "ดูผลลัพธ์"}
          </button>
        </div>
      )}
    </div>
  );
}
