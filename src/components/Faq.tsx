import { faqs } from "@/src/data/faq";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon from "@/src/components/primitives/Icon";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <Section id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SectionHeading
        eyebrow="FAQ"
        title="자주 묻는 질문"
        subtitle="궁금한 점을 빠르게 확인하세요. 더 궁금하면 편하게 문의해 주세요."
      />

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <details className="group rounded-2xl glass px-5 transition-colors hover:border-white/20 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base font-medium">
                {f.q}
                <Icon
                  name="chevron-down"
                  size={18}
                  className="shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-ink-muted">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
