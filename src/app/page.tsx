import Link from "next/link";
import { getTipOfDay, getStreakInfo, getTodayStreakLog, getReviewStats } from "@/lib/data";
import { MarkTipReadButton } from "@/components/MarkTipReadButton";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";
import { tagByCategory, tagByIndex } from "@/lib/palette";

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
        <StatCard label="Streak ปัจจุบัน" value={`${streak.currentStreak} วัน`} tagIndex={4} />
        <StatCard label="Streak สูงสุด" value={`${streak.longestStreak} วัน`} tagIndex={1} />
        <StatCard label="วันที่ฝึกรวม" value={`${streak.totalDaysCompleted} วัน`} tagIndex={0} />
        <StatCard label="รอทบทวนวันนี้" value={`${reviewStats.due} เรื่อง`} tagIndex={3} />
      </div>

      {tip && (
        <section className={`rounded-3xl p-6 shadow-sm ${tagByCategory(tip.category as TipCategory)}`}>
          <p className="text-xs uppercase tracking-wide font-bold mb-2 opacity-70">
            Tip ของวันนี้ · {TIP_CATEGORY_LABEL[tip.category as TipCategory]}
          </p>
          <h1 className="text-2xl font-bold mb-2">{tip.title}</h1>
          <p className="opacity-80 mb-5">{tip.summary}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              href={`/tips/${tip.slug}`}
              className="px-4 py-2 rounded-full bg-surface text-foreground text-sm font-semibold shadow-sm hover:shadow-md transition-shadow"
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
          className={`rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${tagByIndex(1)}`}
        >
          <p className="font-bold mb-1">ฝึกปฏิบัติ (Practice)</p>
          <p className="text-sm opacity-80">
            ลากจัด layout จริง เรียงลำดับ จับคู่ข้อมูลกับ template — ฝึกลงมือ ไม่ใช่แค่จำ
          </p>
        </Link>
        <Link
          href="/review"
          className={`rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${tagByIndex(2)}`}
        >
          <p className="font-bold mb-1">ทบทวนแบบเว้นระยะ (Spaced Review)</p>
          <p className="text-sm opacity-80">
            {reviewStats.due > 0
              ? `มี ${reviewStats.due} เรื่องรอทบทวนวันนี้ — กลับมาย้ำความจำก่อนลืม`
              : "วันนี้ไม่มีเรื่องรอทบทวน ทำ tip หรือควิซใหม่เพื่อสร้างคิวทบทวนถัดไป"}
          </p>
        </Link>
        <Link
          href="/templates"
          className={`rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${tagByIndex(5)}`}
        >
          <p className="font-bold mb-1">คลัง Template จัด Layout</p>
          <p className="text-sm opacity-80">ดูว่าข้อมูลแบบไหนควรใช้เลย์เอาต์ไหน พร้อมตัวอย่างจัดวางและคำแนะนำสี</p>
        </Link>
      </div>

      <Link
        href="/tips"
        className="rounded-3xl border-2 border-dashed border-border p-5 text-center text-sm text-muted hover:text-foreground hover:border-brand transition-colors"
      >
        ดู Tips ทั้งหมด (จัดหมวดตามหัวข้อ) →
      </Link>
    </div>
  );
}

function StatCard({ label, value, tagIndex }: { label: string; value: string; tagIndex: number }) {
  return (
    <div className={`rounded-3xl p-4 text-center shadow-sm ${tagByIndex(tagIndex)}`}>
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-xs opacity-70 mt-1 font-medium">{label}</p>
    </div>
  );
}
