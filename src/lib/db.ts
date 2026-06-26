import { createPool } from "@vercel/postgres";
import type { ContactValues } from "@/src/lib/contact";

// Vercel's Postgres/Neon integration injects either POSTGRES_URL or DATABASE_URL
// depending on the path used — accept whichever is present.
const connectionString =
  process.env.POSTGRES_URL || process.env.DATABASE_URL || "";

let pool: ReturnType<typeof createPool> | null = null;
let ensured = false;

function getPool() {
  if (!connectionString) return null;
  if (!pool) pool = createPool({ connectionString });
  return pool;
}

/**
 * Persists a contact inquiry when a Postgres connection is configured.
 * Best-effort: returns true if stored, false if no DB is configured.
 * The table is created on first use.
 */
export async function saveInquiry(v: ContactValues): Promise<boolean> {
  const db = getPool();
  if (!db) return false;

  if (!ensured) {
    await db.sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        project_type TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    ensured = true;
  }

  await db.sql`
    INSERT INTO inquiries (name, email, project_type, message)
    VALUES (${v.name}, ${v.email}, ${v.projectType}, ${v.message})
  `;
  return true;
}
