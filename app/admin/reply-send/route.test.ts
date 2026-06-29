// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/src/lib/db", () => ({
  getInquiryById: vi.fn(),
}));
vi.mock("@/src/lib/email", () => ({
  sendReplyEmail: vi.fn(),
}));

import { POST } from "@/app/admin/reply-send/route";
import { getInquiryById } from "@/src/lib/db";
import { sendReplyEmail } from "@/src/lib/email";

const mGet = vi.mocked(getInquiryById);
const mSend = vi.mocked(sendReplyEmail);

const inquiry = {
  id: 7,
  name: "홍길동",
  email: "a@b.com",
  project_type: "랜딩페이지",
  message: "문의합니다",
  created_at: "2026-06-29T00:00:00Z",
};

function post(body: unknown) {
  return POST(
    new Request("http://localhost/admin/reply-send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  mGet.mockResolvedValue(inquiry);
  mSend.mockResolvedValue({ ok: true });
});

describe("POST /admin/reply-send", () => {
  it("rejects malformed JSON with 400", async () => {
    const res = await post("{nope");
    expect(res.status).toBe(400);
  });

  it("rejects a missing/invalid id with 400", async () => {
    const res = await post({ id: 0, body: "hi" });
    expect(res.status).toBe(400);
    expect(mSend).not.toHaveBeenCalled();
  });

  it("rejects an empty body with 422", async () => {
    const res = await post({ id: 7, body: "   " });
    expect(res.status).toBe(422);
    expect(mSend).not.toHaveBeenCalled();
  });

  it("returns 404 when the inquiry does not exist", async () => {
    mGet.mockResolvedValue(null);
    const res = await post({ id: 7, body: "답변입니다" });
    expect(res.status).toBe(404);
    expect(mSend).not.toHaveBeenCalled();
  });

  it("sends the reply to the inquiry's email on a valid request", async () => {
    const res = await post({ id: 7, body: "답변 드립니다" });
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(mSend).toHaveBeenCalledTimes(1);
    expect(mSend.mock.calls[0][0]).toMatchObject({
      to: "a@b.com",
      body: "답변 드립니다",
    });
  });

  it("surfaces a 502 when sending isn't configured", async () => {
    mSend.mockResolvedValue({ ok: false, error: "RESEND_FROM 필요" });
    const res = await post({ id: 7, body: "답변" });
    expect(res.status).toBe(502);
    expect((await res.json()).error).toContain("RESEND_FROM");
  });
});
