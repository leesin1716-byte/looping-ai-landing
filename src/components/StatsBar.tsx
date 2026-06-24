import { stats } from "@/src/data/stats";
import Counter from "@/src/components/primitives/Counter";
import Reveal from "@/src/components/primitives/Reveal";

export default function StatsBar() {
  return (
    <section className="relative w-full border-y border-white/5 py-14">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-10 px-5 md:grid-cols-4 md:px-8">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.id}
            delay={i * 0.08}
            className="flex flex-col items-center gap-1 px-2 text-center md:border-l md:border-white/10 md:first:border-l-0"
          >
            <span className="font-display text-4xl font-bold text-gradient md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm text-ink-muted">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
