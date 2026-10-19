"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DocPage from "@/components/DocPage";
import { Reveal } from "@/components/ui";

const specs = [
  {
    t: "Obstacle & Hazard Detection",
    items: [
      ["Obstacle detection", "Detect at least 4 m ahead; obstacles of all heights; non-contact detection."],
      ["Drop-off warning", "Stairs, steep drops, manholes. Alerts for a drop of 15+ cm at least 1 m before the obstacle."],
    ],
  },
  {
    t: "Environmental Reliability",
    items: [["All conditions", "High accuracy in rain, light snow, fog, bright sunlight, low light and indoors. Consistent across environments."]],
  },
  {
    t: "User Feedback & Interface",
    items: [
      ["Haptic feedback", "Vibration-based alerts for obstacles and hazards; discreet, non-audio communication."],
      ["Low battery warning", "Notifies the user before critical level, with enough time to recharge safely."],
    ],
  },
  {
    t: "Safety & Emergency",
    items: [
      ["Fall detection", "Detects sudden impacts or abnormal motion; triggers emergency protocols."],
      ["Emergency contacts", "Alerts pre-set contacts and shares location during emergencies."],
    ],
  },
  {
    t: "Regulatory Compliance",
    items: [["Standards", "Meets medical and assistive device safety standards; electrical and wireless regulations."]],
  },
  {
    t: "Ergonomics & Physical Design",
    items: [
      ["Weight & balance", "Lightweight for long-term comfort; evenly distributed to reduce strain."],
      ["Materials & durability", "Impact-resistant; withstands daily wear and minor drops."],
      ["Water & dust", "Protected against light rain and dust; indoor and outdoor use."],
    ],
  },
  {
    t: "Connectivity & Intelligence",
    items: [
      ["GPS & navigation", "Real-time location tracking; turn-by-turn navigation."],
      ["AI landmark recognition", "Identifies important buildings or locations; contextual audio feedback."],
      ["Accessible charging", "Easy-to-locate port or magnetic connector."],
    ],
  },
];

const deferred = [
  ["Fall Detection", "Requires advanced motion sensors and impact calibration not yet integrated; proper testing needs controlled fall simulations."],
  ["Emergency Contact Notification", "Depends on smartphone connectivity, network access and software integration; prototype focused on hardware-based detection."],
  ["Regulatory Compliance", "Verification occurs after final design; prototype stage focuses on functional performance."],
  ["Weight & Balance", "Prototype does not represent final materials or component layout; ergonomic testing planned for refined design."],
  ["Materials & Durability", "Prototype uses temporary materials; stress/drop/wear testing in later production stages."],
  ["Water & Dust Resistance", "Prototype not sealed to final standards; resistance testing on finalized housing."],
  ["GPS & Navigation Integration", "Requires full GPS modules and software; current phase focused on core obstacle detection."],
  ["AI Landmark Recognition", "Depends on advanced AI and camera processing planned for future development."],
  ["Accessible Charging Interface", "Charging design optimized during final refinement; secondary to validating safety."],
];

type Test = {
  name: string;
  where: string;
  summary: string;
  purpose: string;
  pass: string;
  fail: string;
  notes: string[];
  table: { head: string[]; rows: string[][] };
};

const tests: Test[] = [
  {
    name: "Environmental Reliability",
    where: "Team member's house",
    summary: "Maintain high detection accuracy (>98%) in various environments.",
    purpose: "Verify that the system maintains accurate and reliable object detection across different real-world environmental conditions.",
    pass: "Test subject reliably navigates under different conditions (cameras/sensors restricted) without hitting obstacles. Obstacles avoided >98% of the time.",
    fail: "Subject cannot reliably navigate; obstacles avoided <98% of the time.",
    notes: [
      "Accuracy = (TP + TN) / (TP + TN + FP + FN). TP = correct obstacle ID; FP = ghost detection; FN = missed obstacle.",
      "Environmental factors (e.g. rain) tested with standard procedures — constant spray 5 L/min, 45° nozzle.",
      "Materials: visual impairment glasses, chairs, lights, tape, indoor environments, stairs.",
      "Termination: if the test taker becomes very disoriented, motion sick, or experiences eye/frame discomfort.",
    ],
    table: {
      head: ["Environment", "Detection / Recognition / Response / Feedback"],
      rows: [["Clear", "—"], ["Rain", "—"], ["Fog", "—"], ["Bright", "—"], ["Dark", "—"], ["Crit. battery (5%)", "—"]],
    },
  },
  {
    name: "Obstacle Detection",
    where: "Team member's house",
    summary: "Maintain high detection accuracy (>98%) for different obstacle types (curbs to overhanging).",
    purpose: "Verify that the system detects and classifies the correct type of obstacle.",
    pass: "System correctly identifies obstacle and user is alerted; correct identification ≥98% of the time.",
    fail: "Incorrect classification or no identification; obstacles avoided <98% of the time.",
    notes: [
      "Materials: visual impairment glasses, chairs, hanging lights, mid–large objects.",
      "Termination: if the procedure becomes too dangerous (disorientation, motion sickness, eye/frame discomfort).",
    ],
    table: {
      head: ["Obstacle", "Haptic pattern", "Recognition / Response / Notes"],
      rows: [
        ["Overhanging", "Spike pulse", "—"],
        ["Steep drop-offs", "Continuous buzz", "—"],
        ["Ledges", "Escalating pulse", "—"],
        ["Ground obstacles", "Rapid repeating pulse", "—"],
        ["Surface (swamp/mud/water)", "Slow, strong, repeating", "—"],
        ["Surface (uneven ground)", "Slow, strong, repeating", "—"],
      ],
    },
  },
  {
    name: "User Feedback & Interface",
    where: "Team lab / indoor environment",
    summary: "100% user recognition of haptic alerts; battery warnings with at least 5 minutes lead time before shutdown.",
    purpose: "Verify that haptic feedback communicates spatial information effectively and that low-battery alerts are clear and timely without causing alarm or confusion.",
    pass: "User identifies direction/intensity of haptic feedback 100% of the time. Low battery warnings fire at thresholds (15%, 5%) and are perceived.",
    fail: "User misses a haptic cue or misinterprets direction. System shuts down without a distinct warning, or the warning is too subtle during use.",
    notes: [
      "Materials: prototype glasses with haptic motors, mobile dashboard/testing app, variable power supply, blindfold, stopwatch.",
      "Initial conditions: glasses fully charged and connected; quiet environment so the user focuses on tactile cues.",
      "Procedure: calibrate vibration to “clear but comfortable” → blind directional test → simulate 20%→0% battery → haptic-only test walk.",
      "Termination: significant discomfort (tingling, numbness), frames noticeably hot, or motors fail to actuate consistently.",
    ],
    table: {
      head: ["Alert type", "Haptic pattern", "Recognition / Response / Notes"],
      rows: [
        ["Left obstacle", "Single pulse (left)", "—"],
        ["Right obstacle", "Single pulse (right)", "—"],
        ["Center obstacle", "Sync pulse (both)", "—"],
        ["Critical proximity", "Rapid staccato pulsing", "—"],
        ["Low battery (15%)", "Double long pulse", "—"],
        ["Crit. battery (5%)", "Continuous short pulse", "—"],
      ],
    },
  },
];

export default function PrototypeTesting() {
  const [tab, setTab] = useState(0);
  const [showDeferred, setShowDeferred] = useState(false);
  const t = tests[tab];

  return (
    <DocPage
      slug="prototype-testing"
      overview={
        <p>
          Visually impaired people face a high risk of serious injury from falls, largely because current aids don&apos;t
          reliably warn about steep drop-offs or overhanging obstacles. This plan defines the design specifications for
          the visual aid glasses — ordered most to least important — and the testing criteria used to validate the
          prototype.
        </p>
      }
    >
      {/* Specifications */}
      <section>
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Design specifications</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/30">Priority ↓</span>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {specs.map((s, i) => (
            <Reveal key={s.t} delay={(i % 2) * 0.06}>
              <div className="h-full rounded-2xl border border-fg/10 bg-panel/60 p-5 transition-colors hover:border-fg/25">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-ember-500">P{i + 1}</span>
                  <h3 className="font-medium text-fg">{s.t}</h3>
                </div>
                <dl className="mt-4 space-y-3">
                  {s.items.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-sm text-fg/80">{k}</dt>
                      <dd className="text-sm leading-relaxed text-fg/45">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <button
          onClick={() => setShowDeferred((s) => !s)}
          className="mt-4 flex w-full items-center justify-between rounded-2xl border border-dashed border-fg/15 px-5 py-4 text-left transition-colors hover:border-fg/30"
          aria-expanded={showDeferred}
        >
          <span>
            <span className="font-medium">Specifications not tested in this phase</span>
            <span className="ml-3 font-mono text-xs text-fg/40">{deferred.length} items</span>
          </span>
          <span className={`text-ember-500 transition-transform ${showDeferred ? "rotate-45" : ""}`}>+</span>
        </button>
        <AnimatePresence initial={false}>
          {showDeferred && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid gap-x-8 gap-y-4 px-5 pt-5 md:grid-cols-2">
                {deferred.map(([k, v]) => (
                  <li key={k} className="text-sm">
                    <div className="text-fg/80">{k}</div>
                    <div className="leading-relaxed text-fg/45">{v}</div>
                  </li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </section>

      {/* Tests */}
      <section>
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Testing criteria</h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/40">
            Shrihit Bhattiprolu · Aditya Byju · Anirudh Tarur · March 5–6, 2026
          </p>
        </Reveal>

        <div className="mt-6 flex gap-1 overflow-x-auto rounded-2xl border border-fg/10 bg-panel/60 p-1">
          {tests.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setTab(i)}
              className={`relative flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                tab === i ? "text-inv" : "text-fg/60 hover:text-fg"
              }`}
            >
              {tab === i && (
                <motion.span layoutId="test-tab" className="absolute inset-0 rounded-xl bg-fg" transition={{ type: "spring", stiffness: 400, damping: 35 }} />
              )}
              <span className="relative">
                <span className={`mr-2 font-mono text-xs ${tab === i ? "text-ember-600" : "text-fg/30"}`}>T{i + 1}</span>
                {x.name}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-4 rounded-2xl border border-fg/10 bg-panel/60 p-6 md:p-8"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">Location · {t.where}</div>
            <p className="mt-4 font-display text-2xl leading-snug tracking-tight">{t.summary}</p>
            <p className="mt-4 leading-relaxed text-fg/60">
              <span className="text-fg">Purpose — </span>
              {t.purpose}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-fg/15 bg-fg/[0.03] p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
                  <span className="h-1.5 w-1.5 rounded-full bg-fg" /> Pass
                </div>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{t.pass}</p>
              </div>
              <div className="rounded-xl border border-ember-500/30 bg-ember-500/[0.05] p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ember-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember-500" /> Fail
                </div>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{t.fail}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-2">
              {t.notes.map((n) => (
                <li key={n} className="flex gap-3 text-sm leading-relaxed text-fg/50">
                  <span className="mt-2 h-px w-3 shrink-0 bg-fg/30" />
                  {n}
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-x-auto rounded-xl border border-fg/10">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="bg-fg/[0.03] font-mono text-[10px] uppercase tracking-[0.15em] text-fg/40">
                    {t.table.head.map((h) => (
                      <th key={h} className="px-4 py-3 font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.table.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-fg/5 transition-colors hover:bg-fg/[0.03]">
                      {r.map((c, ci) => (
                        <td key={ci} className={`px-4 py-3 ${ci === 0 ? "text-fg" : ci === 1 && r.length === 3 ? "text-ember-400" : "text-fg/40"}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </DocPage>
  );
}
