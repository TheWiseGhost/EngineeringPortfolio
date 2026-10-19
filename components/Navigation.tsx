"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { elements } from "@/lib/elements";
import Logo from "./Logo";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [docsOpen, setDocsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const docsRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    setDocsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) setDocsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setDocsOpen(false), setMobileOpen(false));
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isDoc = elements.some((e) => pathname === `/${e.slug}`);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-ember-500"
        style={{ scaleX: scrollYProgress }}
      />
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 transition-colors duration-300 ${
            scrolled || docsOpen || mobileOpen
              ? "border-fg/10 bg-panel/80 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5 px-2 py-1">
            <Logo className="h-5 w-auto text-fg transition-colors group-hover:text-ember-500" />
            <span className="font-display text-sm font-semibold tracking-tight">AMS</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40 sm:inline">
              / Mobility System
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <div className="relative" ref={docsRef}>
              <button
                onClick={() => setDocsOpen((o) => !o)}
                aria-expanded={docsOpen}
                className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  isDoc || docsOpen ? "text-fg" : "text-fg/55 hover:text-fg"
                }`}
              >
                Documentation
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${docsOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                {isDoc && <ActiveDot />}
              </button>
              <AnimatePresence>
                {docsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    style={{ x: "-50%" }}
                    className="absolute left-1/2 top-full mt-3 w-[560px] overflow-hidden rounded-2xl border border-fg/10 bg-panel p-2 shadow-2xl shadow-inv/80"
                  >
                    <div className="flex items-center justify-between px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
                      <span>Engineering Design Process</span>
                      <span className="text-ember-500">08 Elements</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {elements.map((el) => {
                        const active = pathname === `/${el.slug}`;
                        return (
                          <Link
                            key={el.slug}
                            href={`/${el.slug}`}
                            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                              active ? "bg-ember-500/10" : "hover:bg-fg/[0.04]"
                            }`}
                          >
                            <span
                              className={`font-mono text-xs ${
                                active ? "text-ember-500" : "text-fg/30 group-hover:text-ember-500"
                              } transition-colors`}
                            >
                              {el.code}
                            </span>
                            <span className={`text-sm ${active ? "text-fg" : "text-fg/70 group-hover:text-fg"}`}>
                              {el.short}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {links.slice(1).map((l) => (
              <NavLink key={l.path} href={l.path} active={pathname === l.path}>
                {l.name}
              </NavLink>
            ))}
          </div>

          <Link
            href="/notebook"
            className="hidden items-center gap-2 rounded-xl bg-fg px-4 py-2 text-sm font-medium text-inv transition-colors hover:bg-ember-500 md:flex"
          >
            Open engineering notebook
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>

          <button
            className="rounded-lg p-2 text-fg/70 hover:text-fg md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all ${mobileOpen ? "top-2 rotate-45" : "top-0.5"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all ${mobileOpen ? "top-2 -rotate-45" : "top-3"}`}
              />
            </div>
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-canvas/95 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1">
              {[...links, { name: "Notebook", path: "/notebook" }].map((l, i) => (
                <motion.div key={l.path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={l.path}
                    className={`block py-2 font-display text-3xl font-medium ${pathname === l.path ? "text-ember-500" : "text-fg"}`}
                  >
                    {l.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 border-t border-fg/10 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
              Documentation
            </div>
            <div className="mt-3 space-y-1">
              {elements.map((el, i) => (
                <motion.div
                  key={el.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.03 }}
                >
                  <Link href={`/${el.slug}`} className="flex items-baseline gap-3 py-2">
                    <span className="font-mono text-xs text-ember-500">{el.code}</span>
                    <span className={pathname === `/${el.slug}` ? "text-fg" : "text-fg/70"}>{el.short}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors ${
        active ? "text-fg" : "text-fg/55 hover:text-fg"
      }`}
    >
      {children}
      {active && <ActiveDot />}
    </Link>
  );
}

function ActiveDot() {
  return (
    <motion.span
      layoutId="nav-dot"
      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ember-500"
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
    />
  );
}
