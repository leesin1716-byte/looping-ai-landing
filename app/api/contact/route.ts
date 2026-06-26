import { NextResponse } from "next/server";
import { validateContact, type ContactValues } from "@/src/lib/contact";
import { saveInquiry } from "@/src/lib/db";

export const runtime = "nodejs";

const str = (v: unknown, max = 5000) =>
  typeof v === "string" ? v.slice(0, max) : "";

/**
 * Server-side contact endpoint: re-validates, drops honeypot hits, and persists
 * the inquiry to Postgres. (Email notification is sent from the client via
 * Web3Forms, whose free plan only allows client-side calls.)
 */
export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  const r = (raw ?? {}) as Record<string, unknown>;
  const v: ContactValues = {
    name: str(r.name, 200),
    email: str(r.email, 200),
    projectType: str(r.projectType, 100),
    message: str(r.message),
    company: str(r.company, 200),
  };

  // Honeypot tripped — silently accept without storing.
  if (v.company && v.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const { ok, errors } = validateContact(v);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: Object.values(errors)[0] ?? "입력값을 확인해 주세요." },
      { status: 422 },
    );
  }

  let stored = false;
  try {
    stored = await saveInquiry(v);
  } catch (e) {
    console.error("inquiry DB insert failed:", e);
  }

  if (!stored) {
    return NextResponse.json(
      { ok: false, error: "저장소가 아직 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
