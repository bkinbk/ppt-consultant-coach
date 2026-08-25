import Link from "next/link";
import { getAllTips } from "@/lib/data";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";
import { tagByCategory } from "@/lib/palette";
import { PageHeaderBlob } from "@/components/PageHeaderBlob";
import { CATEGORY_ICON } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function TipsPage() {
  const tips = await getAllTips();

  const byCategory = new Map<TipCategory, typeof tips>();
  for (const tip of tips) {
    const cat = tip.category as TipCategory;
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(tip);
  }

  const categoryOrder: TipCategory[] = ["storyline", "layout", "color", "typography", "charts", "mechanics"];

  return (
    <div className="flex flex-col gap-10">
      <div className="relative">
        <PageHeaderBlob />
        <h1 className="text-3xl font-bold tracking-tight mb-1">Tips ทั้งหมด</h1>
        <p className="text-muted text-sm">{tips.length} เคล็ดลับ จัดกลุ่มตามหัวข้อการทำ PowerPoint สไตล์ที่ปรึกษา</p>
      </div>

      {categoryOrder.map((cat) => {
        const items = byCategory.get(cat);
        if (!items || items.length === 0) return null;
        const tag = tagByCategory(cat);
        const Icon = CATEGORY_ICON[cat];
        return (
          <section key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${tag}`}>
                <Icon className="w-3.5 h-3.5" />
                {TIP_CATEGORY_LABEL[cat]}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((tip) => (
                <Link
                  key={tip.slug}
                  href={`/tips/${tip.slug}`}
                  className="group rounded-2xl bg-surface border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <p className="font-bold text-foreground mb-1.5 leading-snug">{tip.title}</p>
                  <p className="text-sm text-muted line-clamp-2">{tip.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
