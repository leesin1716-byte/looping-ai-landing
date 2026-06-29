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

/** Absolute base URL of the deployed site, for building admin links in emails. */
function siteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "";
}

function inquiryHtml(v: ContactValues, replyUrl?: string): string {
  const name = esc(v.name);
  const email = esc(v.email);
  const type = esc(v.projectType);
  const message = esc(v.message);

  // With a reply URL (DB id + site URL available), show a real button that
  // opens the in-app reply composer. Otherwise fall back to guidance for
  // replying via the mail client's own reply (Reply-To is set to the inquirer).
  const actionBlock = replyUrl
    ? `<tr><td style="padding:20px 34px 30px 34px;">
          <a href="${replyUrl}" style="display:inline-block;background:linear-gradient(90deg,#8b5cf6,#22d3ee);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 28px;border-radius:12px;">답장하기 →</a>
          <div style="margin-top:10px;font-size:12px;color:#a6a6b4;">버튼을 누르면 관리자 페이지에서 ${name}님에게 바로 답장을 보낼 수 있어요. (관리자 로그인 필요)</div>
        </td></tr>`
    : `<tr><td style="padding:18px 34px 30px 34px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7fb;border:1px solid #ececf1;border-radius:12px;">
            <tr><td style="padding:16px 18px;">
              <div style="font-size:13px;font-weight:700;color:#15151f;margin-bottom:6px;">답장하려면 ✉️</div>
              <div style="font-size:14px;line-height:1.65;color:#5a5a68;">
                이 메일의 <strong style="color:#7c3aed;">'답장'</strong> 버튼을 누르면 문의자
                (<a href="mailto:${email}" style="color:#7c3aed;text-decoration:none;font-weight:600;">${email}</a>)
                에게 바로 회신됩니다. 회신 주소가 자동으로 설정되어 있어요.
              </div>
            </td></tr>
          </table>
        </td></tr>`;

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
        ${actionBlock}
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
 * Returns true if sent, false if no API key is configured. When `inquiryId`
 * and a site URL are available, the email gets a working "답장하기" button
 * linking to the in-app reply composer at /admin/reply/<id>.
 */
export async function sendInquiryEmail(
  v: ContactValues,
  inquiryId?: number | null,
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const base = siteBaseUrl();
  const replyUrl =
    base && inquiryId != null ? `${base}/admin/reply/${inquiryId}` : undefined;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "Looping Ai <onboarding@resend.dev>",
    to: site.contactEmail,
    replyTo: v.email,
    subject: `[Looping Ai 문의] ${v.projectType} — ${v.name}`,
    html: inquiryHtml(v, replyUrl),
    text: `새 문의가 접수되었습니다.

이름: ${v.name}
이메일: ${v.email}
프로젝트 유형: ${v.projectType}

내용:
${v.message}${replyUrl ? `\n\n답장하기: ${replyUrl}` : ""}`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return false;
  }
  return true;
}

function replyHtml(p: { name: string; body: string }): string {
  const name = esc(p.name);
  const body = esc(p.body);
  const brand = esc(site.brand);
  return `<!doctype html><html lang="ko"><body style="margin:0;padding:0;background:#f1f1f5;">
  <div style="background:#f1f1f5;padding:28px 16px;font-family:'Apple SD Gothic Neo','Malgun Gothic',Pretendard,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(20,20,40,0.08);">
        <tr><td style="height:6px;line-height:6px;font-size:0;background:linear-gradient(90deg,#8b5cf6,#22d3ee 55%,#d946ef);">&nbsp;</td></tr>
        <tr><td style="padding:30px 34px 4px 34px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#8b5cf6;">LOOPING AI</div>
          <h1 style="margin:10px 0 0 0;font-size:21px;line-height:1.3;color:#15151f;font-weight:800;">${name}님, 문의 주셔서 감사합니다 🙌</h1>
        </td></tr>
        <tr><td style="padding:18px 34px 26px 34px;">
          <div style="font-size:15px;line-height:1.8;color:#23232e;white-space:pre-wrap;">${body}</div>
        </td></tr>
        <tr><td style="padding:16px 34px;background:#fafafc;border-top:1px solid #f0f0f4;font-size:12px;color:#a6a6b4;">
          이 메일은 <strong style="color:#7a7a88;">${brand}</strong>에서 발송되었습니다. 궁금한 점은 이 메일에 그대로 답장해 주세요.
        </td></tr>
      </table>
    </td></tr></table>
  </div>
</body></html>`;
}

/**
 * Sends a reply to an inquirer via Resend. Returns { ok: false, error } with a
 * clear message when sending isn't configured — replies go to arbitrary
 * recipients, so a verified sending domain (RESEND_FROM) is required; the free
 * default sender can only deliver to the Resend account owner.
 */
export async function sendReplyEmail(p: {
  to: string;
  name: string;
  projectType: string;
  body: string;
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { ok: false, error: "메일 발송이 설정되지 않았습니다. (RESEND_API_KEY 미설정)" };
  }

  const from = process.env.RESEND_FROM;
  if (!from) {
    return {
      ok: false,
      error:
        "답장 발송에는 인증된 발신 도메인이 필요합니다. Resend에서 도메인을 인증한 뒤 RESEND_FROM을 설정해 주세요.",
    };
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: p.to,
    replyTo: site.contactEmail,
    subject: `[${site.brand}] 문의 주신 내용에 대한 답변`,
    html: replyHtml({ name: p.name, body: p.body }),
    text: p.body,
  });

  if (error) {
    console.error("Resend reply send failed:", error);
    return { ok: false, error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
  return { ok: true };
}
