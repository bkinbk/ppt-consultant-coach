import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "@libsql/client";

const MIGRATIONS_DIR = path.join(__dirname, "migrations");

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    throw new Error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env first.");
  }

  const client = createClient({ url, authToken });

  await client.execute(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" TEXT PRIMARY KEY NOT NULL,
      "checksum" TEXT NOT NULL,
      "finished_at" DATETIME,
      "migration_name" TEXT NOT NULL,
      "logs" TEXT,
      "rolled_back_at" DATETIME,
      "started_at" DATETIME NOT NULL DEFAULT current_timestamp,
      "applied_steps_count" INTEGER UNSIGNED NOT NULL DEFAULT 0
    )
  `);

  const applied = await client.execute(
    `SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL`
  );
  const appliedNames = new Set(applied.rows.map((r) => r.migration_name as string));

  const folders = fs
    .readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const name of folders) {
    if (appliedNames.has(name)) {
      console.log(`skip (already applied): ${name}`);
      continue;
    }

    const sqlPath = path.join(MIGRATIONS_DIR, name, "migration.sql");
    const sql = fs.readFileSync(sqlPath, "utf-8");
    const statements = sql
      .split(";")
      .map((chunk) =>
        chunk
          .split("\n")
          .filter((line) => !line.trim().startsWith("--"))
          .join("\n")
          .trim()
      )
      .filter((s) => s.length > 0);

    console.log(`applying: ${name} (${statements.length} statements)`);
    for (const stmt of statements) {
      await client.execute(stmt);
    }

    const checksum = crypto.createHash("sha256").update(sql).digest("hex");
    await client.execute({
      sql: `INSERT INTO "_prisma_migrations"
              ("id", "checksum", "finished_at", "migration_name", "started_at", "applied_steps_count")
            VALUES (?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP, ?)`,
      args: [crypto.randomUUID(), checksum, name, statements.length],
    });
    console.log(`done: ${name}`);
  }

  console.log("Turso schema is up to date.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
