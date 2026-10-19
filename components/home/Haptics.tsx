"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow, Reveal } from "../ui";

type Side = "L" | "R" | "B";
type Pattern = { name: string; group: "Obstacle" | "Direction" | "System"; desc: string; side: Side; amp: (t: number) => number };

const pulse = (t: number, period: number, on: number) => (t % period < on ? 1 : 0);

const patterns: Pattern[] = [
  { name: "Overhanging", group: "Obstacle", desc: "Spike pulse", side: "B", amp: (t) => Math.exp(-((t % 1.1) * 28)) },
  { name: "Steep drop-off", group: "Obstacle", desc: "Continuous buzz", side: "B", amp: (t) => 0.82 + Math.sin(t * 70) * 0.1 },
  {
    name: "Ledge",
    group: "Obstacle",
    desc: "Escalating pulse",
    side: "B",
    amp: (t) => {
      const p = (t % 2) / 2;
      return pulse(t, 0.22 - p * 0.12, 0.07) * (0.25 + p * 0.75);
    },
  },
  { name: "Ground obstacle", group: "Obstacle", desc: "Rapid repeating pulse", side: "B", amp: (t) => pulse(t, 0.18, 0.08) },
  { name: "Hazardous surface", group: "Obstacle", desc: "Slow, strong, repeating", side: "B", amp: (t) => Math.max(0, Math.sin(((t % 1.6) / 1.6) * Math.PI * 2)) },
  { name: "Left obstacle", group: "Direction", desc: "Single pulse · left", side: "L", amp: (t) => pulse(t, 1.4, 0.3) },
  { name: "Right obstacle", group: "Direction", desc: "Single pulse · right", side: "R", amp: (t) => pulse(t, 1.4, 0.3) },
  { name: "Center obstacle", group: "Direction", desc: "Sync pulse · both", side: "B", amp: (t) => pulse(t, 1.4, 0.3) },
  { name: "Critical proximity", group: "Direction", desc: "Rapid staccato", side: "B", amp: (t) => pulse(t, 0.11, 0.05) },
  { name: "Low battery · 15%", group: "System", desc: "Double long pulse", side: "B", amp: (t) => { const x = t % 3; return x < 0.5 || (x > 0.75 && x < 1.25) ? 1 : 0; } },
  { name: "Critical battery · 5%", group: "System", desc: "Continuous short pulse", side: "B", amp: (t) => pulse(t, 0.4, 0.14) },
];

export default function Haptics() {
  const [active, setActive] = useState(1);
  const canvas = useRef<HTMLCanvasElement>(null);
  const left = useRef<SVGGElement>(null);
  const right = useRef<SVGGElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    const t0 = performance.now();
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (c.width !== w * dpr) {
        c.width = w * dpr;
        c.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const p = patterns[activeRef.current];
      const now = (performance.now() - t0) / 1000;
      const window_ = 4; // seconds shown
      // baseline grid
      ctx.strokeStyle = "rgba(20,20,20,0.06)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (h / 4) * i);
        ctx.lineTo(w, (h / 4) * i);
        ctx.stroke();
      }
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(255,107,26,0)");
      grad.addColorStop(1, "rgba(255,107,26,1)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 1.5) {
        const t = now - window_ + (x / w) * window_;
        const a = Math.max(0, Math.min(1, p.amp(t < 0 ? 0 : t)));
        const y = h - 8 - a * (h - 24);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      const a = Math.max(0, Math.min(1, p.amp(now)));
      ctx.fillStyle = "#ff6b1a";
      ctx.beginPath();
      ctx.arc(w - 3, h - 8 - a * (h - 24), 3.5, 0, Math.PI * 2);
      ctx.fill();

      const on = (s: "L" | "R") => (p.side === "B" || p.side === s ? a : 0);
      for (const [el, s] of [[left.current, "L"], [right.current, "R"]] as const) {
        if (!el) continue;
        const v = on(s);
        el.style.opacity = String(0.25 + v * 0.75);
        el.style.transform = `scale(${1 + v * 0.35})`;
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const groups = ["Obstacle", "Direction", "System"] as const;
  const current = patterns[active];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <Reveal>
        <Eyebrow index="03">Haptic Language</Eyebrow>
      </Reveal>
      <Reveal>
        <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
          Every hazard has its own <span className="text-ember-500">feel</span>.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-5 max-w-xl leading-relaxed text-fg/55">
          Discreet, non-audio feedback. Each obstacle class and direction maps to a distinct vibration pattern, targeting
          100% user recognition. Pick one to feel it.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="space-y-6">
          {groups.map((g) => (
            <div key={g}>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/35">{g}</div>
              <div className="flex flex-wrap gap-2">
                {patterns.map((p, i) =>
                  p.group !== g ? null : (
                    <button
                      key={p.name}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                        active === i
                          ? "border-ember-500 bg-ember-500/10 text-fg"
                          : "border-fg/10 text-fg/60 hover:border-fg/30 hover:text-fg"
                      }`}
                    >
                      {p.name}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="cad-frame overflow-hidden rounded-sm border border-fg/10 bg-panel/70">
            <div className="flex items-center justify-between border-b border-fg/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-fg/60">Actuator Monitor</span>
              <span className="flex items-center gap-2 text-ember-500">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-ember-500" /> Live
              </span>
            </div>
            <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
              <div className="flex items-center justify-center border-b border-fg/10 p-6 sm:border-b-0 sm:border-r">
                {/* top-down head */}
                <svg viewBox="0 0 140 150" className="h-40 w-auto overflow-visible">
                  {/* top-down head */}
                  <circle cx="70" cy="80" r="40" fill="none" stroke="rgba(20,20,20,0.3)" strokeWidth="1.2" />
                  <path d="M64,41 L70,32 L76,41" fill="none" stroke="rgba(20,20,20,0.3)" strokeWidth="1.2" />
                  <path d="M28,70 q-6,10 0,20 M112,70 q6,10 0,20" fill="none" stroke="rgba(20,20,20,0.3)" strokeWidth="1.2" />
                  {/* glasses: front bar + temples */}
                  <path d="M30,52 Q70,34 110,52" fill="none" stroke="rgba(20,20,20,0.85)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M30,52 L28,98 M110,52 L112,98" fill="none" stroke="rgba(20,20,20,0.55)" strokeWidth="2" strokeLinecap="round" />
                  <g ref={left} style={{ transformOrigin: "26px 86px", transformBox: "view-box" }}>
                    <circle cx="26" cy="86" r="12" fill="none" stroke="#ff6b1a" strokeOpacity="0.45" />
                    <circle cx="26" cy="86" r="6.5" fill="#ff6b1a" />
                  </g>
                  <g ref={right} style={{ transformOrigin: "114px 86px", transformBox: "view-box" }}>
                    <circle cx="114" cy="86" r="12" fill="none" stroke="#ff6b1a" strokeOpacity="0.45" />
                    <circle cx="114" cy="86" r="6.5" fill="#ff6b1a" />
                  </g>
                  <text x="26" y="140" textAnchor="middle" className="fill-fg/40 font-mono" fontSize="9">L</text>
                  <text x="114" y="140" textAnchor="middle" className="fill-fg/40 font-mono" fontSize="9">R</text>
                  <text x="70" y="26" textAnchor="middle" className="fill-fg/30 font-mono" fontSize="7">FRONT</text>
                </svg>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-2xl font-medium tracking-tight">{current.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">{current.group}</div>
                </div>
                <div className="mt-1 text-sm text-ember-400">{current.desc}</div>
                <canvas ref={canvas} className="mt-5 h-32 w-full" />
                <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-fg/30">
                  <span>−4.0 s</span>
                  <span>Amplitude</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
