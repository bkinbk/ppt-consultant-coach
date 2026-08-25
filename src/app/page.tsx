import Link from "next/link";
import { getTipOfDay, getStreakInfo, getTodayStreakLog, getReviewStats } from "@/lib/data";
import { MarkTipReadButton } from "@/components/MarkTipReadButton";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [tip, streak, todayLog, reviewStats] = await Promise.all([
    getTipOfDay(),
    getStreakInfo(),
    getTodayStreakLog(),
    getReviewStats(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Streak ปัจจุบัน" value={`${streak.currentStreak} วัน`} highlight />
        <StatCard label="Streak สูงสุด" value={`${streak.longestStreak} วัน`} />
        <StatCard label="วันที่ฝึกรวม" value={`${streak.totalDaysCompleted} วัน`} />
        <StatCard label="รอทบทวนวันนี้" value={`${reviewStats.due} เรื่อง`} />
      </div>

      {tip && (
        <section className="rounded-xl border border-border bg-surface p-6">
          <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-2">
            Tip ของวันนี้ · {TIP_CATEGORY_LABEL[tip.category as TipCategory]}
          </p>
          <h1 className="text-xl font-semibold mb-2">{tip.title}</h1>
          <p className="text-muted mb-4">{tip.summary}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              href={`/tips/${tip.slug}`}
              className="px-4 py-2 rounded-md border border-brand text-brand text-sm font-medium hover:bg-background"
            >
              อ่านเต็ม + ทำควิซ
            </Link>
            <MarkTipReadButton tipSlug={tip.slug} initiallyDone={!!todayLog?.completed} />
          </div>
        </section>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/practice"
          className="rounded-xl border border-accent bg-accent-soft p-5 hover:opacity-90 transition-opacity"
        >
          <p className="font-semibold mb-1 text-accent">ฝึกปฏิบัติ (Practice)</p>
          <p className="text-sm text-muted">
            ลากจัด layout จริง เรียงลำดับ จับคู่ข้อมูลกับ template — ฝึกลงมือ ไม่ใช่แค่จำ
          </p>
        </Link>
        <Link
          href="/review"
          className="rounded-xl border border-border bg-surface p-5 hover:border-brand transition-colors"
        >
          <p className="font-semibold mb-1">ทบทวนแบบเว้นระยะ (Spaced Review)</p>
          <p className="text-sm text-muted">
            {reviewStats.due > 0
              ? `มี ${reviewStats.due} เรื่องรอทบทวนวันนี้ — กลับมาย้ำความจำก่อนลืม`
              : "วันนี้ไม่มีเรื่องรอทบทวน ทำ tip หรือควิซใหม่เพื่อสร้างคิวทบทวนถัดไป"}
          </p>
        </Link>
        <Link
          href="/templates"
          className="rounded-xl border border-border bg-surface p-5 hover:border-brand transition-colors"
        >
          <p className="font-semibold mb-1">คลัง Template จัด Layout</p>
          <p className="text-sm text-muted">
            ดูว่าข้อมูลแบบไหนควรใช้เลย์เอาต์ไหน พร้อมตัวอย่างจัดวางและคำแนะนำสี
          </p>
        </Link>
      </div>

      <Link
        href="/tips"
        className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted hover:text-foreground hover:border-brand transition-colors"
      >
        ดู Tips ทั้งหมด (จัดหมวดตามหัวข้อ) →
      </Link>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        highlight ? "border-accent bg-accent-soft" : "border-border bg-surface"
      }`}
    >
      <p className={`text-2xl font-bold ${highlight ? "text-accent" : "text-brand"}`}>{value}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}
