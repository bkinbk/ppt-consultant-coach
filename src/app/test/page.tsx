import { getTipQuizPool, getCategoryProficiency } from "@/lib/data";
import { TestRunner } from "@/components/TestRunner";
import { RadarChart } from "@/components/RadarChart";
import { PageHeaderBlob } from "@/components/PageHeaderBlob";

export const dynamic = "force-dynamic";

export default async function TestPage() {
  const [pool, proficiency] = await Promise.all([getTipQuizPool(), getCategoryProficiency()]);

  const totalAttempts = proficiency.reduce((sum, p) => sum + p.total, 0);

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="relative">
        <PageHeaderBlob />
        <h1 className="text-3xl font-bold tracking-tight mb-1">บททดสอบ</h1>
        <p className="text-muted text-sm">
          สุ่ม 5 ข้อจากทุกหมวด ตอบให้ครบเพื่ออัปเดตกราฟความชำนาญของคุณด้านล่าง
        </p>
      </div>

      <TestRunner pool={pool} count={5} />

      <section>
        <h2 className="text-lg font-bold text-foreground mb-1">ความชำนาญของคุณในแต่ละหมวด</h2>
        <p className="text-sm text-muted mb-4">
          {totalAttempts > 0
            ? `คำนวณจากคำตอบสะสมทั้งหมด ${totalAttempts} ครั้ง (ทั้งจากหน้า Tips และบททดสอบ)`
            : "ยังไม่มีข้อมูล — ลองทำบททดสอบหรือควิซในหน้า Tips ก่อน"}
        </p>
        <div className="rounded-2xl bg-surface border border-border p-6">
          <RadarChart data={proficiency.map((p) => ({ label: p.label, value: p.pct }))} />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {proficiency.map((p) => (
              <div key={p.category} className="text-center">
                <p className="text-sm font-bold text-foreground">
                  {p.total > 0 ? `${p.pct}%` : "—"}
                </p>
                <p className="text-xs text-muted">{p.label}</p>
                <p className="text-[10px] text-muted">
                  {p.correct}/{p.total} ข้อ
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
