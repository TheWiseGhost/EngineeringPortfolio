"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/50">
      {index && <span className="text-ember-500">{index}</span>}
      <span className="h-px w-8 bg-fg/20" />
      <span>{children}</span>
    </div>
  );
}

export function Counter({ to, decimals = 0, suffix = "", prefix = "" }: { to: number; decimals?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [inView, mv, to]);
  // Reserve the final value's width and right-align the ticking number so layout never shifts.
  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap tabular-nums">
      <span className="invisible" aria-hidden>{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>
      <span className="sr-only">{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>
      <motion.span className="absolute inset-0 text-right" aria-hidden>
        {text}
      </motion.span>
    </span>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

// Splits a heading into words that rise in sequence.
export function SplitHeading({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Panel({ children, className = "", title, meta }: { children: ReactNode; className?: string; title?: string; meta?: string }) {
  return (
    <div className={`cad-frame rounded-sm border border-fg/10 bg-panel/70 backdrop-blur-sm ${className}`}>
      {(title || meta) && (
        <div className="flex items-center justify-between border-b border-fg/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="text-fg/60">{title}</span>
          <span className="text-fg/30">{meta}</span>
        </div>
      )}
      {children}
    </div>
  );
}
