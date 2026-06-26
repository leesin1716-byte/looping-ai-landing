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

type Pool = NonNullable<ReturnType<typeof getPool>>;

async function ensureTable(db: Pool) {
  if (ensured) return;
  await db.sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      project_type TEXT NOT NULL,
      message TEXT NOT NULL,
      ip_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // Backfill the column for tables created before rate-limiting existed.
  await db.sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS ip_hash TEXT`;
  ensured = true;
}

/**
 * Persists a contact inquiry when a Postgres connection is configured.
 * Best-effort: returns true if stored, false if no DB is configured.
 * The table is created on first use. `ipHash` (a hashed client IP) is stored
 * only for abuse/rate-limit accounting — never the raw IP.
 */
export async function saveInquiry(
  v: ContactValues,
  ipHash: string | null = null,
): Promise<boolean> {
  const db = getPool();
  if (!db) return false;

  await ensureTable(db);
  await db.sql`
    INSERT INTO inquiries (name, email, project_type, message, ip_hash)
    VALUES (${v.name}, ${v.email}, ${v.projectType}, ${v.message}, ${ipHash})
  `;
  return true;
}

/**
 * Counts inquiries stored from a given hashed IP within the last `withinSec`
 * seconds. This is the authoritative, cross-instance rate-limit signal.
 * Returns null when no DB is configured or the query fails (caller falls back
 * to the in-memory limiter).
 */
export async function recentInquiryCount(
  ipHash: string,
  withinSec: number,
): Promise<number | null> {
  const db = getPool();
  if (!db || !ipHash) return null;
  try {
    await ensureTable(db);
    const { rows } = await db.sql`
      SELECT COUNT(*)::int AS n FROM inquiries
      WHERE ip_hash = ${ipHash}
        AND created_at > now() - make_interval(secs => ${withinSec})
    `;
    return (rows[0]?.n as number) ?? 0;
  } catch (e) {
    console.error("recentInquiryCount failed:", e);
    return null;
  }
}
