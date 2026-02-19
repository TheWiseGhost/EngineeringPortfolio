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

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-left">
              <h2 className="font-display text-2xl font-semibold mb-4 text-white">
                Existing Solutions Analysis
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Analysis of existing patents and products reveals significant gaps in addressing steep drop-offs and overhanging obstacles. While solutions like WeWalk Smart Cane and Ray Electronic Mobility Aid address overhead obstacles, reliable drop-off detection remains a primary technical challenge. Most feature-heavy solutions (smart glasses, intelligent canes) are expensive ($500+) and face adoption barriers due to complexity, weight, or battery dependence.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Key findings from the evaluation include:
              </p>
              <ul className="text-gray-400 leading-relaxed list-disc list-inside space-y-2 mb-4">
                <li>Drop-off detection is a primary technical challenge that most solutions struggle with</li>
                <li>Haptic/vibrational feedback is the dominant modality for non-intrusive spatial awareness</li>
                <li>There&apos;s a critical trade-off between features, cost, and usability</li>
                <li>Prototype solutions like the Sensory Substitution Glove show promise but need more testing</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                The most practical solutions augment the traditional cane or use low-cost wearable form factors, suggesting that an effective new solution should balance comprehensive hazard detection with cost-effectiveness and intuitive user experience.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-left">
              <h2 className="font-display text-2xl font-semibold mb-4 text-white">
                Solution Requirements
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Based on feedback from experts, stakeholders (visually impaired individuals, caretakers, and ADA legislators), and comprehensive research of existing devices, the solution requirements have been carefully defined across three critical categories: User Safety and Navigation, Ergonomics and Durability, and Advanced Features.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Key requirements include:
              </p>
              <ul className="text-gray-400 leading-relaxed list-disc list-inside space-y-2 mb-4">
                <li>Accurate obstacle detection within 4-meter range with ≥98% accuracy in various weather and lighting conditions</li>
                <li>Reliable drop-off detection for height changes ≥15cm at least 1 meter in advance</li>
                <li>Weight not exceeding 120% of standard white cane (350-450g) to prevent user fatigue</li>
                <li>IP67 water resistance and 16-hour minimum battery life for daily reliability</li>
                <li>Compliance with IEC 60601-1 medical safety standards and FCC/CE electromagnetic compatibility</li>
                <li>Integrated multi-sensor approach (LiDAR, ultrasonic, camera, IMU/GPS) for comprehensive environmental awareness</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                These specifications ensure the solution addresses the core safety challenges while maintaining user-centric design, regulatory compliance, and long-term durability essential for a primary mobility aid.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-left">
              <h2 className="font-display text-2xl font-semibold mb-4 text-white">
                Design Concepts
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Design concepts explore possible approaches to meeting the solution requirements. The full document presents and justifies design options, trade-offs, and conceptual solutions that inform the prototype and final product development for the Advanced Multi-Sensing Mobility System.
              </p>
              <p className="text-gray-400 leading-relaxed">
                View the full Design Concepts document for detailed exploration of design alternatives and their justification.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-left">
              <h2 className="font-display text-2xl font-semibold mb-4 text-white">
                Construction of a Testable Prototype
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                This document (Element G) covers the construction of a testable prototype for the Advanced Multi-Sensing Mobility System. It details how design concepts are implemented into a physical prototype that can be evaluated and refined through testing.
              </p>
              <p className="text-gray-400 leading-relaxed">
                View the full document for build details, components, and prototype construction documentation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-12"
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
            <Link href="/patents-products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                View Patents & Products
              </motion.button>
            </Link>
            <Link href="/solution-requirements">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                View Solution Requirements
              </motion.button>
            </Link>
            <Link href="/design-concepts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                View Design Concepts
              </motion.button>
            </Link>
            <Link href="/testable-prototype">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                View Testable Prototype
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

