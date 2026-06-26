import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { validateContact, type ContactValues } from "@/src/lib/contact";
import { saveInquiry, recentInquiryCount } from "@/src/lib/db";
import { sendInquiryEmail } from "@/src/lib/email";
import { rateLimit, type RateRule } from "@/src/lib/rate-limit";

export const runtime = "nodejs";

const str = (v: unknown, max = 5000) =>
  typeof v === "string" ? v.slice(0, max) : "";

// Anti-spam tuning. Per IP: at most 3 inquiries / minute and 6 / 15 minutes.
// Generous for any real visitor, but caps prank flooding.
const RATE_RULES: RateRule[] = [
  { windowMs: 60_000, max: 3 },
  { windowMs: 15 * 60_000, max: 6 },
];
const DB_WINDOW_SEC = 15 * 60;
const DB_MAX = 6;
// A form filled out in under this many ms is a bot/script, not a person.
const MIN_FILL_MS = 2_000;

/** First client IP from proxy headers (Vercel sets x-forwarded-for). */
function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  return fwd.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "looping-ai";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/**
 * Server-side contact endpoint: re-validates, drops honeypot/timing-trap hits,
 * rate-limits by IP, then persists to Postgres and emails the notification.
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

  // Timing trap: a genuine person can't fill the form in under ~2s. Treat
  // instant submits as bots and silently accept without storing.
  const startedAt = Number(r.t);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return NextResponse.json({ ok: true });
    }
  }

  const { ok, errors } = validateContact(v);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: Object.values(errors)[0] ?? "입력값을 확인해 주세요." },
      { status: 422 },
    );
  }

  // Rate limit by IP — in-memory (per-instance, instant) plus an authoritative
  // DB count across instances. Skipped when no IP is available (e.g. local dev).
  const ip = clientIp(req);
  const ipHash = ip ? hashIp(ip) : null;
  if (ipHash) {
    const tooManyTooFast = "문의가 너무 자주 접수되고 있어요. 잠시 후 다시 시도해 주세요.";
    const mem = rateLimit(ipHash, RATE_RULES);
    if (!mem.ok) {
      return NextResponse.json(
        { ok: false, error: tooManyTooFast },
        { status: 429, headers: { "Retry-After": String(mem.retryAfterSec) } },
      );
    }
    const dbCount = await recentInquiryCount(ipHash, DB_WINDOW_SEC);
    if (dbCount !== null && dbCount >= DB_MAX) {
      return NextResponse.json(
        { ok: false, error: tooManyTooFast },
        { status: 429, headers: { "Retry-After": String(DB_WINDOW_SEC) } },
      );
    }
  }

  // Persist to DB and send the email notification — both server-side,
  // both best-effort. Succeeds if either channel works.
  let stored = false;
  try {
    stored = await saveInquiry(v, ipHash);
  } catch (e) {
    console.error("inquiry DB insert failed:", e);
  }

  let emailed = false;
  try {
    emailed = await sendInquiryEmail(v);
  } catch (e) {
    console.error("inquiry email failed:", e);
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { ok: false, error: "폼이 아직 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
