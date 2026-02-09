"use client";

import { motion } from "framer-motion";

export default function DesignConcepts() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Design Concepts
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
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                Design concepts explore possible approaches to meeting the solution requirements for the Advanced Multi-Sensing Mobility System. This document presents and justifies design options, trade-offs, and conceptual solutions that inform the prototype and final product development.
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
                href="https://docs.google.com/document/d/1qMDeOl_mANzAF4QxUAS97axsFNMDlt2e8necap8w-lc/edit?tab=t.0"
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
                src="https://docs.google.com/document/d/1qMDeOl_mANzAF4QxUAS97axsFNMDlt2e8necap8w-lc/preview"
                className="w-full h-full"
                title="Design Concepts"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
