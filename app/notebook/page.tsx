"use client";

import { motion } from "framer-motion";
import { DocViewer } from "@/components/DocPage";
import { Arrow, EASE, Eyebrow, SplitHeading } from "@/components/ui";
import { NOTEBOOK_URL } from "@/lib/elements";

const NOTEBOOK_ID = "1PhXF3W-L3znEa1InXp31giSMZiSlV1BV2Kv9CXxpEMk";

export default function Notebook() {
  return (
    <div className="relative px-6 pb-10 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Eyebrow index="↳">Development log</Eyebrow>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1 className="max-w-3xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            <SplitHeading text="Engineering" delay={0.05} />
            <br />
            <SplitHeading text="notebook." delay={0.15} className="text-white/40" />
          </h1>
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ease: EASE }}
            href={NOTEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-xl bg-ember-500 px-5 py-3 text-sm font-medium text-black transition-all hover:bg-ember-400 hover:shadow-[0_0_40px_-8px_#ff6b1a] md:self-auto"
          >
            Open full notebook
            <Arrow className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </motion.a>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/55"
        >
          The complete engineering documentation and development log — every iteration, decision and test, as it
          happened.
        </motion.p>
        <div className="mt-14">
          <DocViewer docId={NOTEBOOK_ID} title="Engineering Notebook" code="NB" />
        </div>
      </div>
    </div>
  );
}
