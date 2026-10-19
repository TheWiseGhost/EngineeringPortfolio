"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { docUrl, elements } from "@/lib/elements";
import { Arrow, EASE, Eyebrow, SplitHeading } from "@/components/ui";

export default function Notebook() {
  return (
    <div className="relative px-6 pb-10 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Eyebrow index="A–I">Engineering notebook</Eyebrow>
        <h1 className="mt-8 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          <SplitHeading text="Engineering" delay={0.05} />
          <br />
          <SplitHeading text="notebook." delay={0.15} className="text-fg/40" />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-fg/55"
        >
          Every section of the engineering design process, A through I. Read the summary here, or open the original
          Google Doc.
        </motion.p>

        <ol className="mt-16 grid gap-4 md:grid-cols-2">
          {elements.map((el, i) => (
            <motion.li
              key={el.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05, duration: 0.6, ease: EASE }}
              className="group flex flex-col rounded-2xl border border-fg/10 bg-panel/70 p-6 backdrop-blur-sm transition-colors hover:border-ember-500/50"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-4xl font-semibold tracking-tight text-ember-500">{el.code}</span>
                <span className="pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/35">Element {el.code}</span>
              </div>
              <h2 className="mt-4 font-display text-xl font-medium tracking-tight md:text-2xl">{el.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg/50">{el.summary}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                <a
                  href={docUrl(el.docId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3.5 py-2 text-sm font-medium text-inv transition-colors hover:bg-ember-500"
                >
                  Open Google Doc <Arrow className="h-3.5 w-3.5" />
                </a>
                <Link
                  href={`/${el.slug}`}
                  className="inline-flex items-center rounded-lg border border-fg/15 px-3.5 py-2 text-sm font-medium transition-colors hover:border-fg/40"
                >
                  Read summary
                </Link>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
