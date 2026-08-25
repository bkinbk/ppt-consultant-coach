import Link from "next/link";
import type { ComponentType } from "react";
import {
  getTipOfDay,
  getAllTipSummaries,
  getStreakInfo,
  getStreakGridHistory,
  getTodayStreakLog,
  getReviewStats,
} from "@/lib/data";
import { HeroIllustration } from "@/components/HeroIllustration";
import { TipOfDayCard } from "@/components/TipOfDayCard";
import { StreakGrid } from "@/components/StreakGrid";
import { FlameIcon, StarIcon, CalendarCheckIcon, ClockIcon, CursorClickIcon, RefreshIcon, GridIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [tip, allTips, streak, streakHistory, todayLog, reviewStats] = await Promise.all([
    getTipOfDay(),
    getAllTipSummaries(),
    getStreakInfo(),
    getStreakGridHistory(25),
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

      <div className="rounded-2xl p-4 shadow-sm border bg-accent-soft border-accent/30 flex flex-col sm:flex-row items-center gap-4">
        <div className="text-center sm:text-left shrink-0">
          <FlameIcon className="w-5 h-5 mx-auto sm:mx-0 mb-1.5 text-accent" />
          <p className="text-2xl font-extrabold text-accent">{streak.currentStreak} วัน</p>
          <p className="text-xs text-muted mt-1 font-medium">Streak ปัจจุบัน</p>
        </div>
        <StreakGrid history={streakHistory} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={StarIcon} label="Streak สูงสุด" value={`${streak.longestStreak} วัน`} />
        <StatCard icon={CalendarCheckIcon} label="วันที่ฝึกรวม" value={`${streak.totalDaysCompleted} วัน`} />
        <StatCard icon={ClockIcon} label="รอทบทวนวันนี้" value={`${reviewStats.due} เรื่อง`} />
      </div>

      {tip && (
        <TipOfDayCard initialTip={tip} allTips={allTips} initiallyDone={!!todayLog?.completed} />
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/practice"
          className="rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <CursorClickIcon className="w-5 h-5 text-accent mb-2" />
          <p className="font-bold text-foreground mb-1">ฝึกปฏิบัติ (Practice)</p>
          <p className="text-sm text-muted">
            ลากจัด layout จริง เรียงลำดับ จับคู่ข้อมูลกับ template — ฝึกลงมือ ไม่ใช่แค่จำ
          </p>
        </Link>
        <Link
          href="/review"
          className="rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <RefreshIcon className="w-5 h-5 text-accent mb-2" />
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
          <GridIcon className="w-5 h-5 text-accent mb-2" />
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

function StatCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 text-center shadow-sm border ${
        highlight ? "bg-accent-soft border-accent/30" : "bg-surface border-border"
      }`}
    >
      <Icon className={`w-5 h-5 mx-auto mb-1.5 ${highlight ? "text-accent" : "text-muted"}`} />
      <p className={`text-2xl font-extrabold ${highlight ? "text-accent" : "text-foreground"}`}>{value}</p>
      <p className="text-xs text-muted mt-1 font-medium">{label}</p>
    </div>
  );
}
