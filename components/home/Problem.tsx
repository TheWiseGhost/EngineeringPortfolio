"use client";

import { Counter, Eyebrow, Reveal } from "../ui";

const marquee = [
  "LiDAR Time-of-Flight",
  "Ultrasonic Ranging",
  "RGB Camera",
  "IMU / GPS",
  "Directional Haptics",
  "Drop-off Detection",
  "Overhang Detection",
  "IEC 60601-1",
  "IP67 Target",
];

const stats = [
  { value: 4, suffix: " m", label: "Obstacle detection range", decimals: 0 },
  { value: 15, suffix: " cm", label: "Minimum drop-off detected ≥ 1 m ahead", decimals: 0 },
  { value: 98, prefix: "≥", suffix: "%", label: "Detection accuracy target", decimals: 0 },
  { value: 16, suffix: " h", label: "Minimum battery life", decimals: 0 },
];

export default function Problem() {
  return (
    <>
      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-ink-950/70 py-4 backdrop-blur">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-white/40">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m}
              <span className="text-ember-500">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
        <Reveal>
          <Eyebrow index="00">The Problem</Eyebrow>
        </Reveal>
        <div className="mt-10 grid items-end gap-10 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="font-display text-[clamp(6rem,18vw,15rem)] font-semibold leading-[0.8] tracking-[-0.06em]">
              <Counter to={46.7} decimals={1} />
              <span className="text-ember-500">%</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-display text-2xl leading-snug tracking-tight text-white md:text-3xl">
              of visually impaired people report a fall every year.
            </p>
            <p className="mt-5 leading-relaxed text-white/55">
              The white cane sweeps the ground directly ahead — but it can&apos;t reliably warn about a{" "}
              <span className="text-white">steep drop-off</span> a metre away, or an{" "}
              <span className="text-white">overhanging obstacle</span> at head height. Falls lead to injury and a loss
              of independence. A more reliable aid is urgently needed.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="group bg-ink-950 p-6 transition-colors hover:bg-ink-900 md:p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                SPEC-{String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                <Counter to={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-white/50">{s.label}</div>
              <div className="mt-6 h-px w-full origin-left scale-x-0 bg-ember-500 transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
