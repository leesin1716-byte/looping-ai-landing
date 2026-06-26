import { describe, it, expect } from "vitest";
import { rateLimit, type RateRule } from "@/src/lib/rate-limit";

const RULES: RateRule[] = [{ windowMs: 60_000, max: 3 }];

describe("rateLimit", () => {
  it("allows up to the max then blocks within the window", () => {
    const key = `k-${Math.random()}`;
    expect(rateLimit(key, RULES).ok).toBe(true);
    expect(rateLimit(key, RULES).ok).toBe(true);
    expect(rateLimit(key, RULES).ok).toBe(true);
    const blocked = rateLimit(key, RULES);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("tracks keys independently", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, RULES);
    rateLimit(a, RULES);
    rateLimit(a, RULES);
    expect(rateLimit(a, RULES).ok).toBe(false);
    // A different key is unaffected.
    expect(rateLimit(b, RULES).ok).toBe(true);
  });

  it("blocked requests do not consume further budget (window can recover)", () => {
    const key = `r-${Math.random()}`;
    const rule: RateRule[] = [{ windowMs: 30, max: 1 }];
    expect(rateLimit(key, rule).ok).toBe(true);
    expect(rateLimit(key, rule).ok).toBe(false);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(rateLimit(key, rule).ok).toBe(true);
        resolve();
      }, 45);
    });
  });

  it("enforces the tightest of multiple rules", () => {
    const key = `m-${Math.random()}`;
    const rules: RateRule[] = [
      { windowMs: 60_000, max: 5 },
      { windowMs: 1_000, max: 2 },
    ];
    expect(rateLimit(key, rules).ok).toBe(true);
    expect(rateLimit(key, rules).ok).toBe(true);
    // Third within 1s trips the tight short-window rule.
    expect(rateLimit(key, rules).ok).toBe(false);
  });
});
