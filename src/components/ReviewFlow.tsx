"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { submitReview } from "@/lib/actions";
import { LayoutBox } from "@/content/types";
import { SlideLayoutPreview } from "@/components/SlideLayoutPreview";
import { QUALITY } from "@/lib/sm2";

export type ReviewItem = {
  cardId: number;
  itemType: "TIP" | "TEMPLATE" | "EXERCISE";
  title: string;
  detail: string;
  href: string;
  layoutSpec?: LayoutBox[];
};

const ITEM_TYPE_LABEL: Record<ReviewItem["itemType"], string> = {
  TIP: "Tip",
  TEMPLATE: "Template",
  EXERCISE: "แบบฝึกหัด",
};

export function ReviewFlow({ items }: { items: ReviewItem[] }) {
  const [queue, setQueue] = useState(items);
  const [revealed, setRevealed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [doneCount, setDoneCount] = useState(0);

  if (queue.length === 0) {
    return (
      <div className="rounded-3xl bg-surface shadow-sm p-8 text-center">
        <p className="font-semibold text-lg mb-1">
          {doneCount > 0 ? `ทบทวนครบแล้ว ${doneCount} เรื่อง 🎉` : "วันนี้ไม่มีเรื่องรอทบทวน"}
        </p>
        <p className="text-sm text-muted">
          ระบบจะเลือกเรื่องที่ใกล้ลืมที่สุดมาให้ทบทวนใหม่เป็นระยะตามผลของคุณ
        </p>
      </div>
    );
  }

  const current = queue[0];

  function rate(quality: number) {
    startTransition(async () => {
      await submitReview(current.cardId, quality);
      setQueue((q) => q.slice(1));
      setRevealed(false);
      setDoneCount((c) => c + 1);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">เหลืออีก {queue.length} เรื่อง</p>
      <div className="rounded-3xl bg-surface shadow-sm p-6">
        <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-2">
          {ITEM_TYPE_LABEL[current.itemType]}
        </p>
        <p className="text-lg font-semibold mb-4">{current.title}</p>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="px-4 py-2 rounded-md bg-brand text-brand-foreground text-sm font-medium hover:opacity-90"
          >
            ลองนึกดูก่อน แล้วกดเปิดคำตอบ
          </button>
        ) : (
          <div className="flex flex-col gap-4">
            {current.layoutSpec && <SlideLayoutPreview layoutSpec={current.layoutSpec} />}
            <p className="text-[15px] leading-relaxed">{current.detail}</p>
            <Link href={current.href} className="text-sm text-brand hover:underline w-fit">
              เปิดอ่านเต็ม →
            </Link>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              <button
                disabled={isPending}
                onClick={() => rate(QUALITY.FORGOT)}
                className="px-4 py-2 rounded-md border border-bad text-bad text-sm font-medium hover:bg-bad/10 disabled:opacity-60"
              >
                ลืมแล้ว
              </button>
              <button
                disabled={isPending}
                onClick={() => rate(QUALITY.GOOD)}
                className="px-4 py-2 rounded-md border border-brand text-brand text-sm font-medium hover:bg-background disabled:opacity-60"
              >
                จำได้
              </button>
              <button
                disabled={isPending}
                onClick={() => rate(QUALITY.EASY)}
                className="px-4 py-2 rounded-md border border-good text-good text-sm font-medium hover:bg-good/10 disabled:opacity-60"
              >
                จำได้แม่นมาก
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
