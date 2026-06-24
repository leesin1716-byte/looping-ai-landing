import { portfolio } from "@/src/data/portfolio";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon from "@/src/components/primitives/Icon";

export default function Portfolio() {
  return (
    <Section id="portfolio">
      <SectionHeading
        eyebrow="Work"
        title={
          <>
            대표 <span className="text-gradient">작업물</span>
          </>
        }
        subtitle="페이지 퀄리티가 곧 실력입니다. 직접 만든 결과물을 확인해 보세요."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {portfolio.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-surface">
                <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-white/10 bg-bg/70 px-3 backdrop-blur">
                  <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
                </div>

                {p.image ? (
                  <div
                    className="absolute inset-x-0 bottom-0 top-8 bg-cover bg-top"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                ) : (
                  <iframe
                    src={p.url}
                    title={p.title}
                    loading="lazy"
                    tabIndex={-1}
                    className="pointer-events-none absolute inset-x-0 top-8 h-[calc(100%-2rem)] w-full"
                    style={{ border: 0 }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  보러가기 <Icon name="arrow-up-right" size={14} />
                </span>
              </div>

              <div className="flex flex-col gap-3 p-6">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-ink-muted">{p.desc}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
