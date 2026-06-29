"use client";
import { useMemo, useState } from "react";
import {
  estimatorTypes,
  estimatorScales,
  estimatorOptions,
} from "@/src/data/estimator";
import { cn } from "@/src/lib/cn";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon from "@/src/components/primitives/Icon";

const won = (n: number) => `₩${n.toLocaleString("ko-KR")}만`;

export default function Estimator() {
  const [typeId, setTypeId] = useState("webapp");
  const [scaleId, setScaleId] = useState("m");
  const [opts, setOpts] = useState<Set<string>>(new Set());

  const { low, high, weeks } = useMemo(() => {
    const type = estimatorTypes.find((t) => t.id === typeId)!;
    const scale = estimatorScales.find((s) => s.id === scaleId)!;
    const add = estimatorOptions
      .filter((o) => opts.has(o.id))
      .reduce((sum, o) => sum + o.add, 0);
    const mid = type.base * scale.mult + add;
    const round10 = (n: number) => Math.round(n / 10) * 10;
    return {
      low: round10(mid * 0.9),
      high: round10(mid * 1.25),
      weeks: [type.weeks[0], Math.ceil(type.weeks[1] * scale.mult)] as const,
    };
  }, [typeId, scaleId, opts]);

  const toggle = (id: string) =>
    setOpts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onInquire = () => {
    const type = estimatorTypes.find((t) => t.id === typeId);
    if (type) {
      window.dispatchEvent(
        new CustomEvent("prefill-project-type", { detail: type.formType }),
      );
    }
  };

  return (
    <Section id="estimate">
      <SectionHeading
        eyebrow="Estimate"
        title={
          <>
            예상 견적을 <span className="text-gradient">바로 확인</span>하세요
          </>
        }
        subtitle="몇 가지만 선택하면 대략적인 비용과 기간을 알려드려요. 정확한 견적은 상담 후 안내합니다."
      />

      <Reveal className="mt-12">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Controls */}
          <div className="flex flex-col gap-7 rounded-3xl glass p-6 md:p-8">
            <Group label="무엇을 만드시나요?">
              <div className="grid grid-cols-3 gap-2">
                {estimatorTypes.map((t) => (
                  <Choice
                    key={t.id}
                    active={typeId === t.id}
                    onClick={() => setTypeId(t.id)}
                  >
                    {t.label}
                  </Choice>
                ))}
              </div>
            </Group>

            <Group label="규모는 어느 정도인가요?">
              <div className="grid grid-cols-3 gap-2">
                {estimatorScales.map((s) => (
                  <Choice
                    key={s.id}
                    active={scaleId === s.id}
                    onClick={() => setScaleId(s.id)}
                    sub={s.note}
                  >
                    {s.label}
                  </Choice>
                ))}
              </div>
            </Group>

            <Group label="추가 기능 (선택)">
              <div className="flex flex-wrap gap-2">
                {estimatorOptions.map((o) => {
                  const on = opts.has(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(o.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors",
                        on
                          ? "border-violet/50 bg-violet/15 text-ink"
                          : "border-white/10 bg-white/[0.03] text-ink-muted hover:border-white/25",
                      )}
                    >
                      <Icon
                        name={on ? "check" : "sparkles"}
                        size={14}
                        className={on ? "text-cyan-soft" : "text-ink-faint"}
                      />
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </Group>
          </div>

          {/* Result */}
          <div className="flex flex-col rounded-3xl bg-gradient-to-br from-violet/30 via-surface to-cyan/20 p-px shadow-glow">
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-surface/80 p-7 backdrop-blur-xl md:p-8">
              <div>
                <span className="text-sm text-ink-muted">예상 견적</span>
                <p className="mt-2 font-display text-3xl font-bold tracking-tight text-gradient md:text-4xl">
                  {won(low)}
                  <span className="text-ink-faint"> ~ </span>
                  {won(high)}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                  <Icon name="bolt" size={16} className="text-cyan" />
                  예상 기간 약 {weeks[0]}~{weeks[1]}주
                </div>
                <p className="mt-5 text-xs leading-relaxed text-ink-faint">
                  참고용 예상 범위입니다. 실제 비용·일정은 요구사항에 따라
                  상담 후 정확히 안내드려요.
                </p>
              </div>

              <a
                href="#contact"
                onClick={onInquire}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform motion-safe:active:scale-95"
              >
                이 조건으로 문의하기
                <Icon name="arrow-up-right" size={15} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-0.5 rounded-2xl border px-2 py-3 text-center transition-colors",
        active
          ? "border-violet/50 bg-violet/15"
          : "border-white/10 bg-white/[0.03] hover:border-white/25",
      )}
    >
      <span
        className={cn(
          "text-sm font-medium",
          active ? "text-ink" : "text-ink-muted",
        )}
      >
        {children}
      </span>
      {sub && <span className="text-[11px] text-ink-faint">{sub}</span>}
    </button>
  );
}
