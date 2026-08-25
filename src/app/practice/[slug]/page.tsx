import Link from "next/link";
import { notFound } from "next/navigation";
import { getExerciseBySlug, getAllExercises } from "@/lib/data";
import { ExerciseBoard } from "@/components/ExerciseBoard";
import { ExerciseData } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function ExerciseDetailPage({ params }: PageProps<"/practice/[slug]">) {
  const { slug } = await params;
  const exercise = await getExerciseBySlug(slug);
  if (!exercise) notFound();

  const data: ExerciseData = JSON.parse(exercise.data);

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <Link href="/practice" className="text-sm text-muted hover:text-brand">
          ← กลับไปหน้าฝึกปฏิบัติ
        </Link>
        <h1 className="text-2xl font-semibold mt-3">{exercise.title}</h1>
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
