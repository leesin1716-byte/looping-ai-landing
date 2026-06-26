import { stats } from "@/src/data/stats";
import Counter from "@/src/components/primitives/Counter";
import Reveal from "@/src/components/primitives/Reveal";
import Icon, { type IconName } from "@/src/components/primitives/Icon";

export default function StatsBar() {
  return (
    <section className="relative w-full overflow-hidden border-y border-white/5 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_120%_at_50%_50%,rgba(139,92,246,0.07),transparent_70%)]"
      />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-12 px-5 md:grid-cols-4 md:px-8">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.id}
            delay={i * 0.08}
            className="group flex flex-col items-center gap-2.5 px-2 text-center md:border-l md:border-white/10 md:first:border-l-0"
          >
            <span className="mb-1 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet/25 to-cyan/15 text-violet-soft shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-soft">
              <Icon name={stat.icon as IconName} size={18} />
            </span>
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
