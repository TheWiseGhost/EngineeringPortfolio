"use client";

import { motion } from "framer-motion";

export default function Notebook() {
  const handleOpenNotebook = () => {
    window.open(
      "https://docs.google.com/document/d/1PhXF3W-L3znEa1InXp31giSMZiSlV1BV2Kv9CXxpEMk/edit?tab=t.bwog6cnzcjxc",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Engineering Notebook
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-12"
          >
            Access the complete engineering documentation and development log
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={handleOpenNotebook}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Open Engineering Notebook
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

