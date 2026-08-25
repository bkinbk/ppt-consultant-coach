import Link from "next/link";
import { notFound } from "next/navigation";
import { getExerciseBySlug, getAllExercises } from "@/lib/data";
import { ExerciseBoard } from "@/components/ExerciseBoard";
import { ExerciseData } from "@/content/types";
import { tagByIndex } from "@/lib/palette";
import { ArrowsUpDownIcon, TargetIcon, LinkIcon } from "@/components/icons";
import type { ComponentType } from "react";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  REORDER: "เรียงลำดับ",
  POSITION: "จัดตำแหน่ง",
  MATCH: "จับคู่",
};
const TYPE_TAG_INDEX: Record<string, number> = { REORDER: 0, POSITION: 1, MATCH: 2 };
const TYPE_ICON: Record<string, ComponentType<{ className?: string }>> = {
  REORDER: ArrowsUpDownIcon,
  POSITION: TargetIcon,
  MATCH: LinkIcon,
};

export default async function ExerciseDetailPage({ params }: PageProps<"/practice/[slug]">) {
  const { slug } = await params;
  const exercise = await getExerciseBySlug(slug);
  if (!exercise) notFound();

  const data: ExerciseData = JSON.parse(exercise.data);
  const Icon = TYPE_ICON[exercise.type] ?? ArrowsUpDownIcon;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <Link href="/practice" className="text-sm text-muted hover:text-brand">
          ← กลับไปหน้าฝึกปฏิบัติ
        </Link>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mt-3 mb-2 ${tagByIndex(
            TYPE_TAG_INDEX[exercise.type] ?? 0
          )}`}
        >
          <Icon className="w-3.5 h-3.5" />
          {TYPE_LABEL[exercise.type] ?? exercise.type}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{exercise.title}</h1>
        <p className="text-muted mt-2">{exercise.instructions}</p>
      </div>

      <ExerciseBoard exerciseSlug={exercise.slug} data={data} explanation={exercise.explanation} />
    </div>
  );
}

export async function generateStaticParams() {
  const exercises = await getAllExercises();
  return exercises.map((e) => ({ slug: e.slug }));
}
