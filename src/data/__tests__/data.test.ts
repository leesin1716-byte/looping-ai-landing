import { describe, it, expect } from "vitest";
import { services } from "@/src/data/services";
import { portfolio } from "@/src/data/portfolio";
import { stats } from "@/src/data/stats";
import { processSteps } from "@/src/data/process";
import { testimonials } from "@/src/data/testimonials";
import { site } from "@/src/data/site";

describe("content data", () => {
  it("has the spec-required service cards", () => {
    expect(services.map((s) => s.id)).toEqual(["landing", "ai-web", "dashboard"]);
  });

  it("includes the confirmed World Cup dashboard project", () => {
    expect(
      portfolio.some((p) => p.url === "https://worldcup-korea-dashboard.vercel.app/"),
    ).toBe(true);
  });

  it("has unique ids per dataset", () => {
    for (const set of [services, portfolio, stats, testimonials]) {
      const ids = set.map((x) => x.id);
      expect(new Set(ids).size).toBe(set.length);
    }
  });

  it("has three process steps numbered 1..3", () => {
    expect(processSteps.map((p) => p.step)).toEqual([1, 2, 3]);
  });

  it("exposes nav anchors that all start with #", () => {
    expect(site.nav.every((n) => n.href.startsWith("#"))).toBe(true);
  });

  it("has non-empty copy in hero", () => {
    expect(site.hero.headline.length).toBeGreaterThan(0);
    expect(site.hero.cta.length).toBeGreaterThan(0);
  });
});
