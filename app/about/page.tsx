"use client";

import { motion } from "framer-motion";
import { Arrow, EASE, Eyebrow, Reveal, SplitHeading } from "@/components/ui";

const paragraphs = [
  "Technology has the power to transform lives and break down barriers that limit human potential. When I learned that nearly half of all visually impaired individuals experience falls each year — often resulting in serious injuries and loss of independence — I knew I had to act. This project represents more than just an engineering challenge; it's an opportunity to create meaningful impact in people's daily lives.",
  "My passion for building solutions that matter drives me to push the boundaries of what's possible. By combining cutting-edge sensor technology, computer vision, and intuitive user experience design, I believe we can create a system that not only prevents injuries but also restores confidence and autonomy to those who need it most. Every line of code, every design decision, and every iteration brings us closer to a world where visual impairment doesn't mean limited mobility or constant fear of injury.",
];

const team = ["Shrihit Bhattiprolu", "Aditya Byju", "Anirudh Tarur"];

export default function About() {
  return (
    <div className="relative px-6 pb-10 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Eyebrow index="↳">About the project</Eyebrow>
        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          <SplitHeading text="Engineering for" delay={0.05} />
          <br />
          <SplitHeading text="independence." delay={0.2} className="text-ember-500" />
        </h1>

        <div className="mt-20 grid gap-12 lg:grid-cols-[300px_1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">The team</div>
              <div className="mt-6 space-y-3">
                {team.map((n, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, ease: EASE }}
                    className="flex items-center gap-3 rounded-xl border border-fg/10 bg-panel/60 px-4 py-3"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fg/10 font-mono text-[11px]">
                      {n.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span className="text-sm">{n}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-10">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={`leading-relaxed ${i === 0 ? "font-display text-2xl tracking-tight text-fg md:text-3xl" : "text-lg text-fg/60"}`}>
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal>
              <blockquote className="border-l-2 border-ember-500 pl-6 font-display text-2xl leading-snug tracking-tight md:text-3xl">
                This project is my commitment to using engineering skills for social good — to build something that
                truly makes a difference in people&apos;s lives.
              </blockquote>
            </Reveal>

            <Reveal>
              <a
                href="https://adityabyju.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex items-center justify-between rounded-2xl border border-fg/10 bg-panel/60 p-6 transition-colors hover:border-ember-500/60"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">Connect</div>
                  <div className="mt-2 font-display text-2xl font-medium tracking-tight">View my portfolio</div>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fg text-inv transition-all group-hover:rotate-45 group-hover:bg-ember-500">
                  <Arrow className="h-5 w-5" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
