"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ReplyForm({
  id,
  name,
  email,
}: {
  id: number;
  name: string;
  email: string;
}) {
  const [body, setBody] = useState(
    `${name}님, 안녕하세요.\n문의 주셔서 감사합니다.\n\n`,
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function send() {
    if (!body.trim() || status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/admin/reply-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, body }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setError(data.error ?? "발송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setStatus("error");
      setError("네트워크 오류가 발생했습니다.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 rounded-2xl glass p-8 text-center">
        <p className="text-lg font-semibold text-cyan-soft">답장을 보냈어요 ✅</p>
        <p className="mt-1.5 text-sm text-ink-muted">
          <span className="text-ink">{email}</span> 으로 회신이 발송되었습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <label
        htmlFor="reply-body"
        className="mb-2 block text-sm text-ink-muted"
      >
        답장 내용
      </label>
      <textarea
        id="reply-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={10}
        className="w-full resize-y rounded-2xl glass p-4 text-sm leading-relaxed text-ink outline-none transition-colors focus:border-white/30"
        placeholder="답장 내용을 입력하세요…"
      />

      {status === "error" && (
        <p className="mt-2 text-sm text-rose-400">{error}</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-ink-faint">받는사람: {email}</span>
        <button
          type="button"
          onClick={send}
          disabled={status === "sending" || !body.trim()}
          className="rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-2 text-sm font-medium text-white transition-transform disabled:opacity-50 motion-safe:active:scale-95"
        >
          {status === "sending" ? "보내는 중…" : "답장 보내기"}
        </button>
      </div>
    </div>
  );
}
