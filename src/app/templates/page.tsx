import Link from "next/link";
import { getAllTemplates } from "@/lib/data";
import { SlideLayoutPreview } from "@/components/SlideLayoutPreview";
import { LayoutBox } from "@/content/types";
import { tagByIndex } from "@/lib/palette";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const templates = await getAllTemplates();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">คลัง Template จัด Layout</h1>
        <p className="text-muted text-sm">
          ข้อมูลแต่ละประเภทเหมาะกับการจัดวางต่างกัน เลือกดูตามชนิดข้อมูลที่คุณมีอยู่ในมือ
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {templates.map((tpl, i) => (
          <Link
            key={tpl.slug}
            href={`/templates/${tpl.slug}`}
            className="group rounded-3xl bg-surface shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-3 overflow-hidden"
          >
            <div className={`p-4 pb-0 ${tagByIndex(i)} rounded-t-3xl`}>
              <SlideLayoutPreview layoutSpec={JSON.parse(tpl.layoutSpec) as LayoutBox[]} />
            </div>
            <div className="px-5 pb-5">
              <p className="font-bold">{tpl.name}</p>
              <p className="text-sm text-muted mt-1 line-clamp-2">{tpl.dataType}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
