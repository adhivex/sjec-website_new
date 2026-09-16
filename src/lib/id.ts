import { randomBytes } from "crypto";

/** Short, collision-safe id for SQLite text primary keys. */
export function createId(): string {
  return randomBytes(12).toString("base64url");
}
