import Link from "next/link";
import { notFound } from "next/navigation";
import { getTemplateBySlug, getAllTemplates } from "@/lib/data";
import { LayoutBox } from "@/content/types";
import { SlideLayoutPreview } from "@/components/SlideLayoutPreview";
import { QuizWidget } from "@/components/QuizWidget";

export const dynamic = "force-dynamic";

export default async function TemplateDetailPage({ params }: PageProps<"/templates/[slug]">) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) notFound();

  const doList: string[] = JSON.parse(template.doList);
  const dontList: string[] = JSON.parse(template.dontList);
  const layoutSpec: LayoutBox[] = JSON.parse(template.layoutSpec);

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <Link href="/templates" className="text-sm text-muted hover:text-brand">
          ← กลับไปคลัง Template
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mt-3">{template.name}</h1>
        <p className="text-muted mt-1">
          <span className="font-medium text-foreground">ใช้กับข้อมูล:</span> {template.dataType}
        </p>
      </div>

      <SlideLayoutPreview layoutSpec={layoutSpec} />

      <div>
        <p className="font-semibold mb-1">ใช้เมื่อไหร่</p>
        <p className="text-[15px] leading-relaxed">{template.whenToUse}</p>
      </div>

      <div>
        <p className="font-semibold mb-1">วิธีจัด Layout</p>
        <p className="text-[15px] leading-relaxed">{template.layoutDesc}</p>
      </div>

      <div className="rounded-3xl bg-accent-soft p-5 text-sm shadow-sm">
        <p className="font-bold text-accent mb-1">คำแนะนำเรื่องสี</p>
        <p>{template.colorAdvice}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-good/10 p-5 shadow-sm">
          <p className="font-bold text-good mb-2">ควรทำ</p>
          <ul className="text-sm flex flex-col gap-2 list-disc list-inside">
            {doList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-bad/10 p-5 shadow-sm">
          <p className="font-bold text-bad mb-2">ไม่ควรทำ</p>
          <ul className="text-sm flex flex-col gap-2 list-disc list-inside">
            {dontList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {template.quizQuestions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">ทดสอบความเข้าใจ</h2>
          <QuizWidget
            questions={template.quizQuestions.map((q) => ({
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
  const templates = await getAllTemplates();
  return templates.map((t) => ({ slug: t.slug }));
}
