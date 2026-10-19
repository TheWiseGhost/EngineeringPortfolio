import DocPage from "@/components/DocPage";

export default function TestingDataAnalysis() {
  return (
    <DocPage
      slug="testing-data-analysis"
      overview={
        <>
          <p>
            The report documents how the Advanced Multi-Sensing Mobility System prototype was exercised against the
            team&apos;s formal testing plan: recorded trials, structured datasheets, and quantitative comparison to the
            pass criteria defined before data collection.
          </p>
          <p className="text-base text-white/55">
            Testing focused on whether sensing and feedback behaved reliably enough for daily mobility — especially
            obstacle avoidance and hazard recognition — rather than on marketing claims or unfinished features that were
            explicitly deferred (such as full fall-detection networking or certification-level environmental sealing).
          </p>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            k: "Track 01",
            t: "Environmental reliability",
            d: "Clear, rain-simulated, fog-like, bright, dark and low-battery conditions, scored with a TP / FP / FN detection-accuracy framework so performance is discussed in engineering terms, not anecdotes.",
          },
          {
            k: "Track 02",
            t: "Obstacle detection",
            d: "Overhangs, steep drop-offs, ledges, ground obstacles and hazardous surfaces — each mapped to an intended haptic pattern so classification and recognition are logged side by side with response times.",
          },
          {
            k: "Track 03",
            t: "User feedback",
            d: "Directional pulses for left, right and center threats, escalating proximity cues, and staged low-power warnings measured against recognition accuracy and minimum warning lead time.",
          },
        ].map((c) => (
          <div key={c.k} className="group rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-colors hover:border-ember-500/50">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember-500">{c.k}</div>
            <h3 className="mt-3 font-display text-xl font-medium tracking-tight">{c.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">{c.d}</p>
          </div>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-white/45">
        Analysis ties raw datasheet entries to those criteria, highlights where hardware or tuning fell short, and states
        conclusions that feed iteration priorities — what must change before the device could responsibly scale toward
        broader user trials or regulatory review. The embedded document below is the authoritative written report.
      </p>
    </DocPage>
  );
}
