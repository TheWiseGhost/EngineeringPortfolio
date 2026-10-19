"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Eyebrow } from "../ui";

const GlassesCanvas = dynamic(() => import("../three/GlassesCanvas"), { ssr: false });

const steps = [
  {
    k: "Assembly",
    title: "One frame. Three sensing layers.",
    body: "A forward LiDAR time-of-flight module, twin ultrasonic transducers and an RGB camera live in a single brow-bar housing — mounted at eye level, where a cane can't reach.",
  },
  {
    k: "Exploded",
    title: "Every subsystem has a job.",
    body: "In this concept model the battery and MCU + IMU are split across the temple arms to balance weight against the cane-equivalent weight budget. Haptic motors sit behind the ears for discreet, non-audio alerts.",
  },
  {
    k: "Sensing",
    title: "Angled down to catch the drop.",
    body: "Beams are pitched toward the ground so a 15 cm drop-off registers at least 1 m ahead, while the upper field watches for overhangs at head height.",
  },
];

function Step({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const a = i / steps.length;
  const b = (i + 1) / steps.length;
  const opacity = useTransform(progress, [a - 0.06, a + 0.04, b - 0.06, b + 0.02], [0, 1, 1, i === steps.length - 1 ? 1 : 0]);
  const y = useTransform(progress, [a - 0.06, a + 0.04], [24, 0]);
  const s = steps[i];
  return (
    <motion.div style={{ opacity, y }} className="[grid-area:1/1]">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-500">
        {String(i + 1).padStart(2, "0")} / {s.k}
      </div>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight md:mt-4 md:text-4xl">{s.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-fg/55 md:mt-4 md:text-base">{s.body}</p>
    </motion.div>
  );
}

export default function Exploded() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 pt-24">
          <Eyebrow index="01">Hardware Architecture · Exploded View</Eyebrow>
        </div>
        <div className="relative flex-1">
          {/* On desktop the canvas starts to the right of the copy card so labels never slide under it. */}
          <GlassesCanvas
            mode="scroll"
            progress={scrollYProgress}
            className="absolute inset-0 md:left-[calc(max(0px,(100%_-_80rem)/2)_+_29rem)]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:pb-0">
            <div className="relative z-30 rounded-2xl border border-fg/10 bg-canvas/85 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] backdrop-blur-md md:w-[27rem] md:p-8">
              <div className="grid">
                {steps.map((_, i) => (
                  <Step key={i} i={i} progress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 right-6 hidden w-48 md:block">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
              <span>Explode</span>
              <motion.span>{useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)}</motion.span>
            </div>
            <div className="mt-2 h-px bg-fg/10">
              <motion.div className="h-px bg-ember-500" style={{ width: bar }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
