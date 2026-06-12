"use client";

import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 pointer-events-none"
    >
      <span
        className="font-serif italic text-sm tracking-wide pointer-events-auto"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-serif)" }}
      >
        Jexlin
      </span>
      <div className="flex items-center gap-8 pointer-events-auto">
        <a
          href="#exhibition"
          className="text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[var(--gold)]"
          style={{ color: "var(--text-muted)" }}
        >
          Exhibition
        </a>
        <a
          href="mailto:hemang@sidetake.com"
          className="text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[var(--gold)]"
          style={{ color: "var(--text-muted)" }}
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
