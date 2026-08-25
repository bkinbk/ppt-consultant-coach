import Link from "next/link";
import { getAllExercises } from "@/lib/data";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  REORDER: "เรียงลำดับ",
  POSITION: "จัดตำแหน่ง",
  MATCH: "จับคู่",
};

export default async function PracticePage() {
  const exercises = await getAllExercises();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">ฝึกปฏิบัติ (Practice)</h1>
        <p className="text-muted text-sm">
          ลงมือลากและจัดวางองค์ประกอบจริง แทนที่จะแค่จำหลักการ — ฝึกซ้ำจนมือคุ้นกับการจัด layout สไตล์ที่ปรึกษา
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {exercises.map((ex) => (
          <Link
            key={ex.slug}
            href={`/practice/${ex.slug}`}
            className="rounded-lg border border-border bg-surface p-4 hover:border-brand transition-colors"
          >
            <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-1">
              {TYPE_LABEL[ex.type] ?? ex.type}
            </p>
            <p className="font-medium mb-1">{ex.title}</p>
            <p className="text-sm text-muted line-clamp-2">{ex.instructions}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
