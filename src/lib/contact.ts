export type ContactValues = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  company?: string; // honeypot — should stay empty
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(v: ContactValues): {
  ok: boolean;
  errors: Partial<Record<keyof ContactValues, string>>;
} {
  const errors: Partial<Record<keyof ContactValues, string>> = {};
  if (!v.name.trim()) errors.name = "이름을 입력해 주세요.";
  if (!v.email.trim()) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL.test(v.email.trim()))
    errors.email = "이메일 형식이 올바르지 않습니다.";
  if (!v.projectType.trim()) errors.projectType = "프로젝트 유형을 선택해 주세요.";
  if (!v.message.trim()) errors.message = "내용을 입력해 주세요.";
  return { ok: Object.keys(errors).length === 0, errors };
}

/**
 * Submits a contact inquiry. Persistence and notification are independent:
 *   1) POST to our `/api/contact` route → server-side validation + Postgres.
 *   2) POST to Web3Forms from the client → email alert (Web3Forms' free plan
 *      only allows client-side calls; the access key is public by design).
 * Succeeds if either channel works.
 */
export async function submitContact(
  v: ContactValues,
): Promise<{ ok: boolean; error?: string }> {
  // Honeypot (also enforced server-side) — pretend success, send nothing.
  if (v.company && v.company.trim()) return { ok: true };

  let dbOk = false;
  let dbError = "";
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(v),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    dbOk = res.ok && !!data.ok;
    dbError = data.error ?? "";
  } catch {
    dbError = "네트워크 오류가 발생했습니다.";
  }

  let emailed = false;
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `[Looping Ai 문의] ${v.projectType} — ${v.name}`,
          from_name: "Looping Ai 랜딩",
          name: v.name,
          email: v.email,
          project_type: v.projectType,
          message: v.message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      emailed = !!data.success;
    } catch {}
  }

  if (dbOk || emailed) return { ok: true };
  return {
    ok: false,
    error: dbError || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  };
}
