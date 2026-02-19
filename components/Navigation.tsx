"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const docItems = [
  { name: "Problem Statement", path: "/problem-statement" },
  { name: "Patents & Products", path: "/patents-products" },
  { name: "Solution Requirements", path: "/solution-requirements" },
  { name: "Design Concepts", path: "/design-concepts" },
  { name: "Testable Prototype", path: "/testable-prototype" },
];

const mainNavItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Notebook", path: "/notebook" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [docMenuOpen, setDocMenuOpen] = useState(false);
  const docMenuRef = useRef<HTMLDivElement>(null);

  const isDocPage = docItems.some((item) => pathname === item.path);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (docMenuRef.current && !docMenuRef.current.contains(e.target as Node)) {
        setDocMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="font-display text-xl font-bold text-white">
              AMS System
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Home
              {pathname === "/" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>

            <div className="relative" ref={docMenuRef}>
              <button
                onClick={() => setDocMenuOpen(!docMenuOpen)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isDocPage ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Documentation
                <svg
                  className={`w-4 h-4 transition-transform ${docMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isDocPage && !docMenuOpen && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
              <AnimatePresence>
                {docMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 py-2 w-56 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl"
                  >
                    {docItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setDocMenuOpen(false)}
                        className={`block px-4 py-2 text-sm font-medium transition-colors ${
                          pathname === item.path
                            ? "text-white bg-white/10"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainNavItems.slice(1).map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                    pathname === "/" ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Home
                </Link>
                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Documentation</div>
                {docItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-2 text-base font-medium rounded-lg transition-colors ${
                      pathname === item.path
                        ? "text-white bg-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                    pathname === "/about" ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/notebook"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                    pathname === "/notebook" ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Engineering Notebook
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

