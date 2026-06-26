import { site } from "@/src/data/site";
import MagneticButton from "@/src/components/primitives/MagneticButton";
import Reveal from "@/src/components/primitives/Reveal";

/**
 * Mid-page conversion band placed right after the portfolio proof, capturing
 * intent before the longer info sections. Reuses the real contact CTA.
 */
export default function CtaBand() {
  return (
    <section className="px-5 py-16 md:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet/20 via-surface to-cyan/15 px-6 py-12 text-center md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.28),transparent_60%)]"
          />
          <h2 className="break-keep font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            마음에 드는 작업물을 보셨다면,
            <br className="hidden sm:block" />
            <span className="text-gradient">당신의 프로젝트</span>도 시작해 볼까요?
          </h2>
          <p className="mx-auto mt-4 max-w-xl break-keep text-ink-muted">
            아이디어만 있으면 충분합니다. 부담 없이 문의 주시면 빠르게 회신드려요.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <MagneticButton href="#contact">무료로 문의하기</MagneticButton>
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              또는 이메일로 바로 문의 →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
