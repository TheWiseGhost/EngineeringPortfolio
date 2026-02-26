"use client";

import { motion } from "framer-motion";

const sectionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8",
};

export default function PrototypeTesting() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Prototype Testing and Data Collection Plan
          </h1>

          <motion.div {...sectionProps}>
            <h2 className="font-display text-2xl font-semibold mb-4 text-white">
              I. Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Visually impaired people face a high risk of serious injury from falls during daily mobility in various indoor and outdoor environments. This is primarily because current aids, like canes, don&apos;t reliably detect or warn users about steep drop-offs or overhanging obstacles. With 46.7% of visually impaired individuals reporting a fall each year, leading to injury and loss of independence, a more reliable solution is urgently needed to ensure their safety and mobility.
            </p>
          </motion.div>

          <motion.div {...sectionProps}>
            <h2 className="font-display text-2xl font-semibold mb-4 text-white">
              II. Design Specifications
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              These are the current design specifications for the visual aid glasses. Some specifications may have been changed from earlier due to further research. All criteria will be tested during the testing phase; the list is ordered from most to least important. Some previous specifications have been omitted or combined to keep the list compact and direct.
            </p>

            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">Obstacle & Hazard Detection</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><strong className="text-gray-300">Obstacle Detection:</strong> Detect at least 4 meters ahead; detect obstacles of all heights; provides non-contact detection.</li>
                  <li><strong className="text-gray-300">Drop-off warning:</strong> Detects stairs, steep drops, manholes, etc. Detects and alerts for a drop of 15+ cm, at least 1 meter before the obstacle.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Environmental Reliability</h3>
                <p className="text-gray-400">Maintains high accuracy of detection in rain, light snow, fog, bright sunlight, low light, and indoor environments. Consistent across different environments.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">User Feedback & Interface</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><strong className="text-gray-300">Haptic Feedback System:</strong> Vibration-based alerts for obstacles and hazards; discreet, non-audio communication.</li>
                  <li><strong className="text-gray-300">Low Battery Warning:</strong> Notifies the user before critical level; ensures enough time to recharge safely.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Safety & Emergency Systems</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Fall detection: detects sudden impacts or abnormal motion; automatically triggers emergency protocols if needed.</li>
                  <li>Emergency contact notification: sends alerts to pre-set contacts; shares location data during emergencies.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Regulatory Compliance</h3>
                <p className="text-gray-400">Meets medical and assistive device safety standards. Complies with electrical and wireless communication regulations.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Ergonomics & Physical Design</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><strong className="text-gray-300">Weight & Balance:</strong> Lightweight for long-term comfort; evenly distributed weight to reduce strain.</li>
                  <li><strong className="text-gray-300">Materials & Durability:</strong> Strong, impact-resistant materials; withstands daily wear and minor drops.</li>
                  <li><strong className="text-gray-300">Water & Dust Resistance:</strong> Protected against light rain and dust; suitable for outdoor and indoor use.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Connectivity & Intelligent Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><strong className="text-gray-300">GPS & Navigation Integration:</strong> Real-time location tracking; turn-by-turn navigation.</li>
                  <li><strong className="text-gray-300">AI Landmark Recognition:</strong> Identifies important buildings or locations; contextual audio feedback.</li>
                  <li><strong className="text-gray-300">Accessible Charging Interface:</strong> Easy-to-locate charging port or magnetic connector; simple, user-friendly charging.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="font-semibold text-white mb-3">Specifications Not Tested in This Phase</h3>
              <p className="text-gray-400 text-sm mb-4">The following were not tested in the current prototype phase for the reasons noted:</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><strong className="text-gray-300">Fall Detection:</strong> Requires advanced motion sensors and impact calibration not yet integrated; proper testing would need controlled fall simulations.</li>
                <li><strong className="text-gray-300">Emergency Contact Notification:</strong> Depends on smartphone connectivity, network access, and software integration; prototype focused on hardware-based detection.</li>
                <li><strong className="text-gray-300">Regulatory Compliance:</strong> Verification occurs after final design; prototype stage focuses on functional performance.</li>
                <li><strong className="text-gray-300">Weight & Balance:</strong> Prototype does not represent final materials or component layout; ergonomic testing planned for refined design.</li>
                <li><strong className="text-gray-300">Materials & Durability:</strong> Prototype uses temporary materials for functionality testing; stress/drop/wear testing in later production stages.</li>
                <li><strong className="text-gray-300">Water & Dust Resistance:</strong> Prototype not sealed to final standards; environmental resistance testing on finalized housing.</li>
                <li><strong className="text-gray-300">GPS & Navigation Integration:</strong> Requires full GPS modules and software; current phase focused on core obstacle detection.</li>
                <li><strong className="text-gray-300">AI Landmark Recognition:</strong> Depends on advanced AI and camera processing planned for future development; prototype prioritized basic hazard detection.</li>
                <li><strong className="text-gray-300">Accessible Charging Interface:</strong> Charging design optimization during final product refinement; secondary to validating safety performance.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div {...sectionProps}>
            <h2 className="font-display text-2xl font-semibold mb-6 text-white">
              III. Testing Criteria
            </h2>

            <div className="space-y-10">
              <div className="pb-8 border-b border-white/10 last:border-0 last:pb-0">
                <h3 className="text-xl font-semibold text-white mb-2">Test #1: Environmental Reliability</h3>
                <p className="text-gray-500 text-sm mb-4">Shrihit Bhattiprolu, Aditya Byju, Anirudh Tarur · March 5–6, 2026 · Team member&apos;s house</p>
                <p className="text-gray-400 text-sm mb-4"><strong className="text-gray-300">Incremental summary:</strong> Maintain high detection accuracy (&gt;98%) in various environments.</p>
                <p className="text-gray-300 mb-4"><strong className="text-white">Purpose:</strong> Verify that the system maintains accurate and reliable object detection across different real-world environmental conditions.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Pass</p>
                    <p className="text-gray-400 text-sm">Test subject reliably navigates under different conditions (cameras/sensors restricted) without hitting obstacles. Obstacles avoided &gt;98% of the time.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Fail</p>
                    <p className="text-gray-400 text-sm">Subject cannot reliably navigate; obstacles avoided &lt;98% of the time.</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">Accuracy = (TP + TN) / (TP + TN + FP + FN). TP = correct obstacle ID; FP = ghost detection; FN = missed obstacle.</p>
                <p className="text-gray-400 text-sm mb-4">Environmental factors (e.g., rain) tested with standard procedures (e.g., constant spray 5 L/min, 45° nozzle).</p>
                <p className="text-gray-400 text-sm"><strong className="text-gray-300">Materials:</strong> Visual impairment glasses, chairs, lights, tape, indoor environments, stairs. <strong className="text-gray-300">Termination:</strong> If test taker becomes very disoriented, motion sick, or experiences eye/frame discomfort.</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead><tr className="text-gray-400 border-b border-white/10"><th className="py-2 pr-4">Environment</th><th className="py-2">Detection / Recognition / Response / Feedback</th></tr></thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Clear</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Rain</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Fog</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Bright</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Dark</td><td className="py-2">—</td></tr>
                      <tr><td className="py-2 pr-4">Crit. Battery (5%)</td><td className="py-2">—</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pb-8 border-b border-white/10 last:border-0 last:pb-0">
                <h3 className="text-xl font-semibold text-white mb-2">Test #2: Obstacle Detection</h3>
                <p className="text-gray-500 text-sm mb-4">Shrihit Bhattiprolu, Aditya Byju, Anirudh Tarur · March 5–6, 2026 · Team member&apos;s house</p>
                <p className="text-gray-400 text-sm mb-4"><strong className="text-gray-300">Incremental summary:</strong> Maintain high detection accuracy (&gt;98%) for different obstacle types (curbs to overhanging).</p>
                <p className="text-gray-300 mb-4"><strong className="text-white">Purpose:</strong> Verify that the system detects and classifies the correct type of obstacle.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Pass</p>
                    <p className="text-gray-400 text-sm">System correctly identifies obstacle and user is alerted; correct identification ≥98% of the time.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Fail</p>
                    <p className="text-gray-400 text-sm">Incorrect classification or no identification; obstacles avoided &lt;98% of the time.</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4"><strong className="text-gray-300">Materials:</strong> Visual impairment glasses, chairs, hanging lights, mid–large objects. <strong className="text-gray-300">Termination:</strong> If procedure becomes too dangerous (disorientation, motion sickness, eye/frame discomfort).</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead><tr className="text-gray-400 border-b border-white/10"><th className="py-2 pr-4">Obstacle</th><th className="py-2">Haptic Pattern</th><th className="py-2">Recognition / Response / Notes</th></tr></thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Overhanging</td><td className="py-2">Spike pulse</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Steep drop-offs</td><td className="py-2">Continuous buzz</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Ledges</td><td className="py-2">Escalating pulse</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Ground obstacles</td><td className="py-2">Rapid repeating pulse</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Surface (swamp/mud/water)</td><td className="py-2">Slow, strong, repeating</td><td className="py-2">—</td></tr>
                      <tr><td className="py-2 pr-4">Surface (uneven ground)</td><td className="py-2">Slow, strong, repeating</td><td className="py-2">—</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Test #3: User Feedback & Interface</h3>
                <p className="text-gray-500 text-sm mb-4">Shrihit Bhattiprolu, Aditya Byju, Anirudh Tarur · March 5–6, 2026 · Team lab / indoor environment</p>
                <p className="text-gray-400 text-sm mb-4"><strong className="text-gray-300">Incremental summary:</strong> 100% user recognition of haptic alerts; battery warnings with at least 5 minutes lead time before shutdown.</p>
                <p className="text-gray-300 mb-4"><strong className="text-white">Purpose:</strong> Verify that haptic feedback effectively communicates spatial information and that low-battery alerts are clear and timely without causing alarm or confusion.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Pass</p>
                    <p className="text-gray-400 text-sm">User correctly identifies direction/intensity of haptic feedback 100% of the time. Low battery warnings at designated thresholds (e.g., 15%, 5%) and successfully perceived.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Fail</p>
                    <p className="text-gray-400 text-sm">User misses a haptic cue or misinterprets direction. System shuts down without distinct low-battery warning or warning too subtle during active use.</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2"><strong className="text-gray-300">Materials:</strong> Prototype smart glasses with haptic motors, mobile dashboard/testing app, variable power supply (simulate battery drain), blindfold, stopwatch.</p>
                <p className="text-gray-400 text-sm mb-2"><strong className="text-gray-300">Initial conditions:</strong> Glasses fully charged and connected; quiet environment so user focuses on tactile/haptic cues.</p>
                <p className="text-gray-400 text-sm mb-4"><strong className="text-gray-300">Termination:</strong> If user experiences significant discomfort (tingling, numbness), frames become noticeably hot, or haptic motors fail to actuate consistently. Calibration: adjust vibration intensity to &quot;clear but comfortable&quot; threshold. Blind haptic test: blindfolded random directional pulses; record directional ID accuracy. Threshold test: simulate 20%→0% battery; record when warnings trigger. Test walk: navigate clear path using only haptic cues.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead><tr className="text-gray-400 border-b border-white/10"><th className="py-2 pr-4">Alert Type</th><th className="py-2">Haptic Pattern</th><th className="py-2">Recognition / Response / Notes</th></tr></thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Left obstacle</td><td className="py-2">Single pulse (left)</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Right obstacle</td><td className="py-2">Single pulse (right)</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Center obstacle</td><td className="py-2">Sync pulse (both)</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Critical proximity</td><td className="py-2">Rapid staccato pulsing</td><td className="py-2">—</td></tr>
                      <tr className="border-b border-white/5"><td className="py-2 pr-4">Low battery (15%)</td><td className="py-2">Double long pulse</td><td className="py-2">—</td></tr>
                      <tr><td className="py-2 pr-4">Crit. battery (5%)</td><td className="py-2">Continuous short pulse</td><td className="py-2">—</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-semibold text-white">
                Full Documentation
              </h2>
              <motion.a
                href="https://docs.google.com/document/d/1Arlxrer9aI46gt4N5sbCe4p3lED62NHsA6ZTa472fq0/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
              >
                <span>Open in new tab</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
              <iframe
                src="https://docs.google.com/document/d/1Arlxrer9aI46gt4N5sbCe4p3lED62NHsA6ZTa472fq0/preview"
                className="w-full h-full"
                title="Prototype Testing and Data Collection Plan"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
