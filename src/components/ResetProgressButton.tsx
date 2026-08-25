"use client";

import { useState, useTransition } from "react";
import { resetProgress } from "@/lib/actions";
import { TrashIcon } from "@/components/icons";

export function ResetProgressButton() {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  function handleClick() {
    const ok = window.confirm(
      "ล้างจำนวนหัวข้อที่เรียนและข้อมูลกราฟความชำนาญทั้งหมด? Streak รายวันจะไม่ถูกลบ การกระทำนี้ย้อนกลับไม่ได้"
    );
    if (!ok) return;
    startTransition(async () => {
      await resetProgress();
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      title="ล้างจำนวนหัวข้อที่เรียนและข้อมูล radar chart"
      className="inline-flex items-center gap-1.5 text-xs text-muted/60 hover:text-bad transition-colors disabled:opacity-50"
    >
      <TrashIcon className="w-3.5 h-3.5" />
      {done ? "ล้างข้อมูลแล้ว" : "ล้างความคืบหน้า"}
    </button>
  );
}
