"use client";

import { useState, useTransition } from "react";
import { submitQuizAnswer } from "@/lib/actions";

type QuizItem = {
  id: number;
  question: string;
  choices: string[];
};

type Feedback = {
  correct: boolean;
  correctIdx: number;
  explanation: string;
};

export function QuizWidget({ questions }: { questions: QuizItem[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState(0);
  const [isPending, startTransition] = useTransition();

  if (questions.length === 0) return null;

  const current = questions[index];
  const isDone = index >= questions.length;

  if (isDone) {
    return (
      <div className="rounded-lg border border-border bg-surface p-5 text-center">
        <p className="text-lg font-semibold text-brand">
          ทำควิซเสร็จแล้ว: {score}/{questions.length} ข้อ
        </p>
        <p className="text-sm text-muted mt-1">
          ระบบบันทึกผลไว้แล้ว จะเอาหัวข้อนี้กลับมาให้ทบทวนอีกครั้งตามตารางเว้นระยะ
        </p>
      </div>
    );
  }

  function handleSelect(choiceIdx: number) {
    if (feedback) return;
    setSelected(choiceIdx);
    startTransition(async () => {
      const res = await submitQuizAnswer(current.id, choiceIdx);
      setFeedback(res);
      if (res.correct) setScore((s) => s + 1);
    });
  }

  function handleNext() {
    setIndex((i) => i + 1);
    setSelected(null);
    setFeedback(null);
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="text-xs text-muted mb-2">
        คำถาม {index + 1} / {questions.length}
      </p>
      <p className="font-medium mb-4">{current.question}</p>
      <div className="flex flex-col gap-2">
        {current.choices.map((choice, i) => {
          let style = "border-border hover:border-brand hover:bg-background";
          if (feedback) {
            if (i === feedback.correctIdx) style = "border-good bg-good/10 text-good";
            else if (i === selected) style = "border-bad bg-bad/10 text-bad";
            else style = "border-border opacity-60";
          } else if (selected === i) {
            style = "border-brand bg-background";
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
            className="mt-3 px-4 py-2 rounded-md bg-brand text-brand-foreground text-sm font-medium hover:opacity-90"
          >
            {index + 1 < questions.length ? "ข้อถัดไป" : "ดูผลลัพธ์"}
          </button>
        </div>
      )}
    </div>
  );
}
