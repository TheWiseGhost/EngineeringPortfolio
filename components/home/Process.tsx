"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { elements } from "@/lib/elements";
import { Arrow, EASE, Eyebrow, Reveal } from "../ui";

export default function Process() {
  return (
    <section id="process" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow index="04">Design Process</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
              Eight elements,
              <br />
              <span className="text-fg/40">one system.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 leading-relaxed text-fg/55">
              From problem definition to tested prototype — each stage of the engineering design process is documented
              in full.
            </p>
          </Reveal>
        </div>

        <ol className="border-t border-fg/10">
          {elements.map((el, i) => (
            <motion.li
              key={el.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: EASE }}
              className="border-b border-fg/10"
            >
              <Link href={`/${el.slug}`} className="group relative flex items-start gap-5 overflow-hidden py-7 md:gap-8">
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-ember-500/[0.08] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative w-10 pt-1 font-mono text-sm text-fg/30 transition-colors group-hover:text-ember-500">
                  {el.code}
                </span>
                <div className="relative flex-1">
                  <h3 className="font-display text-xl font-medium tracking-tight text-fg md:text-2xl">{el.title}</h3>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-fg/45">{el.summary}</p>
                </div>
                <span className="relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-inv">
                  <Arrow className="h-4 w-4 -rotate-45" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
