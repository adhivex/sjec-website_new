import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import * as schema from "./schema";

// A single shared SQLite connection, reused across hot-reloads in dev.
declare global {
  var __sqlite: Database.Database | undefined;
}

const dbPath = path.join(process.cwd(), "sqlite.db");

const sqlite = globalThis.__sqlite ?? new Database(dbPath);
if (process.env.NODE_ENV !== "production") {
  globalThis.__sqlite = sqlite;
}

sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
