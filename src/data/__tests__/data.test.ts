import { describe, it, expect } from "vitest";
import { services } from "@/src/data/services";
import { portfolio } from "@/src/data/portfolio";
import { stats } from "@/src/data/stats";
import { processSteps } from "@/src/data/process";
import { testimonials } from "@/src/data/testimonials";
import { packages } from "@/src/data/packages";
import { comparison } from "@/src/data/comparison";
import { guarantees } from "@/src/data/guarantees";
import { site } from "@/src/data/site";

describe("content data", () => {
  it("has the spec-required service cards", () => {
    expect(services.map((s) => s.id)).toEqual(["landing", "ai-web", "dashboard"]);
  });

  it("lists the current client projects with thumbnails (World Cup retired)", () => {
    expect(portfolio.map((p) => p.id)).toEqual([
      "happych",
      "kwpa",
      "waterclean",
      "academy",
    ]);
    // the retired World Cup dashboard must no longer be listed
    expect(
      portfolio.some((p) => p.url.includes("worldcup-korea-dashboard")),
    ).toBe(false);
    // every case study now ships a real screenshot thumbnail
    expect(portfolio.every((p) => Boolean(p.image))).toBe(true);
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

  it("has pricing packages with unique ids and exactly one highlighted", () => {
    expect(packages.length).toBeGreaterThan(0);
    expect(new Set(packages.map((p) => p.id)).size).toBe(packages.length);
    expect(packages.filter((p) => p.highlight).length).toBe(1);
    for (const p of packages) {
      expect(p.name).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.cta).toBeTruthy();
      expect(p.features.length).toBeGreaterThan(0);
    }
  });

  it("has comparison rows that fill all three columns", () => {
    expect(comparison.length).toBeGreaterThan(0);
    for (const r of comparison) {
      expect(r.feature).toBeTruthy();
      expect(r.diy).toBeTruthy();
      expect(r.agency).toBeTruthy();
      expect(r.us).toBeTruthy();
    }
  });

  it("has guarantees with icon, title and description", () => {
    expect(guarantees.length).toBeGreaterThan(0);
    for (const g of guarantees) {
      expect(g.icon).toBeTruthy();
      expect(g.title).toBeTruthy();
      expect(g.desc).toBeTruthy();
    }
  });
});
