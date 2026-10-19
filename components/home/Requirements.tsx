"use client";

import Link from "next/link";
import { Arrow, Eyebrow, Reveal } from "../ui";

const reqs = [
  ["Safety", "Obstacle detection", "≥ 98% accuracy within 4 m, across weather and lighting"],
  ["Safety", "Drop-off detection", "Height changes ≥ 15 cm flagged ≥ 1 m in advance"],
  ["Ergonomics", "Weight", "≤ 120% of a standard white cane (350–450 g)"],
  ["Durability", "Environment", "IP67 water resistance · 16 h minimum battery"],
  ["Compliance", "Standards", "IEC 60601-1 medical safety · FCC / CE EMC"],
  ["Sensing", "Multi-sensor fusion", "LiDAR, ultrasonic, camera, IMU / GPS"],
];

const findings = [
  "Drop-off detection is the primary technical gap in existing aids",
  "Haptic feedback dominates for non-intrusive spatial awareness",
  "Feature-heavy devices cost $500+ and face adoption barriers",
  "Cane-augmenting, low-cost wearables are the most practical form factor",
];

export default function Requirements() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-28 md:pt-36">
      <Reveal>
        <Eyebrow index="05">Requirements & Research</Eyebrow>
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-fg/10">
            <div className="grid grid-cols-[90px_1fr] border-b border-fg/10 bg-fg/[0.03] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40 sm:grid-cols-[110px_180px_1fr]">
              <span>Category</span>
              <span className="hidden sm:block">Requirement</span>
              <span>Specification</span>
            </div>
            {reqs.map(([cat, name, spec]) => (
              <div
                key={name}
                className="group grid grid-cols-[90px_1fr] items-baseline gap-y-1 border-b border-fg/5 px-5 py-4 transition-colors last:border-0 hover:bg-fg/[0.03] sm:grid-cols-[110px_180px_1fr]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ember-500">{cat}</span>
                <span className="font-medium text-fg">{name}</span>
                <span className="col-start-2 text-sm text-fg/55 sm:col-start-auto">{spec}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="font-display text-2xl font-semibold tracking-tight">What the market analysis found</h3>
          <ul className="mt-6 space-y-4">
            {findings.map((f, i) => (
              <li key={f} className="flex gap-4 text-fg/60">
                <span className="mt-0.5 font-mono text-xs text-ember-500">0{i + 1}</span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/patents-products" className="mt-8 inline-flex items-center gap-2 text-sm text-fg hover:text-ember-400">
            Read the full patents & products review <Arrow />
          </Link>
        </Reveal>
      </div>

      {/* CTA */}
      <Reveal>
        <Link
          href="/notebook"
          className="group relative mt-32 block overflow-hidden rounded-3xl border border-fg/10 bg-panel p-10 md:p-16"
        >
          <div className="absolute inset-0 bg-grid opacity-60 mask-fade" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ember-500/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-500">Elements A – I</div>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1] tracking-tight md:text-6xl">
                Open the engineering notebook.
              </h2>
            </div>
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-ember-500 text-inv transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
              <Arrow className="h-7 w-7" />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
