import { getDueReviewCards } from "@/lib/data";
import { ReviewFlow, ReviewItem } from "@/components/ReviewFlow";
import { LayoutBox } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const due = await getDueReviewCards(20);

  const items: ReviewItem[] = due.map(({ card, tip, template, exercise }) => {
    if (tip) {
      return {
        cardId: card.id,
        itemType: "TIP" as const,
        title: tip.title,
        detail: tip.summary,
        href: `/tips/${tip.slug}`,
      };
    }
    if (template) {
      return {
        cardId: card.id,
        itemType: "TEMPLATE" as const,
        title: template.name,
        detail: `${template.whenToUse}`,
        href: `/templates/${template.slug}`,
        layoutSpec: JSON.parse(template.layoutSpec) as LayoutBox[],
      };
    }
    return {
      cardId: card.id,
      itemType: "EXERCISE" as const,
      title: exercise!.title,
      detail: exercise!.instructions,
      href: `/practice/${exercise!.slug}`,
    };
  });

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">ทบทวนแบบเว้นระยะ</h1>
        <p className="text-muted text-sm">
          ระบบเลือกเรื่องที่คุณใกล้ลืมที่สุดมาให้ทบทวน — ลองนึกในใจก่อนเปิดคำตอบ แล้วให้คะแนนความจำตัวเองตรงๆ
          ระบบจะปรับความถี่ในการทบทวนให้เหมาะกับคุณเอง
        </p>
      </div>
      <ReviewFlow items={items} />
    </div>
  );
}
