"use client";

import { useEffect, useRef } from "react";

// Fixed CAD grid with a crosshair cursor + live coordinate readout.
export default function Backdrop() {
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const tick = () => {
      gx += (x - gx) * 0.08;
      gy += (y - gy) * 0.08;
      if (hRef.current) hRef.current.style.transform = `translateY(${y}px)`;
      if (vRef.current) vRef.current.style.transform = `translateX(${x}px)`;
      if (glowRef.current) glowRef.current.style.transform = `translate(${gx - 300}px, ${gy - 300}px)`;
      if (readoutRef.current) {
        readoutRef.current.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
        readoutRef.current.textContent = `X ${String(Math.round(x)).padStart(4, "0")}  Y ${String(
          Math.round(y + window.scrollY)
        ).padStart(4, "0")}`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,26,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#070707_100%)]" />
      <div
        ref={glowRef}
        className="absolute left-0 top-0 hidden h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.07),transparent_65%)] md:block"
      />
      <div className="hidden md:block">
        <div ref={hRef} className="absolute left-0 top-0 h-px w-full bg-white/[0.06]" />
        <div ref={vRef} className="absolute left-0 top-0 h-full w-px bg-white/[0.06]" />
        <div
          ref={readoutRef}
          className="absolute left-0 top-0 whitespace-pre font-mono text-[10px] tracking-wider text-ember-500/70"
        />
      </div>
    </div>
  );
}
