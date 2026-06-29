// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the Resend SDK so no network call happens; sendMock stands in for
// resend.emails.send. vi.hoisted keeps the ref usable inside the hoisted mock.
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send: sendMock } };
  }),
}));

import { sendReplyEmail } from "@/src/lib/email";

const reply = {
  to: "a@b.com",
  name: "홍길동",
  projectType: "랜딩페이지",
  body: "안녕하세요, 답변드립니다.",
};

beforeEach(() => {
  vi.clearAllMocks();
  sendMock.mockResolvedValue({ error: null });
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_FROM;
});

describe("sendReplyEmail", () => {
  it("fails clearly when no API key is configured", async () => {
    const r = await sendReplyEmail(reply);
    expect(r.ok).toBe(false);
    expect(r.error).toContain("RESEND_API_KEY");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("fails clearly when no verified sender domain (RESEND_FROM) is set", async () => {
    process.env.RESEND_API_KEY = "key";
    const r = await sendReplyEmail(reply);
    expect(r.ok).toBe(false);
    expect(r.error).toContain("RESEND_FROM");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends to the inquirer with Reply-To set to the brand inbox", async () => {
    process.env.RESEND_API_KEY = "key";
    process.env.RESEND_FROM = "Looping Ai <hello@looping.ai>";
    const r = await sendReplyEmail(reply);
    expect(r.ok).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const arg = sendMock.mock.calls[0][0];
    expect(arg.to).toBe("a@b.com");
    expect(arg.from).toBe("Looping Ai <hello@looping.ai>");
    expect(arg.replyTo).toBe("wchhistory@naver.com");
  });

  it("returns an error when Resend reports a send failure", async () => {
    process.env.RESEND_API_KEY = "key";
    process.env.RESEND_FROM = "Looping Ai <hello@looping.ai>";
    sendMock.mockResolvedValue({ error: { message: "boom" } });
    const r = await sendReplyEmail(reply);
    expect(r.ok).toBe(false);
  });
});
