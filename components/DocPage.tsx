"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { elements, getElement } from "@/lib/elements";
import { Arrow, EASE, Reveal, SplitHeading } from "./ui";

export default function DocPage({
  slug,
  overview,
  children,
}: {
  slug: string;
  overview?: ReactNode;
  children?: ReactNode;
}) {
  const el = getElement(slug);
  const idx = elements.findIndex((e) => e.slug === slug);
  const prev = elements[idx - 1];
  const next = elements[idx + 1];

  return (
    <div className="relative px-6 pb-10 pt-32 md:pt-40">
      {/* giant outlined index */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="text-stroke pointer-events-none absolute right-[-2vw] top-16 select-none font-display text-[38vw] font-bold leading-none tracking-tighter md:text-[26vw]"
      >
        {el.code}
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/40"
        >
          <Link href="/" className="hover:text-fg">Home</Link>
          <span>/</span>
          <Link href="/#process" className="hover:text-fg">Documentation</Link>
          <span>/</span>
          <span className="text-ember-500">Element {el.code}</span>
        </motion.nav>

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
          <SplitHeading text={el.title} delay={0.1} />
        </h1>

        {/* element progress rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex gap-1.5"
        >
          {elements.map((e, i) => (
            <Link key={e.slug} href={`/${e.slug}`} className="group flex-1 py-2" title={e.title}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.5, ease: EASE }}
                className={`h-[3px] origin-left rounded-full transition-colors ${
                  i === idx ? "bg-ember-500" : i < idx ? "bg-fg/50" : "bg-fg/10 group-hover:bg-fg/30"
                }`}
              />
            </Link>
          ))}
        </motion.div>
        <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg/30">
          <span>Element {el.code} · {idx + 1} of {elements.length}</span>
          <span>{el.short}</span>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 space-y-10">
            <Reveal delay={0.2}>
              <div className="cad-frame border border-fg/10 bg-panel/60 p-6 backdrop-blur-sm md:p-10">
                <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember-500">Overview</div>
                <div className="space-y-5 text-lg leading-relaxed text-fg/75 md:text-xl">
                  {overview ?? <p>{el.summary}</p>}
                </div>
              </div>
            </Reveal>
            {children}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-fg/10 bg-panel/60 p-5 backdrop-blur-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">All elements</div>
                <ul className="mt-4 space-y-1">
                  {elements.map((e) => (
                    <li key={e.slug}>
                      <Link
                        href={`/${e.slug}`}
                        className={`flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                          e.slug === slug ? "bg-ember-500/10 text-fg" : "text-fg/50 hover:text-fg"
                        }`}
                      >
                        <span className={`font-mono text-[11px] ${e.slug === slug ? "text-ember-500" : "text-fg/25"}`}>{e.code}</span>
                        {e.short}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`https://docs.google.com/document/d/${el.docId}/edit`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl bg-fg px-5 py-4 text-sm font-medium text-inv transition-colors hover:bg-ember-500"
              >
                Open source document
                <Arrow className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <DocViewer docId={el.docId} title={el.title} code={el.code} />
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {prev ? <PagerCard el={prev} dir="prev" /> : <div className="hidden md:block" />}
          {next ? <PagerCard el={next} dir="next" /> : null}
        </div>
      </div>
    </div>
  );
}

function PagerCard({ el, dir }: { el: (typeof elements)[number]; dir: "prev" | "next" }) {
  return (
    <Link
      href={`/${el.slug}`}
      className={`group relative overflow-hidden rounded-2xl border border-fg/10 bg-panel/60 p-6 transition-colors hover:border-ember-500/60 ${
        dir === "next" ? "md:text-right" : ""
      }`}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
        {dir === "prev" ? "← Previous" : "Next →"} · {el.code}
      </div>
      <div className="mt-3 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-ember-400 md:text-2xl">
        {el.title}
      </div>
    </Link>
  );
}

export function DocViewer({ docId, title, code }: { docId: string; title: string; code: string }) {
  const [loaded, setLoaded] = useState(false);
  const [tall, setTall] = useState(false);
  return (
    <Reveal>
      <div className="cad-frame overflow-hidden border border-fg/10 bg-panel">
        <div className="flex items-center justify-between gap-4 border-b border-fg/10 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ember-500" />
            </div>
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.15em] text-fg/50">
              DOC-{code} · {title}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setTall((t) => !t)}
              className="hidden rounded-lg border border-fg/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/60 transition-colors hover:border-fg/30 hover:text-fg sm:block"
            >
              {tall ? "Collapse" : "Expand"}
            </button>
            <a
              href={`https://docs.google.com/document/d/${docId}/edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-ember-500 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-inv transition-colors hover:bg-ember-400"
            >
              Open <Arrow className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className={`relative w-full bg-inv transition-[height] duration-500 ${tall ? "h-[150vh]" : "h-[75vh]"}`}>
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden bg-panel">
              <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-ember-500/10 to-transparent" />
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-fg/10 border-t-ember-500" />
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">Loading document…</div>
            </div>
          )}
          <iframe
            src={`https://docs.google.com/document/d/${docId}/preview`}
            className="h-full w-full"
            title={title}
            allow="fullscreen"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </Reveal>
  );
}
