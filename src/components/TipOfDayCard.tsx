"use client";

import { useState } from "react";
import Link from "next/link";
import { MarkTipReadButton } from "@/components/MarkTipReadButton";
import { ShuffleIcon } from "@/components/icons";
import { tagByCategory } from "@/lib/palette";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";

export type TipSummaryData = {
  slug: string;
  title: string;
  summary: string;
  category: string;
};

export function TipOfDayCard({
  initialTip,
  allTips,
  initiallyDone,
}: {
  initialTip: TipSummaryData;
  allTips: TipSummaryData[];
  initiallyDone: boolean;
}) {
  const [tip, setTip] = useState(initialTip);

  function shuffle() {
    const others = allTips.filter((t) => t.slug !== tip.slug);
    if (others.length === 0) return;
    const next = others[Math.floor(Math.random() * others.length)];
    setTip(next);
  }

  return (
    <section className="rounded-2xl bg-surface border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-wide font-bold px-3 py-1 rounded-full ${tagByCategory(
            tip.category as TipCategory
          )}`}
        >
          Tip ของวันนี้ · {TIP_CATEGORY_LABEL[tip.category as TipCategory]}
        </span>
        <button
          onClick={shuffle}
          title="สุ่มหัวข้ออื่น"
          aria-label="สุ่มหัวข้ออื่น"
          className="shrink-0 p-2 rounded-full text-muted hover:text-accent hover:bg-accent-soft transition-colors"
        >
          <ShuffleIcon className="w-4 h-4" />
        </button>
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">{tip.title}</h1>
      <p className="text-muted mb-5">{tip.summary}</p>
      <div className="flex flex-wrap gap-3 items-center">
        <Link
          href={`/tips/${tip.slug}`}
          className="px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          อ่านเต็ม + ทำควิซ
        </Link>
        <MarkTipReadButton tipSlug={tip.slug} initiallyDone={initiallyDone} />
      </div>
    </section>
  );
}
