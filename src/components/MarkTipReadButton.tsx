"use client";

import { useState, useTransition } from "react";
import { markTipRead } from "@/lib/actions";

export function MarkTipReadButton({
  tipSlug,
  initiallyDone,
}: {
  tipSlug: string;
  initiallyDone: boolean;
}) {
  const [done, setDone] = useState(initiallyDone);
  const [isPending, startTransition] = useTransition();

  if (done) {
    return (
      <div className="px-4 py-2 rounded-md bg-good/10 text-good text-sm font-medium inline-flex items-center gap-2">
        ✓ นับ streak วันนี้แล้ว
      </div>
    );
  }

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await markTipRead(tipSlug);
          setDone(true);
        })
      }
      className="px-4 py-2 rounded-md bg-brand text-brand-foreground text-sm font-medium hover:opacity-90 disabled:opacity-60"
    >
      {isPending ? "กำลังบันทึก..." : "อ่านแล้ว เข้าใจแล้ว — นับ streak วันนี้"}
    </button>
  );
}
