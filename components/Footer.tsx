import Link from "next/link";
import { elements } from "@/lib/elements";
import Logo from "./Logo";
import { Arrow } from "./ui";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/10 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-5 w-auto" />
            <span className="font-display font-semibold">AMS</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Advanced Multi-Sensing Mobility System — smart glasses that detect drop-offs and overhanging obstacles
            for people with visual impairments.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Shrihit Bhattiprolu · Aditya Byju · Anirudh Tarur
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="col-span-2">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Documentation</div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {elements.map((el) => (
                <li key={el.slug}>
                  <Link href={`/${el.slug}`} className="group flex gap-2 text-sm text-white/60 hover:text-white">
                    <span className="font-mono text-xs text-white/25 group-hover:text-ember-500">{el.code}</span>
                    {el.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Project</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/notebook" className="hover:text-white">Notebook</Link></li>
              <li>
                <a href="https://adityabyju.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  Portfolio <Arrow className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span>Engineering Portfolio · 2026</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-ember-500" /> System Nominal
          </span>
        </div>
      </div>
    </footer>
  );
}
