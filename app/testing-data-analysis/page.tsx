"use client";

import { motion } from "framer-motion";

export default function TestingDataAnalysis() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Testing, Data Collection, and Analysis
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8"
          >
            <h2 className="font-display text-2xl font-semibold mb-4 text-white">
              Overview
            </h2>
            <div className="prose prose-invert max-w-none space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The report documents how the Advanced Multi-Sensing Mobility System prototype was exercised against the team&apos;s formal testing plan: recorded trials, structured datasheets, and quantitative comparison to the pass criteria defined before data collection. Testing focused on whether sensing and feedback behaved reliably enough for daily mobility—especially obstacle avoidance and hazard recognition—rather than on marketing claims or unfinished features that were explicitly deferred (such as full fall-detection networking or certification-level environmental sealing).
              </p>
              <p className="text-gray-300 leading-relaxed">
                Three coordinated tracks drove data collection. Environmental reliability challenged the stack under clear, rain-simulated, fog-like, bright, dark, and low-battery conditions, with navigation outcomes scored against a detection-accuracy framework using true positives, false positives, and false negatives so performance could be discussed in engineering terms instead of anecdotal impressions. Obstacle-detection trials exercised distinct hazard classes—overhangs, steep drop-offs, ledges, ground obstacles, and hazardous surfaces—with each class mapped to an intended haptic pattern so classification correctness and user recognition could be logged side by side with response times and qualitative notes.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The user-feedback track isolated haptics and battery alerting: directional pulses for left, right, and center threats; escalating cues for proximity; and staged low-power warnings, measured against targets for recognition accuracy and minimum warning lead time before shutdown. Analysis ties raw datasheet entries to those criteria, highlights where hardware or tuning fell short, and states conclusions that feed iteration priorities—what must change before the device could responsibly scale toward broader user trials or regulatory review.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                The embedded Google Doc below is the authoritative written report; this overview summarizes its scope and how it connects to the prototype testing and data collection plan elsewhere on this portfolio.
              </p>
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
                href="https://docs.google.com/document/d/1zkPNoUUUbNKTg3AT67J1wY2HgbjB_XPLDHF2OfpVaFA/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
              >
                <span>Open in new tab</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
              <iframe
                src="https://docs.google.com/document/d/1zkPNoUUUbNKTg3AT67J1wY2HgbjB_XPLDHF2OfpVaFA/preview"
                className="w-full h-full"
                title="Testing, Data Collection, and Analysis"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
