import { describe, it, expect } from "vitest";
import { easeOutCubic } from "@/src/lib/useCountUp";

describe("easeOutCubic", () => {
  it("maps endpoints", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it("eases out (past the midpoint by t=0.5)", () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });

  it("is monotonically increasing", () => {
    expect(easeOutCubic(0.25)).toBeLessThan(easeOutCubic(0.75));
  });
});
