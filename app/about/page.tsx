"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold mb-4 text-white">
                Why I Want to Do This
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                Technology has the power to transform lives and break down barriers that limit human potential. When I learned that nearly half of all visually impaired individuals experience falls each year—often resulting in serious injuries and loss of independence—I knew I had to act. This project represents more than just an engineering challenge; it's an opportunity to create meaningful impact in people's daily lives.

                My passion for building solutions that matter drives me to push the boundaries of what's possible. By combining cutting-edge sensor technology, computer vision, and intuitive user experience design, I believe we can create a system that not only prevents injuries but also restores confidence and autonomy to those who need it most. Every line of code, every design decision, and every iteration brings us closer to a world where visual impairment doesn't mean limited mobility or constant fear of injury.

                This project is my commitment to using engineering skills for social good—to build something that truly makes a difference in people's lives.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <h2 className="font-display text-2xl font-semibold mb-4 text-white">
                Connect With Me
              </h2>
              <p className="text-gray-300 mb-6">
                Explore more of my work and connect with me:
              </p>
              <motion.a
                href="https://adityabyju.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                View My Portfolio
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

