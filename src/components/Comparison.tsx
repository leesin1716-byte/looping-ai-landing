import { comparison } from "@/src/data/comparison";
import Section from "@/src/components/primitives/Section";
import SectionHeading from "@/src/components/primitives/SectionHeading";
import Reveal from "@/src/components/primitives/Reveal";
import Icon from "@/src/components/primitives/Icon";

export default function Comparison() {
  return (
    <Section id="compare">
      <SectionHeading
        eyebrow="Compare"
        title={
          <>
            직접 만들기도, 외주도 아닌{" "}
            <span className="text-gradient">제3의 선택</span>
          </>
        }
        subtitle="같은 결과물을 더 빠르고 합리적으로. 한눈에 비교해 보세요."
      />

      <Reveal className="mt-12">
        <div className="overflow-x-auto no-scrollbar fade-x md:overflow-visible">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[31%] p-4" />
                <th className="p-4 text-center text-sm font-medium text-ink-muted">
                  직접 개발
                </th>
                <th className="p-4 text-center text-sm font-medium text-ink-muted">
                  일반 외주
                </th>
                <th className="p-3 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet to-cyan px-3.5 py-1.5 text-sm font-bold text-white shadow-glow">
                    <Icon name="loop" size={15} />
                    Looping Ai
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((r, i) => {
                const first = i === 0;
                const last = i === comparison.length - 1;
                return (
                  <tr key={r.feature} className="group">
                    <th
                      scope="row"
                      className="border-t border-white/10 p-4 text-sm font-semibold"
                    >
                      {r.feature}
                    </th>
                    <td className="border-t border-white/10 p-4 text-center text-sm text-ink-faint">
                      {r.diy}
                    </td>
                    <td className="border-t border-white/10 p-4 text-center text-sm text-ink-muted">
                      {r.agency}
                    </td>
                    <td
                      className={[
                        "border-x border-violet/20 bg-violet/[0.07] p-4 text-center text-sm font-medium text-ink",
                        first ? "rounded-t-2xl border-t" : "border-t border-t-white/10",
                        last ? "rounded-b-2xl border-b border-b-violet/20" : "",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <Icon name="check" size={14} className="text-cyan-soft" />
                        {r.us}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
