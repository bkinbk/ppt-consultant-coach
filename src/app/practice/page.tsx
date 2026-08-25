import Link from "next/link";
import { getAllExercises } from "@/lib/data";
import { tagByIndex } from "@/lib/palette";
import { PageHeaderBlob } from "@/components/PageHeaderBlob";
import { ArrowsUpDownIcon, TargetIcon, LinkIcon } from "@/components/icons";
import type { ComponentType } from "react";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  REORDER: "เรียงลำดับ",
  POSITION: "จัดตำแหน่ง",
  MATCH: "จับคู่",
};

const TYPE_TAG_INDEX: Record<string, number> = {
  REORDER: 0,
  POSITION: 1,
  MATCH: 2,
};

const TYPE_ICON: Record<string, ComponentType<{ className?: string }>> = {
  REORDER: ArrowsUpDownIcon,
  POSITION: TargetIcon,
  MATCH: LinkIcon,
};

export default async function PracticePage() {
  const exercises = await getAllExercises();

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <PageHeaderBlob />
        <h1 className="text-3xl font-bold tracking-tight mb-1">ฝึกปฏิบัติ (Practice)</h1>
        <p className="text-muted text-sm">
          ลงมือลากและจัดวางองค์ประกอบจริง แทนที่จะแค่จำหลักการ — ฝึกซ้ำจนมือคุ้นกับการจัด layout สไตล์ที่ปรึกษา
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {exercises.map((ex) => {
          const tag = tagByIndex(TYPE_TAG_INDEX[ex.type] ?? 0);
          const Icon = TYPE_ICON[ex.type] ?? ArrowsUpDownIcon;
          return (
            <Link
              key={ex.slug}
              href={`/practice/${ex.slug}`}
              className="group rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-2 ${tag}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {TYPE_LABEL[ex.type] ?? ex.type}
              </span>
              <p className="font-bold text-foreground mb-1.5 leading-snug">{ex.title}</p>
              <p className="text-sm text-muted line-clamp-2">{ex.instructions}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
