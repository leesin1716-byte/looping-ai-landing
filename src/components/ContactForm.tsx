"use client";
import { useState } from "react";
import {
  validateContact,
  submitContact,
  type ContactValues,
} from "@/src/lib/contact";
import { site } from "@/src/data/site";
import { cn } from "@/src/lib/cn";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import GradientBlob from "@/src/components/primitives/GradientBlob";
import Icon from "@/src/components/primitives/Icon";

const PROJECT_TYPES = ["랜딩페이지", "AI 웹사이트", "대시보드·웹앱", "기타"];
type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactValues, string>>;

const EMPTY: ContactValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
  company: "",
};

const fieldBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-ink outline-none transition placeholder:text-ink-faint focus:border-violet/60 focus:ring-2 focus:ring-violet/30";

export default function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  // When this form first rendered — sent as a timing trap (server rejects
  // submissions that arrive implausibly fast, i.e. bots).
  const [startedAt] = useState(() => Date.now());

  const update =
    (key: keyof ContactValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const val = e.target.value;
      setValues((v) => ({ ...v, [key]: val }));
      // Clear a field's error the moment the user starts correcting it.
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  // Validate one field when the user leaves it — but don't nag on a pristine
  // empty field they haven't filled yet (only if it has content or already errored).
  const onBlur = (key: keyof ContactValues) => () =>
    setErrors((prev) => {
      const filled = String(values[key] ?? "").trim();
      if (!filled && !prev[key]) return prev;
      const { errors } = validateContact(values);
      return { ...prev, [key]: errors[key] };
    });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContact(values);
    setErrors(res.errors);
    if (!res.ok) return;
    setStatus("submitting");
    setServerError("");
    const out = await submitContact(values, { t: startedAt });
    if (out.ok) {
      setStatus("success");
      setValues(EMPTY);
    } else {
      setStatus("error");
      setServerError(out.error ?? "오류가 발생했습니다.");
    }
  };

  return (
    <Section id="contact">
      <GradientBlob className="left-1/2 top-0 -translate-x-1/2 opacity-25" />
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title={
              <>
                아이디어가 있다면,
                <br />
                <span className="text-gradient">지금 시작하세요</span>
              </>
            }
            subtitle="간단히 남겨 주시면 빠르게 회신드립니다. 부담 없이 문의해 주세요."
          />
          <a
            href={`mailto:${site.contactEmail}`}
            className="flex w-fit items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <Icon name="mail" size={18} className="text-cyan" />
            {site.contactEmail}
          </a>
        </div>

        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-violet/40 via-white/5 to-cyan/30 p-px shadow-glow">
            <div className="rounded-3xl bg-surface/80 p-6 backdrop-blur-xl md:p-8">
            {status === "success" ? (
              <div
                role="status"
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan text-white">
                  <Icon name="check" size={28} />
                </span>
                <h3 className="font-display text-xl font-semibold">
                  문의가 접수되었습니다
                </h3>
                <p className="text-sm text-ink-muted">
                  빠르게 확인하고 회신드리겠습니다. 감사합니다!
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-violet-soft hover:underline"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={update("company")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <Field
                  id="name"
                  label="이름"
                  error={errors.name}
                >
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={update("name")}
                    onBlur={onBlur("name")}
                    placeholder="홍길동"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      fieldBase,
                      errors.name ? "border-magenta/70" : "border-white/10",
                    )}
                  />
                </Field>

                <Field id="email" label="이메일" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={update("email")}
                    onBlur={onBlur("email")}
                    placeholder="you@example.com"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      fieldBase,
                      errors.email ? "border-magenta/70" : "border-white/10",
                    )}
                  />
                </Field>

                <Field id="projectType" label="프로젝트 유형" error={errors.projectType}>
                  <select
                    id="projectType"
                    value={values.projectType}
                    onChange={update("projectType")}
                    onBlur={onBlur("projectType")}
                    required
                    aria-invalid={!!errors.projectType}
                    aria-describedby={
                      errors.projectType ? "projectType-error" : undefined
                    }
                    className={cn(
                      fieldBase,
                      "appearance-none bg-surface",
                      errors.projectType ? "border-magenta/70" : "border-white/10",
                    )}
                  >
                    <option value="" disabled>
                      선택해 주세요
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="message" label="내용" error={errors.message}>
                  <textarea
                    id="message"
                    value={values.message}
                    onChange={update("message")}
                    onBlur={onBlur("message")}
                    rows={4}
                    placeholder="어떤 걸 만들고 싶으신가요? 자유롭게 적어 주세요."
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(
                      fieldBase,
                      "resize-none",
                      errors.message ? "border-magenta/70" : "border-white/10",
                    )}
                  />
                </Field>

                {status === "error" && (
                  <p role="alert" className="text-sm text-magenta-soft">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet to-cyan px-7 py-3.5 font-medium text-white shadow-glow transition hover:shadow-[0_0_60px_-6px_rgba(139,92,246,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "보내는 중…" : "문의 보내기"}
                </button>

                <p className="text-center text-xs text-ink-faint">
                  남겨주신 정보는 문의 응대 목적으로만 사용됩니다.
                </p>
              </form>
            )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-ink-muted">
        {label}
      </label>
      {children}
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-xs text-magenta-soft"
        >
          {error}
        </span>
      )}
    </div>
  );
}
