import { Resend } from "resend";
import { site } from "@/src/data/site";
import type { ContactValues } from "@/src/lib/contact";

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );

function inquiryHtml(v: ContactValues): string {
  const name = esc(v.name);
  const email = esc(v.email);
  const type = esc(v.projectType);
  const message = esc(v.message);
  return `<!doctype html><html lang="ko"><body style="margin:0;padding:0;background:#f1f1f5;">
  <div style="background:#f1f1f5;padding:28px 16px;font-family:'Apple SD Gothic Neo','Malgun Gothic',Pretendard,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(20,20,40,0.08);">
        <tr><td style="height:6px;line-height:6px;font-size:0;background:linear-gradient(90deg,#8b5cf6,#22d3ee 55%,#d946ef);">&nbsp;</td></tr>
        <tr><td style="padding:30px 34px 4px 34px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#8b5cf6;">LOOPING AI</div>
          <h1 style="margin:10px 0 0 0;font-size:22px;line-height:1.3;color:#15151f;font-weight:800;">새 문의가 접수되었습니다 📩</h1>
          <p style="margin:8px 0 0 0;font-size:14px;color:#7a7a88;">랜딩페이지 문의 폼을 통해 새 문의가 들어왔습니다.</p>
        </td></tr>
        <tr><td style="padding:22px 34px 6px 34px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ececf1;border-radius:12px;">
            <tr>
              <td style="padding:14px 18px;border-bottom:1px solid #f0f0f4;width:32%;font-size:13px;color:#9a9aa8;">이름</td>
              <td style="padding:14px 18px;border-bottom:1px solid #f0f0f4;font-size:15px;color:#15151f;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:14px 18px;border-bottom:1px solid #f0f0f4;font-size:13px;color:#9a9aa8;">이메일</td>
              <td style="padding:14px 18px;border-bottom:1px solid #f0f0f4;font-size:15px;"><a href="mailto:${email}" style="color:#7c3aed;text-decoration:none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:14px 18px;font-size:13px;color:#9a9aa8;">프로젝트 유형</td>
              <td style="padding:14px 18px;"><span style="display:inline-block;background:#f1ecff;color:#7c3aed;border-radius:999px;padding:4px 12px;font-size:13px;font-weight:600;">${type}</span></td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:14px 34px 4px 34px;">
          <div style="font-size:13px;color:#9a9aa8;margin-bottom:8px;">내용</div>
          <div style="background:#f7f7fb;border-radius:12px;padding:18px;font-size:15px;line-height:1.7;color:#23232e;white-space:pre-wrap;">${message}</div>
        </td></tr>
        <tr><td style="padding:20px 34px 30px 34px;">
          <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(90deg,#8b5cf6,#22d3ee);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 28px;border-radius:12px;">답장하기 →</a>
        </td></tr>
        <tr><td style="padding:16px 34px;background:#fafafc;border-top:1px solid #f0f0f4;font-size:12px;color:#a6a6b4;">
          이 메일은 <strong style="color:#7a7a88;">Looping Ai</strong> 랜딩페이지 문의 폼에서 자동 발송되었습니다.
        </td></tr>
      </table>
    </td></tr></table>
  </div>
</body></html>`;
}

/**
 * Sends an inquiry notification via Resend (server-side — no CORS issues).
 * Returns true if sent, false if no API key is configured.
 */
export async function sendInquiryEmail(v: ContactValues): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "Looping Ai <onboarding@resend.dev>",
    to: site.contactEmail,
    replyTo: v.email,
    subject: `[Looping Ai 문의] ${v.projectType} — ${v.name}`,
    html: inquiryHtml(v),
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
