import { NextResponse } from "next/server";
import { validateContact, type ContactValues } from "@/src/lib/contact";

export const runtime = "nodejs";

const str = (v: unknown, max = 5000) =>
  typeof v === "string" ? v.slice(0, max) : "";

/**
 * Server-side contact endpoint. Re-validates input, drops honeypot hits, and
 * forwards to Web3Forms using a server-only key (WEB3FORMS_KEY) so the key is
 * never shipped to the browser.
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

  // Coerce to strings so malformed/partial payloads can't crash validation.
  const r = (raw ?? {}) as Record<string, unknown>;
  const v: ContactValues = {
    name: str(r.name, 200),
    email: str(r.email, 200),
    projectType: str(r.projectType, 100),
    message: str(r.message),
    company: str(r.company, 200),
  };

  // Honeypot tripped — silently accept without sending.
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

  const key = process.env.WEB3FORMS_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "폼이 아직 설정되지 않았습니다. (서버 키 누락)" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        name: v.name,
        email: v.email,
        subject: `[Looping Ai 문의] ${v.projectType} — ${v.name}`,
        project_type: v.projectType,
        message: v.message,
        from_name: "Looping Ai 랜딩",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (!data.success) {
      return NextResponse.json(
        { ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "네트워크 오류가 발생했습니다." },
      { status: 502 },
    );
  }
}
