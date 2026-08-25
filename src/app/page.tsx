import Link from "next/link";
import { getTipOfDay, getStreakInfo, getTodayStreakLog, getReviewStats } from "@/lib/data";
import { MarkTipReadButton } from "@/components/MarkTipReadButton";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";
import { tagByCategory } from "@/lib/palette";
import { HeroIllustration } from "@/components/HeroIllustration";

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
      <section className="relative overflow-hidden rounded-2xl bg-surface border border-border shadow-sm px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            ฝึกทำ PowerPoint สไตล์ที่ปรึกษา ทีละนิด ทุกวัน
          </h1>
          <p className="text-muted mb-1">
            Streak ปัจจุบัน{" "}
            <span className="text-accent font-bold">{streak.currentStreak} วัน</span> — กลับมาฝึกทุกวันไม่ให้ลืม
          </p>
        </div>
        <HeroIllustration />
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Streak ปัจจุบัน" value={`${streak.currentStreak} วัน`} highlight />
        <StatCard label="Streak สูงสุด" value={`${streak.longestStreak} วัน`} />
        <StatCard label="วันที่ฝึกรวม" value={`${streak.totalDaysCompleted} วัน`} />
        <StatCard label="รอทบทวนวันนี้" value={`${reviewStats.due} เรื่อง`} />
      </div>

      {tip && (
        <section className="rounded-2xl bg-surface border border-border p-6 shadow-sm">
          <p
            className={`inline-block text-xs uppercase tracking-wide font-bold mb-3 px-3 py-1 rounded-full ${tagByCategory(
              tip.category as TipCategory
            )}`}
          >
            Tip ของวันนี้ · {TIP_CATEGORY_LABEL[tip.category as TipCategory]}
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-2">{tip.title}</h1>
          <p className="text-muted mb-5">{tip.summary}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              href={`/tips/${tip.slug}`}
              className="px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
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
          className="rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <p className="font-bold text-foreground mb-1">ฝึกปฏิบัติ (Practice)</p>
          <p className="text-sm text-muted">
            ลากจัด layout จริง เรียงลำดับ จับคู่ข้อมูลกับ template — ฝึกลงมือ ไม่ใช่แค่จำ
          </p>
        </Link>
        <Link
          href="/review"
          className="rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <p className="font-bold text-foreground mb-1">ทบทวนแบบเว้นระยะ (Spaced Review)</p>
          <p className="text-sm text-muted">
            {reviewStats.due > 0
              ? `มี ${reviewStats.due} เรื่องรอทบทวนวันนี้ — กลับมาย้ำความจำก่อนลืม`
              : "วันนี้ไม่มีเรื่องรอทบทวน ทำ tip หรือควิซใหม่เพื่อสร้างคิวทบทวนถัดไป"}
          </p>
        </Link>
        <Link
          href="/templates"
          className="rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <p className="font-bold text-foreground mb-1">คลัง Template จัด Layout</p>
          <p className="text-sm text-muted">ดูว่าข้อมูลแบบไหนควรใช้เลย์เอาต์ไหน พร้อมตัวอย่างจัดวางและคำแนะนำสี</p>
        </Link>
      </div>

      <Link
        href="/tips"
        className="rounded-2xl border-2 border-dashed border-border p-5 text-center text-sm text-muted hover:text-accent hover:border-accent transition-colors"
      >
        ดู Tips ทั้งหมด (จัดหมวดตามหัวข้อ) →
      </Link>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-4 text-center shadow-sm border ${
        highlight ? "bg-accent-soft border-accent/30" : "bg-surface border-border"
      }`}
    >
      <p className={`text-2xl font-extrabold ${highlight ? "text-accent" : "text-foreground"}`}>{value}</p>
      <p className="text-xs text-muted mt-1 font-medium">{label}</p>
    </div>
  );
}
