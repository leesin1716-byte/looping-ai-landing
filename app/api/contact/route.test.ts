// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the side-effecting modules; rate-limit stays real (it's pure in-memory).
vi.mock("@/src/lib/db", () => ({
  saveInquiry: vi.fn(),
  recentInquiryCount: vi.fn(),
}));
vi.mock("@/src/lib/email", () => ({
  sendInquiryEmail: vi.fn(),
}));

import { POST } from "@/app/api/contact/route";
import { saveInquiry, recentInquiryCount } from "@/src/lib/db";
import { sendInquiryEmail } from "@/src/lib/email";

const mSave = vi.mocked(saveInquiry);
const mCount = vi.mocked(recentInquiryCount);
const mEmail = vi.mocked(sendInquiryEmail);

const valid = {
  name: "홍길동",
  email: "a@b.com",
  projectType: "랜딩페이지",
  message: "안녕하세요, 문의드립니다. 테스트 메시지입니다.",
};

function post(body: unknown, headers: Record<string, string> = {}) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  mCount.mockResolvedValue(null); // no DB-backed count by default
  mSave.mockResolvedValue(true);
  mEmail.mockResolvedValue(true);
});

describe("POST /api/contact", () => {
  it("rejects malformed JSON with 400", async () => {
    const res = await post("{not valid json");
    expect(res.status).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });

  it("rejects an incomplete form with 422 and does not persist", async () => {
    const res = await post({ name: "", email: "", projectType: "", message: "" });
    expect(res.status).toBe(422);
    expect(mSave).not.toHaveBeenCalled();
    expect(mEmail).not.toHaveBeenCalled();
  });

  it("silently accepts a honeypot hit without persisting", async () => {
    const res = await post({ ...valid, company: "spam-bot-filled-this" });
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(mSave).not.toHaveBeenCalled();
    expect(mEmail).not.toHaveBeenCalled();
  });

  it("silently drops an instant (sub-2s) submit as a bot", async () => {
    const res = await post({ ...valid, t: Date.now() });
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(mSave).not.toHaveBeenCalled();
  });

  it("persists and emails a valid submission", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(mSave).toHaveBeenCalledTimes(1);
    expect(mEmail).toHaveBeenCalledTimes(1);
  });

  it("still succeeds via email when the DB is unavailable", async () => {
    mSave.mockResolvedValue(false);
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("returns 503 when neither DB nor email is configured", async () => {
    mSave.mockResolvedValue(false);
    mEmail.mockResolvedValue(false);
    const res = await post(valid);
    expect(res.status).toBe(503);
  });

  it("rate-limits a flood from one IP (4th request within a minute → 429)", async () => {
    const ip = { "x-forwarded-for": "203.0.113.241" }; // IP unique to this test
    const codes: number[] = [];
    for (let i = 0; i < 4; i++) codes.push((await post(valid, ip)).status);
    expect(codes.slice(0, 3)).toEqual([200, 200, 200]);
    expect(codes[3]).toBe(429);
  });
});
