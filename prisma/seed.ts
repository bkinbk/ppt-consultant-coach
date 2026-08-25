import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { tips } from "../src/content/tips";
import { templates } from "../src/content/templates";
import { exercises } from "../src/content/exercises";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean up in dependency order so re-running the seed is idempotent.
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.exerciseAttempt.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.reviewCard.deleteMany();
  await prisma.tip.deleteMany();
  await prisma.template.deleteMany();

  for (let i = 0; i < tips.length; i++) {
    const t = tips[i];
    const created = await prisma.tip.create({
      data: {
        slug: t.slug,
        title: t.title,
        category: t.category,
        summary: t.summary,
        body: t.body,
        doList: JSON.stringify(t.doList),
        dontList: JSON.stringify(t.dontList),
        colorNote: t.colorNote ?? null,
        order: i,
      },
    });
    for (const q of t.quiz) {
      await prisma.quizQuestion.create({
        data: {
          itemType: "TIP",
          tipId: created.id,
          question: q.question,
          choices: JSON.stringify(q.choices),
          correctIdx: q.correctIdx,
          explanation: q.explanation,
        },
      });
    }
  }

  for (let i = 0; i < templates.length; i++) {
    const tpl = templates[i];
    const created = await prisma.template.create({
      data: {
        slug: tpl.slug,
        name: tpl.name,
        dataType: tpl.dataType,
        whenToUse: tpl.whenToUse,
        layoutDesc: tpl.layoutDesc,
        layoutSpec: JSON.stringify(tpl.layoutSpec),
        doList: JSON.stringify(tpl.doList),
        dontList: JSON.stringify(tpl.dontList),
        colorAdvice: tpl.colorAdvice,
        order: i,
      },
    });
    for (const q of tpl.quiz) {
      await prisma.quizQuestion.create({
        data: {
          itemType: "TEMPLATE",
          templateId: created.id,
          question: q.question,
          choices: JSON.stringify(q.choices),
          correctIdx: q.correctIdx,
          explanation: q.explanation,
        },
      });
    }
  }

  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i];
    await prisma.exercise.create({
      data: {
        slug: ex.slug,
        type: ex.type,
        title: ex.title,
        instructions: ex.instructions,
        data: JSON.stringify(ex.data),
        explanation: ex.explanation,
        order: i,
      },
    });
  }

  console.log(
    `Seeded ${tips.length} tips, ${templates.length} templates, and ${exercises.length} exercises.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
