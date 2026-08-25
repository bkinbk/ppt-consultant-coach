import Link from "next/link";
import Image from "next/image";
import { getTipOfDay, getAllTipSummaries, getStreakInfo, getTopicsLearnedGrid, getTodayStreakLog } from "@/lib/data";
import { TipOfDayCard } from "@/components/TipOfDayCard";
import { TopicsGrid } from "@/components/TopicsGrid";
import { ResetProgressButton } from "@/components/ResetProgressButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [tip, allTips, streak, topics, todayLog] = await Promise.all([
    getTipOfDay(),
    getAllTipSummaries(),
    getStreakInfo(),
    getTopicsLearnedGrid(),
    getTodayStreakLog(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl shadow-sm h-64 sm:h-80">
        <Image
          src="/hero-space.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="relative h-full flex flex-col justify-end px-6 sm:px-8 py-8 max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-sm">
            ฝึกทำ PowerPoint สไตล์ที่ปรึกษา ทีละนิด ทุกวัน
          </h1>
          <p className="text-white/90">
            Streak ปัจจุบัน{" "}
            <span className="text-white font-bold">{streak.currentStreak} วัน</span> — กลับมาฝึกทุกวันไม่ให้ลืม
          </p>
        </div>
      </section>

      <div className="rounded-2xl p-4 shadow-sm border bg-surface border-border flex flex-col sm:flex-row items-center gap-4">
        <div className="text-center sm:text-left shrink-0">
          <p className="text-2xl font-extrabold text-orange-500">
            {topics.learnedCount}
            <span className="text-base font-medium text-muted">/{topics.totalCount}</span>
          </p>
          <p className="text-xs text-muted mt-1 font-medium">หัวข้อที่เรียนแล้ว</p>
        </div>
        <TopicsGrid cells={topics.cells} />
      </div>

      {tip && <TipOfDayCard initialTip={tip} allTips={allTips} initiallyDone={!!todayLog?.completed} />}

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
          href="/test"
          className="rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <p className="font-bold text-foreground mb-1">บททดสอบ + Radar Chart</p>
          <p className="text-sm text-muted">สุ่ม 5 ข้อจากทุกหมวด แล้วดูกราฟความชำนาญของคุณในแต่ละหมวด</p>
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

      <div className="flex justify-center pt-2">
        <ResetProgressButton />
      </div>
    </div>
  );
}
