import Link from "next/link";
import { notFound } from "next/navigation";
import { getTipBySlug, getAllTips } from "@/lib/data";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";
import { QuizWidget } from "@/components/QuizWidget";
import { tagByCategory } from "@/lib/palette";
import { CATEGORY_ICON } from "@/components/icons";

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
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mt-3 mb-2 ${tagByCategory(
            tip.category as TipCategory
          )}`}
        >
          {(() => {
            const Icon = CATEGORY_ICON[tip.category as TipCategory];
            return <Icon className="w-3.5 h-3.5" />;
          })()}
          {TIP_CATEGORY_LABEL[tip.category as TipCategory]}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{tip.title}</h1>
        <p className="text-muted mt-2">{tip.summary}</p>
      </div>

      <div className="flex flex-col gap-3 text-[15px] leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {tip.colorNote && (
        <div className="rounded-2xl bg-surface border border-border border-l-4 border-l-accent p-5 text-sm shadow-sm">
          <p className="font-bold text-accent mb-1">คำแนะนำเรื่องสี</p>
          <p className="text-foreground">{tip.colorNote}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-surface border border-border border-l-4 border-l-good p-5 shadow-sm">
          <p className="font-bold text-good mb-2">ควรทำ</p>
          <ul className="text-sm text-foreground flex flex-col gap-2 list-disc list-inside">
            {doList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-surface border border-border border-l-4 border-l-bad p-5 shadow-sm">
          <p className="font-bold text-bad mb-2">ไม่ควรทำ</p>
          <ul className="text-sm text-foreground flex flex-col gap-2 list-disc list-inside">
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
