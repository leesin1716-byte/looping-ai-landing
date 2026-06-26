import { Resend } from "resend";
import { site } from "@/src/data/site";
import type { ContactValues } from "@/src/lib/contact";

/**
 * Sends an inquiry notification via Resend (server-side — no CORS issues).
 * Returns true if sent, false if no API key is configured.
 */
export async function sendInquiryEmail(v: ContactValues): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    // Default sender works without domain verification; set RESEND_FROM to a
    // verified-domain address (e.g. "Looping Ai <hello@yourdomain>") later.
    from: process.env.RESEND_FROM || "Looping Ai <onboarding@resend.dev>",
    to: site.contactEmail,
    replyTo: v.email,
    subject: `[Looping Ai 문의] ${v.projectType} — ${v.name}`,
    text: `새 문의가 접수되었습니다.

이름: ${v.name}
이메일: ${v.email}
프로젝트 유형: ${v.projectType}

내용:
${v.message}`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return false;
  }
  return true;
}
