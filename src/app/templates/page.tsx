import Link from "next/link";
import { getAllTemplates } from "@/lib/data";
import { SlideLayoutPreview } from "@/components/SlideLayoutPreview";
import { LayoutBox } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const templates = await getAllTemplates();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">คลัง Template จัด Layout</h1>
        <p className="text-muted text-sm">
          ข้อมูลแต่ละประเภทเหมาะกับการจัดวางต่างกัน เลือกดูตามชนิดข้อมูลที่คุณมีอยู่ในมือ
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <Link
            key={tpl.slug}
            href={`/templates/${tpl.slug}`}
            className="rounded-lg border border-border bg-surface p-4 hover:border-brand transition-colors flex flex-col gap-3"
          >
            <SlideLayoutPreview layoutSpec={JSON.parse(tpl.layoutSpec) as LayoutBox[]} />
            <div>
              <p className="font-medium">{tpl.name}</p>
              <p className="text-sm text-muted mt-1 line-clamp-2">{tpl.dataType}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
