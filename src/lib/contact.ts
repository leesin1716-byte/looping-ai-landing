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
 * The single network boundary for contact submissions. Swapping Web3Forms for a
 * Next Route Handler + Resend later means editing only this function.
 */
export async function submitContact(
  v: ContactValues,
): Promise<{ ok: boolean; error?: string }> {
  if (v.company && v.company.trim()) return { ok: true }; // honeypot tripped — pretend success

  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) {
    return {
      ok: false,
      error: "폼이 아직 설정되지 않았습니다. (access key 누락)",
    };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: key,
        name: v.name,
        email: v.email,
        subject: `[Looping Ai 문의] ${v.projectType} — ${v.name}`,
        project_type: v.projectType,
        message: v.message,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success
      ? { ok: true }
      : { ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  } catch {
    return { ok: false, error: "네트워크 오류가 발생했습니다." };
  }
}
