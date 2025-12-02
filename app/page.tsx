"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent"
          >
            Advanced Multi-Sensing
            <br />
            Mobility System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Smart Glasses for the Visually Impaired
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6 mb-12"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-left">
              <h2 className="font-display text-2xl font-semibold mb-4 text-white">
                Problem Statement
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Visually impaired people face a high risk of serious injury from falls during daily mobility in various indoor and outdoor environments. This is primarily because current aids like canes don&apos;t reliably detect or warn users about steep drop-offs or overhanging obstacles. With 46.7% of visually impaired individuals reporting a fall each year, leading to injury and loss of independence, a more reliable solution is urgently needed to ensure their safety and mobility.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The Advanced Multi-Sensing Mobility System addresses this critical challenge through innovative smart glasses technology. By integrating advanced sensors, real-time processing, and intuitive haptic feedback, this system provides comprehensive environmental awareness that goes far beyond traditional mobility aids. The solution combines computer vision, depth sensing, and obstacle detection to create a reliable safety net that empowers visually impaired individuals to navigate their world with confidence and independence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/problem-statement">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Explore Problem Statement
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

