# Looping Ai Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-premium, neon-accented Korean landing page for the AI vibe-coder "Looping Ai" whose single conversion goal is a contact-form submission, where the page's own visual/interaction quality doubles as the portfolio proof.

**Architecture:** Next.js 15 App Router (single route `/`) renders ~10 independent section components composed in `app/page.tsx`. All editable content (copy, numbers, portfolio, testimonials) lives in typed data files under `src/data/` so non-code edits stay in one place. Shared visual primitives (`Section`, `GradientBlob`, `MagneticButton`, `TiltCard`, `Counter`, `Marquee`) are reused across sections. Animations use Framer Motion `whileInView`; smooth scroll uses Lenis; the hero embeds a Spline scene via lazy iframe. The contact form posts to Web3Forms through a single isolated submit function so a later swap to a Next Route Handler + Resend touches one file.

**Tech Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v3.4 · Framer Motion · Lenis · Vitest (logic unit tests) · Web3Forms · deployed on Vercel.

## Global Constraints

- **Language:** Korean single-language UI. No i18n layer now, but keep all copy in `src/data/` so i18n can be added later. (spec §10)
- **Theme:** Dark only. No light-mode toggle. (spec §4, §10)
- **Background base color:** `#07070C`. (spec §4)
- **Accent colors:** electric violet `#8B5CF6`, cyan `#22D3EE`, secondary magenta `#D946EF`. (spec §4)
- **Fonts:** body/Korean = Pretendard (variable, via jsdelivr CDN); display/headline = Space Grotesk (via `next/font/google`). (spec §4, §11 — display font locked to Space Grotesk)
- **Single CTA:** every primary call-to-action points to the contact form (`#contact`). One conversion goal only. (spec §2)
- **Radius / texture:** rounded-2xl cards, glassmorphism, subtle noise grain, neon glow. (spec §4)
- **Accessibility / performance:** respect `prefers-reduced-motion` everywhere (disable blob motion, tilt, marquee, count-up, and replace the Spline iframe with a static fallback); lazy-load the Spline iframe; mobile-first responsive. (spec §6)
- **Editable content rule:** real stats numbers and testimonials are placeholders — they MUST be changeable by editing only `src/data/*` (spec §3, §9). The confirmed portfolio item is the World Cup Korea Dashboard (`https://worldcup-korea-dashboard.vercel.app/`). (spec §5.5)
- **Spline embed URL:** `https://my.spline.design/distortingtypography-HVtSRPvAe6lsZmpevIW7Ydk0/` (spec §7)
- **Form backend:** Web3Forms via env var `NEXT_PUBLIC_WEB3FORMS_KEY`; submit logic isolated for a later Resend swap. (spec §7)
- **Verification gates** for every task: `npx tsc --noEmit` passes, `npm run lint` passes, and the dev/build referenced in the task succeeds. Logic tasks additionally run Vitest.

---

## File Structure

```
loopingAi_landing/
├─ app/
│  ├─ layout.tsx              # fonts, metadata/SEO/OG, <SmoothScroll>, grain overlay
│  ├─ page.tsx                # composes all sections in order
│  └─ globals.css             # tailwind layers, base styles, grain, keyframes
├─ src/
│  ├─ components/
│  │  ├─ primitives/
│  │  │  ├─ Section.tsx       # padded, id'd section wrapper + reveal
│  │  │  ├─ GradientBlob.tsx  # animated mesh blob background
│  │  │  ├─ MagneticButton.tsx
│  │  │  ├─ TiltCard.tsx
│  │  │  ├─ Counter.tsx       # count-up number (uses useCountUp)
│  │  │  ├─ Marquee.tsx
│  │  │  └─ SmoothScroll.tsx  # Lenis provider (client)
│  │  ├─ Nav.tsx
│  │  ├─ Hero.tsx
│  │  ├─ SplineEmbed.tsx
│  │  ├─ StatsBar.tsx
│  │  ├─ Services.tsx
│  │  ├─ Portfolio.tsx
│  │  ├─ Process.tsx
│  │  ├─ WhyUs.tsx
│  │  ├─ Testimonials.tsx
│  │  ├─ ContactForm.tsx
│  │  └─ Footer.tsx
│  ├─ data/
│  │  ├─ site.ts              # brand, nav links, hero copy, socials
│  │  ├─ services.ts
│  │  ├─ portfolio.ts
│  │  ├─ process.ts
│  │  ├─ stats.ts
│  │  └─ testimonials.ts
│  ├─ lib/
│  │  ├─ cn.ts                # className merge
│  │  ├─ useCountUp.ts        # count-up hook (tested)
│  │  ├─ useReducedMotion.ts  # SSR-safe reduced-motion hook
│  │  └─ contact.ts           # validateContact() + submitContact() (tested)
│  └─ types.ts                # shared content types
├─ tailwind.config.ts
├─ vitest.config.ts
├─ .env.local.example
└─ docs/…                     # existing spec + this plan
```

---

### Task 1: Project scaffold & dependencies

**Files:**
- Create: project via `create-next-app` into the existing repo root, `tailwind.config.ts`, `.env.local.example`
- Modify: `.gitignore` (ensure `.env.local`, `node_modules`, `.next` ignored)

**Interfaces:**
- Consumes: nothing.
- Produces: a runnable Next.js App Router + TypeScript + Tailwind v3 project with `framer-motion`, `lenis`, `clsx`, `tailwind-merge`, and `vitest` installed. Scripts `dev`, `build`, `lint`, `test` available.

- [ ] **Step 1: Scaffold Next.js into the repo root.** The directory already contains `docs/` and `.gitignore`; scaffold into a temp dir then move, or run in-place. Run from repo root:

```bash
npx create-next-app@15 . --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack --yes
```

If create-next-app refuses because the directory is non-empty, scaffold into `./.scaffold`, then move generated files up and delete `.scaffold`:

```bash
npx create-next-app@15 .scaffold --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack --yes
# then move everything except docs/.git/.gitignore into root, then: rm -rf .scaffold
```

- [ ] **Step 2: Pin Tailwind v3 (avoid v4 scaffold ambiguity).** Ensure `tailwindcss@^3.4`, `postcss`, `autoprefixer` are the installed versions and `tailwind.config.ts` + `postcss.config.js` use the v3 style (`content`, `theme.extend`, `plugins`). If create-next-app installed Tailwind v4, downgrade:

```bash
npm i -D tailwindcss@^3.4.0 postcss autoprefixer
npx tailwindcss init -p --ts
```

Confirm `app/globals.css` starts with the v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Install runtime + test dependencies.**

```bash
npm i framer-motion lenis clsx tailwind-merge
npm i -D vitest @vitejs/plugin-react jsdom
```

- [ ] **Step 4: Add the `test` script** to `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run"
}
```

- [ ] **Step 5: Create `.env.local.example`:**

```bash
# Web3Forms public access key — get a free key at https://web3forms.com
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key
```

- [ ] **Step 6: Verify the app boots and type-checks.**

```bash
npx tsc --noEmit && npm run build
```

Expected: type-check passes, `next build` completes with the default starter route. (Dev sanity: `npm run dev` serves `http://localhost:3000` — stop after confirming.)

- [ ] **Step 7: Commit.**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind + deps for Looping Ai landing"
```

---

### Task 2: Vitest config + test harness

**Files:**
- Create: `vitest.config.ts`, `src/lib/__tests__/smoke.test.ts` (temporary smoke test, removed at end of task)

**Interfaces:**
- Consumes: nothing.
- Produces: working `npm run test` running Vitest with the `@/*` alias resolved.

- [ ] **Step 1: Write `vitest.config.ts`:**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

- [ ] **Step 2: Write a failing smoke test** `src/lib/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { add } from "@/src/lib/smoke";

describe("harness", () => {
  it("resolves the @ alias and runs", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

- [ ] **Step 3: Run it to confirm it fails** (module missing):

```bash
npm run test
```

Expected: FAIL — cannot resolve `@/src/lib/smoke`.

- [ ] **Step 4: Create `src/lib/smoke.ts`:**

```ts
export const add = (a: number, b: number): number => a + b;
```

- [ ] **Step 5: Run tests, expect PASS:**

```bash
npm run test
```

Expected: 1 passed.

- [ ] **Step 6: Remove the smoke files** (harness proven):

```bash
rm src/lib/smoke.ts src/lib/__tests__/smoke.test.ts
```

- [ ] **Step 7: Commit.**

```bash
git add -A
git commit -m "test: add vitest harness with @ alias"
```

---

### Task 3: Design tokens, fonts, global styles, SEO layout

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`
- Create: `src/lib/cn.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind tokens (`colors.bg`, `colors.violet`, `colors.cyan`, `colors.magenta`, `fontFamily.display`, `fontFamily.sans`, `borderRadius`, `boxShadow.glow`, keyframes `blob`/`marquee`/`float`); `cn()` helper; Pretendard + Space Grotesk loaded; document `<head>` metadata/OG; grain overlay + `--font-display` CSS var.

- [ ] **Step 1: Write `src/lib/cn.ts`:**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
```

- [ ] **Step 2: Replace `tailwind.config.ts`** with the token system:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07070C",
        surface: "#0E0E18",
        violet: { DEFAULT: "#8B5CF6", soft: "#A78BFA" },
        cyan: { DEFAULT: "#22D3EE", soft: "#67E8F9" },
        magenta: { DEFAULT: "#D946EF", soft: "#E879F9" },
        ink: { DEFAULT: "#EDEDF2", muted: "#9CA3AF", faint: "#5B5B6B" },
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Pretendard", "sans-serif"],
      },
      borderRadius: { "2xl": "1.25rem", "3xl": "1.75rem" },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139,92,246,0.45)",
        "glow-cyan": "0 0 40px -8px rgba(34,211,238,0.45)",
      },
      keyframes: {
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(6%,-8%) scale(1.1)" },
          "66%": { transform: "translate(-6%,6%) scale(0.95)" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        blob: "blob 18s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 3: Replace `app/globals.css`** with base + Pretendard CDN + grain:

```css
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-bg text-ink font-sans antialiased;
    background-image:
      radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.08), transparent 70%);
  }
  ::selection { @apply bg-violet/40 text-white; }
}

@layer utilities {
  .glass { @apply bg-white/[0.04] border border-white/10 backdrop-blur-xl; }
  .text-gradient {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(100deg, #A78BFA, #22D3EE 60%, #E879F9);
  }
  .grain::after {
    content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 60;
    opacity: 0.035; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 4: Replace `app/layout.tsx`** with fonts + SEO metadata:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/src/components/primitives/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://looping-ai.vercel.app"),
  title: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
  description: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게. 생각만 던지면 며칠 안에 진짜 동작하는 웹사이트가 나옵니다.",
  keywords: ["랜딩페이지 제작", "AI 웹사이트", "대시보드 개발", "바이브코딩", "Looping Ai"],
  openGraph: {
    title: "Looping Ai — 당신의 아이디어, 며칠 만에 웹으로",
    description: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게.",
    type: "website",
    locale: "ko_KR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={display.variable}>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

> Note: `SmoothScroll` is created in Task 7. Until then, temporarily wrap children in a `<>` fragment; switch to `<SmoothScroll>` when Task 7 lands. (If executing strictly in order, import is added in Task 7's step.)

- [ ] **Step 5: Verify build & types:**

```bash
npx tsc --noEmit && npm run build
```

Expected: PASS (note: `SmoothScroll` import will fail until Task 7 — if running Task 3 standalone, keep the fragment version of layout and add the import in Task 7).

- [ ] **Step 6: Commit.**

```bash
git add -A
git commit -m "feat: design tokens, fonts, global styles, SEO metadata"
```

---

### Task 4: Shared types + data files

**Files:**
- Create: `src/types.ts`, `src/data/site.ts`, `src/data/services.ts`, `src/data/portfolio.ts`, `src/data/process.ts`, `src/data/stats.ts`, `src/data/testimonials.ts`
- Test: `src/data/__tests__/data.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: typed content arrays consumed by every section. Exact exported names/types below; sections import these and MUST NOT hardcode copy.

```ts
// src/types.ts
export type NavLink = { label: string; href: string };
export type Service = { id: string; title: string; desc: string; bullets: string[]; icon: string };
export type Project = { id: string; title: string; desc: string; tags: string[]; url: string; image?: string };
export type ProcessStep = { step: number; title: string; desc: string };
export type Stat = { id: string; value: number; suffix: string; label: string };
export type Testimonial = { id: string; quote: string; author: string; role: string };
export type SiteConfig = {
  brand: string;
  nav: NavLink[];
  hero: { headline: string; sub: string; cta: string; scrollCue: string };
  marquee: string[];
  socials: { label: string; href: string }[];
  contactEmail: string;
};
```

- [ ] **Step 1: Write a failing data-integrity test** `src/data/__tests__/data.test.ts`:

```ts
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
    expect(portfolio.some((p) => p.url === "https://worldcup-korea-dashboard.vercel.app/")).toBe(true);
  });
  it("has unique ids per dataset", () => {
    for (const set of [services, portfolio, stats, processSteps, testimonials]) {
      const ids = set.map((x: { id?: string; step?: number }) => x.id ?? x.step);
      expect(new Set(ids).size).toBe(set.length);
    }
  });
  it("has three process steps numbered 1..3", () => {
    expect(processSteps.map((p) => p.step)).toEqual([1, 2, 3]);
  });
  it("exposes nav anchors that all start with #", () => {
    expect(site.nav.every((n) => n.href.startsWith("#"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run it, expect FAIL** (data files missing):

```bash
npm run test
```

Expected: FAIL — cannot resolve data modules.

- [ ] **Step 3: Create the data files.** Use these exact contents (placeholders are intentionally editable per Global Constraints):

```ts
// src/data/site.ts
import type { SiteConfig } from "@/src/types";
export const site: SiteConfig = {
  brand: "Looping Ai",
  nav: [
    { label: "작업물", href: "#portfolio" },
    { label: "서비스", href: "#services" },
    { label: "후기", href: "#testimonials" },
    { label: "문의", href: "#contact" },
  ],
  hero: {
    headline: "당신의 아이디어, 며칠 만에 웹으로.",
    sub: "랜딩페이지 · AI 웹사이트 · 대시보드를 바이브코딩으로 빠르게.",
    cta: "문의하기",
    scrollCue: "스크롤해서 둘러보기",
  },
  marquee: ["Next.js", "TypeScript", "Tailwind", "AI", "Framer Motion", "Spline 3D", "Vercel", "대시보드", "랜딩페이지"],
  socials: [
    { label: "Email", href: "mailto:hello@looping.ai" },
    { label: "GitHub", href: "https://github.com/" },
  ],
  contactEmail: "hello@looping.ai",
};
```

```ts
// src/data/services.ts
import type { Service } from "@/src/types";
export const services: Service[] = [
  { id: "landing", title: "랜딩페이지", desc: "전환에 집중한 한 장짜리 페이지. 빠르게 만들고 바로 띄웁니다.", bullets: ["반응형 + 모바일 최적화", "문의/구매 전환 설계", "애니메이션·인터랙션"], icon: "rocket" },
  { id: "ai-web", title: "AI 웹사이트", desc: "챗봇·생성형 기능이 들어간 진짜 동작하는 AI 웹 서비스.", bullets: ["LLM 연동", "맞춤 워크플로우", "API/백엔드 연결"], icon: "sparkles" },
  { id: "dashboard", title: "대시보드 · 웹앱", desc: "데이터를 한눈에. 차트·필터·실시간 업데이트까지.", bullets: ["데이터 시각화", "관리자/내부 도구", "인증·권한"], icon: "chart" },
];
```

```ts
// src/data/portfolio.ts
import type { Project } from "@/src/types";
export const portfolio: Project[] = [
  {
    id: "worldcup-korea",
    title: "World Cup Korea Dashboard",
    desc: "월드컵 한국 대표팀 데이터를 실시간 시각화한 인터랙티브 대시보드.",
    tags: ["대시보드", "데이터 시각화", "Next.js"],
    url: "https://worldcup-korea-dashboard.vercel.app/",
  },
  // 추가 작업물은 여기에 객체를 더 추가하면 자동으로 노출됩니다.
];
```

```ts
// src/data/process.ts
import type { ProcessStep } from "@/src/types";
export const processSteps: ProcessStep[] = [
  { step: 1, title: "아이디어 공유", desc: "원하는 걸 편하게 말씀해 주세요. 레퍼런스가 있으면 더 좋습니다." },
  { step: 2, title: "빠른 프로토타입", desc: "며칠 안에 동작하는 시안을 만들어 함께 보며 다듬습니다." },
  { step: 3, title: "완성 · 배포", desc: "최종본을 마무리하고 도메인에 배포까지 끝냅니다." },
];
```

```ts
// src/data/stats.ts  (PLACEHOLDER values — replace with real numbers later)
import type { Stat } from "@/src/types";
export const stats: Stat[] = [
  { id: "projects", value: 32, suffix: "+", label: "제작한 프로젝트" },
  { id: "satisfaction", value: 98, suffix: "%", label: "고객 만족도" },
  { id: "days", value: 5, suffix: "일", label: "평균 제작 기간" },
  { id: "rebuild", value: 100, suffix: "%", label: "수정까지 직접 소통" },
];
```

```ts
// src/data/testimonials.ts  (PLACEHOLDER reviews — replace with real ones later)
import type { Testimonial } from "@/src/types";
export const testimonials: Testimonial[] = [
  { id: "t1", quote: "생각만 말했는데 며칠 만에 진짜 사이트가 나왔어요. 속도가 압도적입니다.", author: "김** 대표", role: "스타트업 파운더" },
  { id: "t2", quote: "디자인 퀄리티가 기대 이상이었어요. 문의 전환율이 눈에 띄게 올랐습니다.", author: "이** 실장", role: "소상공인" },
  { id: "t3", quote: "소통이 빠르고 수정 반영이 즉각적이라 믿고 맡길 수 있었습니다.", author: "박** 매니저", role: "마케팅 담당" },
];
```

- [ ] **Step 4: Run tests, expect PASS:**

```bash
npm run test
```

Expected: all data tests pass.

- [ ] **Step 5: Type-check & commit.**

```bash
npx tsc --noEmit
git add -A
git commit -m "feat: typed editable content data files"
```

---

### Task 5: `useReducedMotion` + `Section` + `GradientBlob`

**Files:**
- Create: `src/lib/useReducedMotion.ts`, `src/components/primitives/Section.tsx`, `src/components/primitives/GradientBlob.tsx`

**Interfaces:**
- Consumes: `cn` (Task 3).
- Produces:
  - `useReducedMotion(): boolean` — SSR-safe, returns `true` when user prefers reduced motion.
  - `Section({ id?, className?, children })` — `<section>` with consistent vertical padding + max-width container.
  - `GradientBlob({ className? })` — absolutely-positioned animated mesh blob; static when reduced motion.

- [ ] **Step 1: Write `src/lib/useReducedMotion.ts`:**

```ts
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
```

- [ ] **Step 2: Write `src/components/primitives/Section.tsx`:**

```tsx
import { cn } from "@/src/lib/cn";

export default function Section({
  id, className, children,
}: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("relative w-full py-24 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}
```

- [ ] **Step 3: Write `src/components/primitives/GradientBlob.tsx`:**

```tsx
"use client";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function GradientBlob({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-[42rem] w-[42rem] rounded-full blur-[120px] opacity-40",
        "bg-[radial-gradient(circle_at_30%_30%,#8B5CF6,transparent_60%),radial-gradient(circle_at_70%_70%,#22D3EE,transparent_55%)]",
        !reduced && "animate-blob",
        className,
      )}
    />
  );
}
```

- [ ] **Step 4: Verify types & lint:**

```bash
npx tsc --noEmit && npm run lint
```

Expected: PASS.

- [ ] **Step 5: Commit.**

```bash
git add -A
git commit -m "feat: Section, GradientBlob primitives + reduced-motion hook"
```

---

### Task 6: `useCountUp` + `Counter` + `Marquee`

**Files:**
- Create: `src/lib/useCountUp.ts`, `src/components/primitives/Counter.tsx`, `src/components/primitives/Marquee.tsx`
- Test: `src/lib/__tests__/useCountUp.test.ts`

**Interfaces:**
- Consumes: `useReducedMotion` (Task 5), `cn` (Task 3).
- Produces:
  - `easeOutCubic(t: number): number` — pure easing, `t∈[0,1]`.
  - `useCountUp(target: number, opts?: { duration?: number; active: boolean }): number` — animates 0→target when `active` true.
  - `Counter({ value, suffix?, className? })` — count-up on view (uses Framer Motion `useInView`), respects reduced motion (renders final value instantly).
  - `Marquee({ items, className? })` — horizontally scrolling duplicated strip; paused under reduced motion.

- [ ] **Step 1: Write failing test** `src/lib/__tests__/useCountUp.test.ts` for the pure easing fn:

```ts
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
});
```

- [ ] **Step 2: Run it, expect FAIL** (module missing):

```bash
npm run test
```

Expected: FAIL — cannot resolve `@/src/lib/useCountUp`.

- [ ] **Step 3: Write `src/lib/useCountUp.ts`:**

```ts
"use client";
import { useEffect, useRef, useState } from "react";

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export function useCountUp(
  target: number,
  { duration = 1400, active }: { duration?: number; active: boolean },
): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration, active]);
  return value;
}
```

- [ ] **Step 4: Run test, expect PASS:**

```bash
npm run test
```

Expected: easeOutCubic tests pass.

- [ ] **Step 5: Write `src/components/primitives/Counter.tsx`:**

```tsx
"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/src/lib/useCountUp";
import { useReducedMotion } from "@/src/lib/useReducedMotion";
import { cn } from "@/src/lib/cn";

export default function Counter({
  value, suffix = "", className,
}: { value: number; suffix?: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const animated = useCountUp(value, { active: inView && !reduced });
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {reduced ? value : animated}{suffix}
    </span>
  );
}
```

- [ ] **Step 6: Write `src/components/primitives/Marquee.tsx`:**

```tsx
"use client";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function Marquee({ items, className }: { items: string[]; className?: string }) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      <div className={cn("flex w-max gap-10 whitespace-nowrap", !reduced && "animate-marquee")}>
        {row.map((label, i) => (
          <span key={i} className="text-sm font-display uppercase tracking-widest text-ink-muted">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run test
git add -A
git commit -m "feat: Counter (count-up), Marquee primitives"
```

---

### Task 7: `MagneticButton`, `TiltCard`, `SmoothScroll`

**Files:**
- Create: `src/components/primitives/MagneticButton.tsx`, `src/components/primitives/TiltCard.tsx`, `src/components/primitives/SmoothScroll.tsx`
- Modify: `app/layout.tsx` (wire `SmoothScroll` import from Task 3 note)

**Interfaces:**
- Consumes: `useReducedMotion` (Task 5), `cn` (Task 3), `framer-motion`, `lenis`.
- Produces:
  - `MagneticButton({ href?, children, className?, onClick? })` — anchor/button that translates toward cursor; disabled under reduced motion.
  - `TiltCard({ children, className? })` — 3D tilt on hover via pointer position; flat under reduced motion.
  - `SmoothScroll({ children })` — client component initializing Lenis (no-op under reduced motion).

- [ ] **Step 1: Write `src/components/primitives/SmoothScroll.tsx`:**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let id = 0;
    const raf = (time: number) => { lenis.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, [reduced]);
  return <>{children}</>;
}
```

- [ ] **Step 2: Write `src/components/primitives/MagneticButton.tsx`:**

```tsx
"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function MagneticButton({
  href, children, className, onClick,
}: { href?: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base = cn(
    "inline-flex items-center justify-center rounded-2xl px-7 py-3.5 font-medium",
    "bg-gradient-to-r from-violet to-cyan text-white shadow-glow",
    "transition-shadow hover:shadow-[0_0_60px_-6px_rgba(139,92,246,0.7)]",
    className,
  );
  return (
    <motion.a
      ref={ref} href={href} onClick={onClick} onMouseMove={onMove} onMouseLeave={reset}
      style={{ x: sx, y: sy }} className={base}
    >
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 3: Write `src/components/primitives/TiltCard.tsx`:**

```tsx
"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/src/lib/cn";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12); rx.set(-py * 12);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className={cn("glass rounded-2xl will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Ensure `app/layout.tsx` imports and uses `SmoothScroll`** (resolve the Task 3 note) — body wraps children in `<SmoothScroll>{children}</SmoothScroll>`.

- [ ] **Step 5: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: MagneticButton, TiltCard, Lenis SmoothScroll"
```

---

### Task 8: `Nav` (sticky glass bar)

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- Consumes: `site` (Task 4), `MagneticButton` (Task 7), `cn` (Task 3).
- Produces: `Nav()` — fixed top glass bar; logo (`site.brand`) left, `site.nav` links center (hidden on mobile, hamburger menu toggling a panel), `MagneticButton` → `#contact` right. Adds a stronger background after scrolling > 20px.

- [ ] **Step 1: Implement `Nav.tsx`.** Requirements: client component; `fixed inset-x-0 top-0 z-50`; uses `glass` utility; desktop nav lists `site.nav` as anchor links; mobile shows a hamburger that opens a full-width glass panel listing the same links; right side renders `<MagneticButton href="#contact">{site.hero.cta}</MagneticButton>`; on `scroll` past 20px add `shadow-glow`/increased opacity via state + listener. Use `site` for all labels (no hardcoded copy).

- [ ] **Step 2: Verify types/lint/build.**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: PASS.

- [ ] **Step 3: Commit.**

```bash
git add -A
git commit -m "feat: sticky glass Nav with mobile menu"
```

---

### Task 9: `SplineEmbed` + `Hero`

**Files:**
- Create: `src/components/SplineEmbed.tsx`, `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `site` (Task 4), `MagneticButton` (Task 7), `GradientBlob` (Task 5), `Marquee` (Task 6), `useReducedMotion` (Task 5), `framer-motion`.
- Produces:
  - `SplineEmbed({ className? })` — lazy `<iframe src="https://my.spline.design/distortingtypography-HVtSRPvAe6lsZmpevIW7Ydk0/">` mounted only after it scrolls near view (IntersectionObserver) AND only when not reduced-motion; otherwise renders a static gradient fallback. `loading="lazy"`, `title` set, no border.
  - `Hero()` — full-height section: Spline background center, `GradientBlob`s, headline (`site.hero.headline`, `text-gradient` + `font-display`), sub (`site.hero.sub`), `MagneticButton` CTA → `#contact`, scroll cue (`site.hero.scrollCue`), `Marquee` of `site.marquee` near the bottom. Entrance animation via Framer Motion staggered `initial/animate`.

- [ ] **Step 1: Write `SplineEmbed.tsx`** with IntersectionObserver lazy mount + reduced-motion static fallback (a `GradientBlob`-style gradient div). Iframe URL exactly the Global Constraints value; `className="h-full w-full"`, `title="Looping Ai 3D"`, `loading="lazy"`, `style={{ border: 0 }}`.

- [ ] **Step 2: Write `Hero.tsx`** composing the above. Headline uses `font-display` + `text-gradient`; layout `min-h-[100svh] flex items-center`. CTA: `<MagneticButton href="#contact">{site.hero.cta}</MagneticButton>`. Animations: container `whileInView`/`animate` stagger of headline → sub → CTA.

- [ ] **Step 3: Temporarily render `<Hero />` in `app/page.tsx`** to eyeball, then verify build:

```bash
npx tsc --noEmit && npm run build
```

Expected: PASS. (Optional: `npm run dev` and confirm the iframe lazy-loads and the headline animates.)

- [ ] **Step 4: Commit.**

```bash
git add -A
git commit -m "feat: Hero with lazy Spline embed + reduced-motion fallback"
```

---

### Task 10: `StatsBar`

**Files:**
- Create: `src/components/StatsBar.tsx`

**Interfaces:**
- Consumes: `stats` (Task 4), `Counter` (Task 6), `Section` (Task 5).
- Produces: `StatsBar()` — responsive grid (2 cols mobile / 4 desktop) of `stats`; each cell renders `<Counter value={s.value} suffix={s.suffix} />` in large `font-display` gradient text with `s.label` beneath. Wrapped in `Section` (no `id` needed; it's a band).

- [ ] **Step 1: Implement `StatsBar.tsx`** mapping `stats`. Counter is the only number source; labels from data.

- [ ] **Step 2: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: StatsBar with count-up numbers"
```

---

### Task 11: `Services`

**Files:**
- Create: `src/components/Services.tsx`

**Interfaces:**
- Consumes: `services` (Task 4), `TiltCard` (Task 7), `Section` (Task 5), `framer-motion`.
- Produces: `Services()` — `Section id="services"` with a heading + 3-column responsive grid of `services`; each card is a `TiltCard` showing icon (map `icon` string → an inline SVG/emoji set), `title`, `desc`, and `bullets` list. Cards reveal with `whileInView` stagger.

- [ ] **Step 1: Implement `Services.tsx`.** Include a small `iconFor(icon: string)` map covering `"rocket" | "sparkles" | "chart"` returning an inline SVG; default fallback for unknown keys. All text from `services`.

- [ ] **Step 2: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: Services section with 3D tilt cards"
```

---

### Task 12: `Portfolio`

**Files:**
- Create: `src/components/Portfolio.tsx`

**Interfaces:**
- Consumes: `portfolio` (Task 4), `Section` (Task 5), `framer-motion`.
- Produces: `Portfolio()` — `Section id="portfolio"` heading + responsive grid of `portfolio`. Each card: an `<a href={url} target="_blank" rel="noopener noreferrer">` wrapping a live preview (`<iframe src={url}>` scaled down with `pointer-events-none`, lazy, OR `image` if provided), `title`, `desc`, and `tags` chips. Hover lifts the card and reveals a "보러가기 ↗" affordance. Designed so adding objects to the array auto-renders more cards.

- [ ] **Step 1: Implement `Portfolio.tsx`** with the iframe-preview pattern (lazy, `loading="lazy"`, `title={p.title}`, `tabIndex={-1}` on the iframe, overlay link covering the card). Use `image` when present, else iframe preview.

- [ ] **Step 2: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: Portfolio grid with live preview cards"
```

---

### Task 13: `Process`

**Files:**
- Create: `src/components/Process.tsx`

**Interfaces:**
- Consumes: `processSteps` (Task 4), `Section` (Task 5), `framer-motion`.
- Produces: `Process()` — `Section id="process"` heading + a vertical (mobile) / horizontal (desktop) timeline of the 3 `processSteps`. A connecting line whose fill grows with scroll via Framer Motion `useScroll`/`scaleX|scaleY`. Each node shows `step`, `title`, `desc` and reveals on view.

- [ ] **Step 1: Implement `Process.tsx`** with `useScroll({ target, offset })` driving the connector scale. Reduced motion → connector fully drawn, no scroll-linked animation.

- [ ] **Step 2: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: scroll-linked Process timeline"
```

---

### Task 14: `WhyUs`

**Files:**
- Create: `src/components/WhyUs.tsx`
- Modify: `src/data/site.ts` (add `why` array) OR inline a `whyPoints` const in the component sourced from data

**Interfaces:**
- Consumes: a `why` dataset, `Section` (Task 5), `framer-motion`.
- Produces: `WhyUs()` — `Section id="why"` heading + 4-item bento/grid of differentiators: 빠름 · 합리적 가격 · 고퀄 · 직접 소통, each with title + one-line desc + icon. To honor the editable-content rule, add `export const why: { id:string; title:string; desc:string; icon:string }[]` to `src/data/site.ts` (or a new `src/data/why.ts`) and consume it.

- [ ] **Step 1: Add `why` data** (4 items: `fast`,`price`,`quality`,`direct`) to `src/data/why.ts` with the four differentiator copy lines.

- [ ] **Step 2: Implement `WhyUs.tsx`** consuming `why`, bento layout (one larger feature cell + smaller cells), `whileInView` stagger, `glass` cards.

- [ ] **Step 3: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: WhyUs differentiators bento section"
```

---

### Task 15: `Testimonials`

**Files:**
- Create: `src/components/Testimonials.tsx`

**Interfaces:**
- Consumes: `testimonials` (Task 4), `Section` (Task 5), `framer-motion`.
- Produces: `Testimonials()` — `Section id="testimonials"` heading + responsive card grid (desktop) that on mobile becomes a horizontal snap carousel. Each card: `quote`, `author`, `role`, `glass` styling, reveal on view.

- [ ] **Step 1: Implement `Testimonials.tsx`** mapping `testimonials`; mobile uses `overflow-x-auto snap-x` row, desktop uses 3-col grid. All copy from data.

- [ ] **Step 2: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: Testimonials grid/carousel"
```

---

### Task 16: Contact logic + `ContactForm`

**Files:**
- Create: `src/lib/contact.ts`, `src/components/ContactForm.tsx`
- Test: `src/lib/__tests__/contact.test.ts`

**Interfaces:**
- Consumes: `MagneticButton`/buttons, `Section` (Task 5), `site` (Task 4).
- Produces:
  - `type ContactValues = { name: string; email: string; projectType: string; message: string; company?: string }` (`company` = honeypot).
  - `validateContact(v: ContactValues): { ok: boolean; errors: Partial<Record<keyof ContactValues, string>> }` — required name/email/projectType/message, email format check, non-empty after trim.
  - `submitContact(v: ContactValues): Promise<{ ok: boolean; error?: string }>` — if `v.company` non-empty → silently return `{ ok: true }` (honeypot). Otherwise POST to `https://api.web3forms.com/submit` with `access_key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY` and the fields; returns ok based on response. **This is the only network call** — a future Resend swap edits only this function.
  - `ContactForm()` — `Section id="contact"` with the form: name, email, projectType `<select>` (랜딩페이지 / AI 웹사이트 / 대시보드·웹앱 / 기타), message `<textarea>`, hidden honeypot `company`, submit button. States: idle / submitting / success / error with visible messaging. Client validation via `validateContact` before submit.

- [ ] **Step 1: Write failing tests** `src/lib/__tests__/contact.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { validateContact, type ContactValues } from "@/src/lib/contact";

const base: ContactValues = { name: "홍길동", email: "a@b.com", projectType: "랜딩페이지", message: "안녕하세요 문의드립니다" };

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
});
```

- [ ] **Step 2: Run, expect FAIL** (module missing):

```bash
npm run test
```

Expected: FAIL — cannot resolve `@/src/lib/contact`.

- [ ] **Step 3: Write `src/lib/contact.ts`:**

```ts
export type ContactValues = {
  name: string; email: string; projectType: string; message: string; company?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(v: ContactValues): {
  ok: boolean; errors: Partial<Record<keyof ContactValues, string>>;
} {
  const errors: Partial<Record<keyof ContactValues, string>> = {};
  if (!v.name.trim()) errors.name = "이름을 입력해 주세요.";
  if (!v.email.trim()) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL.test(v.email.trim())) errors.email = "이메일 형식이 올바르지 않습니다.";
  if (!v.projectType.trim()) errors.projectType = "프로젝트 유형을 선택해 주세요.";
  if (!v.message.trim()) errors.message = "내용을 입력해 주세요.";
  return { ok: Object.keys(errors).length === 0, errors };
}

export async function submitContact(v: ContactValues): Promise<{ ok: boolean; error?: string }> {
  if (v.company && v.company.trim()) return { ok: true }; // honeypot tripped
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) return { ok: false, error: "폼이 아직 설정되지 않았습니다. (access key 누락)" };
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        name: v.name, email: v.email,
        subject: `[Looping Ai 문의] ${v.projectType} — ${v.name}`,
        project_type: v.projectType, message: v.message,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? { ok: true } : { ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  } catch {
    return { ok: false, error: "네트워크 오류가 발생했습니다." };
  }
}
```

- [ ] **Step 4: Run tests, expect PASS:**

```bash
npm run test
```

Expected: validateContact tests pass.

- [ ] **Step 5: Write `ContactForm.tsx`** (client). Controlled inputs in `ContactValues` state; on submit → `validateContact` → if ok set status `submitting` and call `submitContact` → set `success`/`error`. Render field-level error text; success replaces the form with a thank-you; error shows a retry message. Hidden honeypot input `company` with `aria-hidden`, `tabIndex={-1}`, off-screen. Project-type `<select>` options listed above. Submit button shows spinner/label per status.

- [ ] **Step 6: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build && npm run test
git add -A
git commit -m "feat: contact form with Web3Forms submit, validation, honeypot"
```

---

### Task 17: `Footer`

**Files:**
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `site` (Task 4).
- Produces: `Footer()` — brand (`site.brand`) + tagline, section links (`site.nav`), socials (`site.socials`), copyright `© {year} Looping Ai`. Glass top border.

- [ ] **Step 1: Implement `Footer.tsx`** from `site` data; dynamic year via `new Date().getFullYear()`.

- [ ] **Step 2: Verify & commit.**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add -A
git commit -m "feat: Footer"
```

---

### Task 18: Page assembly + final polish + verification

**Files:**
- Modify: `app/page.tsx` (compose all sections in spec order), `app/layout.tsx` (confirm `SmoothScroll`, grain, metadata), add `app/icon.svg` (favicon), `app/opengraph-image` optional

**Interfaces:**
- Consumes: every section component.
- Produces: the complete single-page site at `/`.

- [ ] **Step 1: Compose `app/page.tsx`** in spec §5 order:

```tsx
import Nav from "@/src/components/Nav";
import Hero from "@/src/components/Hero";
import StatsBar from "@/src/components/StatsBar";
import Services from "@/src/components/Services";
import Portfolio from "@/src/components/Portfolio";
import Process from "@/src/components/Process";
import WhyUs from "@/src/components/WhyUs";
import Testimonials from "@/src/components/Testimonials";
import ContactForm from "@/src/components/ContactForm";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Portfolio />
        <Process />
        <WhyUs />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add a simple SVG favicon** `app/icon.svg` (a violet→cyan loop ring matching the "Looping" motif).

- [ ] **Step 3: Reduced-motion sweep.** With `prefers-reduced-motion: reduce` emulated, confirm: blobs static, no tilt, marquee paused, counters show final value, Spline replaced by static fallback. Fix any component that ignores `useReducedMotion`.

- [ ] **Step 4: Responsive pass.** Check at 375px, 768px, 1280px: Nav mobile menu works, hero text doesn't overflow, grids reflow, no horizontal scroll. Fix issues.

- [ ] **Step 5: Full production build + lint + tests (final gate):**

```bash
npx tsc --noEmit && npm run lint && npm run test && npm run build
```

Expected: all pass; `next build` reports the `/` route built with no errors.

- [ ] **Step 6: Manual smoke** via `npm run dev`: every nav anchor scrolls to its section; CTA reaches the contact form; submitting with a real `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` returns success (or graceful error without a key).

- [ ] **Step 7: Commit.**

```bash
git add -A
git commit -m "feat: assemble full Looping Ai landing page + polish"
```

---

## Self-Review

**1. Spec coverage**

| Spec item | Task |
|---|---|
| §4 design tokens / fonts / dark / grain / glow | Task 3 |
| §5.1 Nav (sticky glass) | Task 8 |
| §5.2 Hero + Spline + entrance anim | Task 9 |
| §5.3 StatsBar count-up (editable numbers) | Task 6 (Counter) + Task 10 + Task 4 (stats data) |
| §5.4 Services 3 cards + 3D tilt | Task 7 (TiltCard) + Task 11 + Task 4 (services) |
| §5.5 Portfolio + World Cup item + data-driven slots | Task 4 (portfolio) + Task 12 |
| §5.6 Process scroll timeline | Task 13 |
| §5.7 WhyUs differentiators | Task 14 |
| §5.8 Testimonials grid/carousel (editable) | Task 4 + Task 15 |
| §5.9 Contact form + final CTA + states | Task 16 |
| §5.10 Footer | Task 17 |
| §6 reveal/stagger, tilt, magnetic, blob, count-up, Lenis, Spline, marquee, reduced-motion, mobile | Tasks 5–9, 18 |
| §7 Next/TS/Tailwind/Framer/Spline/Lenis/Web3Forms/Vercel | Tasks 1–3, 7, 9, 16 |
| §7 form: validation + honeypot + states + isolated submit (Resend path) | Task 16 |
| §8 component boundaries + `/data` content | Tasks 4–17 |
| §9 placeholders editable in one place | Task 4 |
| §10 no light toggle / i18n / CMS / payments | honored (out of scope) |

No gaps found.

**2. Placeholder scan:** Logic-heavy/non-obvious files (tokens, hooks, primitives, contact, layout, page) include full code. Presentational section components (Tasks 8, 10–15, 17) specify exact data source, required structure, IDs, and acceptance criteria rather than full JSX — this is a deliberate adaptation for a visual landing page (full final JSX would duplicate the implementation and violate YAGNI); each still has concrete verification commands. No "TBD/implement later/handle edge cases" placeholders remain.

**3. Type consistency:** `ContactValues`/`validateContact`/`submitContact` names match between Task 16's interface block, code, and test. Data types in `src/types.ts` (Task 4) match every consumer's destructuring (`Service.bullets`, `Stat.value/suffix/label`, `Project.url`, `ProcessStep.step`, `Testimonial.quote/author/role`). `useCountUp(target, {active})`, `Counter({value, suffix})`, `Marquee({items})`, `GradientBlob({className})`, `Section({id,className,children})` signatures are used consistently. `easeOutCubic` exported from the same module the test imports. `useReducedMotion()` consumed identically across primitives.

---

## Execution Handoff

Implement task-by-task with a verification gate (tsc + lint + build, plus vitest on logic tasks) at the end of each task before moving on.
