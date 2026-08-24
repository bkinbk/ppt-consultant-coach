import Link from "next/link";
import { notFound } from "next/navigation";
import { getTipBySlug, getAllTips } from "@/lib/data";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";
import { QuizWidget } from "@/components/QuizWidget";

export const dynamic = "force-dynamic";

export default async function TipDetailPage({ params }: PageProps<"/tips/[slug]">) {
  const { slug } = await params;
  const tip = await getTipBySlug(slug);
  if (!tip) notFound();

  const doList: string[] = JSON.parse(tip.doList);
  const dontList: string[] = JSON.parse(tip.dontList);
  const paragraphs = tip.body.split("\n\n");

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <Link href="/tips" className="text-sm text-muted hover:text-brand">
          ← กลับไปหน้า Tips ทั้งหมด
        </Link>
        <p className="text-xs uppercase tracking-wide text-accent font-semibold mt-3 mb-1">
          {TIP_CATEGORY_LABEL[tip.category as TipCategory]}
        </p>
        <h1 className="text-2xl font-semibold">{tip.title}</h1>
        <p className="text-muted mt-2">{tip.summary}</p>
      </div>

      <div className="flex flex-col gap-3 text-[15px] leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {tip.colorNote && (
        <div className="rounded-lg border border-accent bg-accent-soft p-4 text-sm">
          <p className="font-semibold text-accent mb-1">คำแนะนำเรื่องสี</p>
          <p>{tip.colorNote}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-good/40 bg-good/5 p-4">
          <p className="font-semibold text-good mb-2">ควรทำ</p>
          <ul className="text-sm flex flex-col gap-2 list-disc list-inside">
            {doList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-bad/40 bg-bad/5 p-4">
          <p className="font-semibold text-bad mb-2">ไม่ควรทำ</p>
          <ul className="text-sm flex flex-col gap-2 list-disc list-inside">
            {dontList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {tip.quizQuestions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">ทดสอบความเข้าใจ</h2>
          <QuizWidget
            questions={tip.quizQuestions.map((q) => ({
              id: q.id,
              question: q.question,
              choices: JSON.parse(q.choices),
            }))}
          />
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const tips = await getAllTips();
  return tips.map((t) => ({ slug: t.slug }));
}
