import { NextResponse } from "next/server";
import { getInquiryById } from "@/src/lib/db";
import { sendReplyEmail } from "@/src/lib/email";

export const runtime = "nodejs";

/**
 * Sends a reply to an inquirer. Protected by the same Basic-auth middleware as
 * the rest of /admin (the matcher covers /admin/:path*). Expects { id, body }.
 */
export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  const r = (raw ?? {}) as Record<string, unknown>;
  const id = Number(r.id);
  const body = typeof r.body === "string" ? r.body.trim() : "";

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "잘못된 문의 ID입니다." }, { status: 400 });
  }
  if (!body) {
    return NextResponse.json({ ok: false, error: "답장 내용을 입력해 주세요." }, { status: 422 });
  }
  if (body.length > 10000) {
    return NextResponse.json({ ok: false, error: "답장 내용이 너무 깁니다." }, { status: 422 });
  }

  const inquiry = await getInquiryById(id);
  if (!inquiry) {
    return NextResponse.json({ ok: false, error: "문의를 찾을 수 없습니다." }, { status: 404 });
  }

  const result = await sendReplyEmail({
    to: inquiry.email,
    name: inquiry.name,
    projectType: inquiry.project_type,
    body,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
