// Builds sqlite.db from the committed migrations (./drizzle) and the seed.
// Runs before every `next build`, so each deploy gets a database that matches
// src/db/seed.ts — Hostinger overwrites the app's files on every deploy, so
// nothing written to the server at runtime survives anyway.
//
//   tsx scripts/db-setup.ts            migrate + seed
//   tsx scripts/db-setup.ts --no-seed  migrate only
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "sqlite.db");

// A database created with `drizzle-kit push` has no migration history, so the
// migrator would try to recreate its tables. Start that one fresh (it only
// holds seed data).
if (fs.existsSync(dbPath)) {
  const probe = new Database(dbPath);
  const tracked = probe
    .prepare("select 1 from sqlite_master where type = 'table' and name = '__drizzle_migrations'")
    .get();
  probe.close();
  if (!tracked) {
    for (const f of [dbPath, `${dbPath}-wal`, `${dbPath}-shm`]) fs.rmSync(f, { force: true });
    console.log("Removed untracked sqlite.db (created by db:push); rebuilding from migrations.");
  }
}

async function main() {
  // Imported after the cleanup above so the shared connection opens the new file.
  const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");
  const { db } = await import("../src/db");
  migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  console.log("Migrations applied.");

  if (!process.argv.includes("--no-seed")) {
    const { seed } = await import("../src/db/seed");
    await seed();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
