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
 * The single network boundary for contact submissions. Posts to our own
 * Route Handler (`/api/contact`), which re-validates server-side and forwards
 * to the email provider using a server-only key.
 */
export async function submitContact(
  v: ContactValues,
): Promise<{ ok: boolean; error?: string }> {
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
    if (res.ok && data.ok) return { ok: true };
    return {
      ok: false,
      error: data.error ?? "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    };
  } catch {
    return { ok: false, error: "네트워크 오류가 발생했습니다." };
  }
}
