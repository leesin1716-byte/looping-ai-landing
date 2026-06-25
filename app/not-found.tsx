import type { Metadata } from "next";
import MagneticButton from "@/src/components/primitives/MagneticButton";
import GradientBlob from "@/src/components/primitives/GradientBlob";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요 (404)",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <GradientBlob className="-left-40 top-0" />
      <GradientBlob className="-right-40 bottom-0" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-bg/40 via-bg/20 to-bg" />

      <span className="glass mb-7 w-fit rounded-full px-4 py-1.5 text-xs text-ink-muted">
        404 · 페이지 없음
      </span>

      <p
        aria-hidden
        className="text-gradient font-display text-7xl font-bold leading-none tracking-tight sm:text-8xl md:text-9xl"
      >
        404
      </p>

      <h1 className="mt-7 break-keep font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        페이지를 찾을 수 없어요
      </h1>

      <p className="mt-4 max-w-md break-keep text-base text-ink-muted md:text-lg">
        찾으시는 페이지가 사라졌거나 주소가 바뀌었을 수 있어요.
        <br className="hidden sm:block" />
        홈에서 다시 시작해 보세요.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton href="/">홈으로 돌아가기</MagneticButton>
        <MagneticButton href="/#portfolio" variant="ghost">
          작업물 보기
        </MagneticButton>
      </div>
    </main>
  );
}
