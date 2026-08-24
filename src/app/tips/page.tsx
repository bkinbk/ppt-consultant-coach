import Link from "next/link";
import { getAllTips } from "@/lib/data";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";

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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Tips ทั้งหมด</h1>
        <p className="text-muted text-sm">{tips.length} เคล็ดลับ จัดกลุ่มตามหัวข้อการทำ PowerPoint สไตล์ที่ปรึกษา</p>
      </div>

      {categoryOrder.map((cat) => {
        const items = byCategory.get(cat);
        if (!items || items.length === 0) return null;
        return (
          <section key={cat}>
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
              {TIP_CATEGORY_LABEL[cat]}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((tip) => (
                <Link
                  key={tip.slug}
                  href={`/tips/${tip.slug}`}
                  className="rounded-lg border border-border bg-surface p-4 hover:border-brand transition-colors"
                >
                  <p className="font-medium mb-1">{tip.title}</p>
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
