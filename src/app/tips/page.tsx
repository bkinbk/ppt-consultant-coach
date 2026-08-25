import Link from "next/link";
import { getAllTips } from "@/lib/data";
import { TIP_CATEGORY_LABEL, TipCategory } from "@/content/types";
import { tagByCategory } from "@/lib/palette";

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Tips ทั้งหมด</h1>
        <p className="text-muted text-sm">{tips.length} เคล็ดลับ จัดกลุ่มตามหัวข้อการทำ PowerPoint สไตล์ที่ปรึกษา</p>
      </div>

      {categoryOrder.map((cat) => {
        const items = byCategory.get(cat);
        if (!items || items.length === 0) return null;
        const tag = tagByCategory(cat);
        return (
          <section key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${tag}`}>
                {TIP_CATEGORY_LABEL[cat]}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((tip) => (
                <Link
                  key={tip.slug}
                  href={`/tips/${tip.slug}`}
                  className={`group rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${tag}`}
                >
                  <p className="font-bold mb-1.5 leading-snug">{tip.title}</p>
                  <p className="text-sm opacity-80 line-clamp-2">{tip.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
