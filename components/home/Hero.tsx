"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Arrow, EASE, SplitHeading } from "../ui";

const GlassesCanvas = dynamic(() => import("../three/GlassesCanvas"), { ssr: false });

const readouts = [
  ["Range", "4.0 m"],
  ["Drop-off", "≥ 15 cm"],
  ["Accuracy", "> 98%"],
  ["Battery", "16 h"],
];

export default function Hero() {
  const [exploded, setExploded] = useState(false);
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    const t0 = performance.now();
    const id = setInterval(() => {
      const s = Math.floor((performance.now() - t0) / 1000);
      setClock(
        [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":")
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />

      <div className="pointer-events-none relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 md:static">
        <div className="relative z-10 max-w-[44rem] pt-6 md:pt-[6vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/60"
          >
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-ember-500" />
            Engineering Portfolio<span className="hidden sm:inline"> · Assistive Tech</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <SplitHeading text="Smart glasses" delay={0.15} />
            <br />
            <SplitHeading text="that see the" delay={0.3} className="text-fg/40" />{" "}
            <SplitHeading text="drop." delay={0.45} className="text-ember-500" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-md text-base leading-relaxed text-fg/60"
          >
            The <span className="text-fg">Advanced Multi-Sensing Mobility System</span> fuses LiDAR, ultrasonic and
            camera sensing with directional haptics to warn visually impaired users about steep drop-offs and
            overhanging obstacles — before they reach them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#process"
              className="group inline-flex items-center gap-2 rounded-xl bg-ember-500 px-5 py-3 text-sm font-medium text-inv transition-all hover:bg-ember-400 hover:shadow-[0_0_40px_-8px_#ff6b1a]"
            >
              Explore the process
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/notebook"
              className="inline-flex items-center gap-2 rounded-xl border border-fg/15 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-fg/40 hover:bg-fg/5"
            >
              Engineering notebook
            </Link>
          </motion.div>
        </div>

        {/* 3D stage: in-flow on phones, full-bleed behind the copy on desktop */}
        <div className="pointer-events-auto relative -mx-6 -mt-4 h-[44svh] min-h-[300px] md:absolute md:inset-0 md:left-[40%] md:mx-0 md:h-auto">
          <GlassesCanvas mode="hero" exploded={exploded} className="h-full w-full" />
        </div>

        {/* HUD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="relative z-10 mt-auto flex flex-col gap-4 pb-8 pt-10 md:flex-row md:items-end md:justify-between"
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-fg/10 bg-fg/10 backdrop-blur-md sm:grid-cols-4 md:w-[480px]">
            {readouts.map(([k, v]) => (
              <div key={k} className="bg-canvas/80 px-3 py-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-fg/40">{k}</div>
                <div className="mt-1 font-display text-base font-medium md:text-lg">{v}</div>
              </div>
            ))}
          </div>
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40 md:block">
              T+{clock} · Live render · Move cursor to orbit
            </div>
            <button
              onClick={() => setExploded((e) => !e)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                exploded
                  ? "border-ember-500 bg-ember-500/10 text-ember-400"
                  : "border-fg/15 bg-inv/40 text-fg/80 hover:border-fg/40"
              }`}
              aria-pressed={exploded}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                {exploded ? (
                  <path d="M9 9l-5-5m0 0v4m0-4h4M15 9l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4M15 15l5 5m0 0v-4m0 4h-4" />
                ) : (
                  <path d="M4 4l5 5m0 0V5m0 4H5M20 4l-5 5m0 0V5m0 4h4M4 20l5-5m0 0v4m0-4H5M20 20l-5-5m0 0v4m0-4h4" />
                )}
              </svg>
              {exploded ? "Assemble" : "Explode view"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
