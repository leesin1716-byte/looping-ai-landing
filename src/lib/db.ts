import { sql } from "@vercel/postgres";
import type { ContactValues } from "@/src/lib/contact";

let ensured = false;

/**
 * Persists a contact inquiry when a Postgres connection is configured
 * (Vercel Postgres injects POSTGRES_URL). Best-effort: returns true if stored,
 * false if no DB is configured. The table is created on first use.
 */
export async function saveInquiry(v: ContactValues): Promise<boolean> {
  if (!process.env.POSTGRES_URL) return false;

  if (!ensured) {
    await sql`
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

  await sql`
    INSERT INTO inquiries (name, email, project_type, message)
    VALUES (${v.name}, ${v.email}, ${v.projectType}, ${v.message})
  `;
  return true;
}
