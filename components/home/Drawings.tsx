"use client";

import { DetectionDiagram, FrontBlueprint } from "../Blueprint";
import { Eyebrow, Panel, Reveal } from "../ui";

export default function Drawings() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <Reveal>
        <Eyebrow index="02">Technical Drawings</Eyebrow>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
            Designed in <span className="text-ember-500">CAD</span>,
            <br />
            driven by requirements.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-lg leading-relaxed text-white/55 md:justify-self-end">
            Sensor placement follows directly from the problem: the array sits on the brow bar, pitched down so drop-offs
            are caught a metre ahead, with the upper field covering overhangs a cane will never touch.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Panel title="DWG-001 · Front Elevation" meta="Illustrative · mm">
            <div className="relative bg-grid-fine p-4 md:p-6">
              <FrontBlueprint />
            </div>
            <TitleBlock rows={[["Part", "AMS frame assy."], ["Scale", "NTS"], ["Sheet", "1 / 2"]]} />
          </Panel>
        </Reveal>
        <Reveal delay={0.12}>
          <Panel title="DWG-002 · Detection Envelope" meta="Side elevation">
            <div className="relative bg-grid-fine p-4 md:p-6">
              <DetectionDiagram />
            </div>
            <TitleBlock rows={[["Req.", "Drop ≥ 15 cm @ ≥ 1 m"], ["Range", "4.0 m"], ["Sheet", "2 / 2"]]} />
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

function TitleBlock({ rows }: { rows: [string, string][] }) {
  return (
    <div className="grid grid-cols-3 border-t border-white/10 font-mono text-[10px] uppercase tracking-[0.15em]">
      {rows.map(([k, v], i) => (
        <div key={k} className={`px-4 py-3 ${i > 0 ? "border-l border-white/10" : ""}`}>
          <div className="text-white/30">{k}</div>
          <div className="mt-1 truncate text-white/80">{v}</div>
        </div>
      ))}
    </div>
  );
}
