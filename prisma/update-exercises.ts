import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { exercises } from "../src/content/exercises";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  for (const ex of exercises) {
    await prisma.exercise.update({
      where: { slug: ex.slug },
      data: {
        instructions: ex.instructions,
        data: JSON.stringify(ex.data),
        explanation: ex.explanation,
      },
    });
  }
  console.log(`Updated ${exercises.length} exercises in place (no ReviewCard/QuizAttempt data touched).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
