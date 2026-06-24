import { describe, it, expect } from "vitest";
import { validateContact, type ContactValues } from "@/src/lib/contact";

const base: ContactValues = {
  name: "홍길동",
  email: "a@b.com",
  projectType: "랜딩페이지",
  message: "안녕하세요 문의드립니다",
};

describe("validateContact", () => {
  it("passes a complete valid form", () => {
    expect(validateContact(base).ok).toBe(true);
  });

  it("rejects empty required fields", () => {
    const r = validateContact({ ...base, name: "   " });
    expect(r.ok).toBe(false);
    expect(r.errors.name).toBeTruthy();
  });

  it("rejects malformed email", () => {
    const r = validateContact({ ...base, email: "not-an-email" });
    expect(r.ok).toBe(false);
    expect(r.errors.email).toBeTruthy();
  });

  it("requires a project type", () => {
    expect(validateContact({ ...base, projectType: "" }).ok).toBe(false);
  });

  it("requires a message", () => {
    expect(validateContact({ ...base, message: "" }).ok).toBe(false);
  });
});
