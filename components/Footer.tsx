"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="py-16 md:py-20 px-8 md:px-16"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3
            className="font-serif italic mb-2"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: "var(--text)",
            }}
          >
            Jexlin
          </h3>
          <p
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            A World by Hemang
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col md:items-end gap-3"
        >
          <a
            href="mailto:hemang@sidetake.com"
            className="text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[var(--gold)]"
            style={{ color: "var(--text-muted)" }}
          >
            hemang@sidetake.com
          </a>
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            Est. 2018 &nbsp;·&nbsp; Ongoing
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 h-px origin-left"
        style={{ background: "var(--border)" }}
      />

      <div className="flex items-center justify-between mt-8">
        <span
          className="text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          © 2024 Hemang
        </span>
        <span
          className="text-xs italic"
          style={{
            color: "var(--text-dim)",
            fontFamily: "var(--font-serif)",
          }}
        >
          &ldquo;Still being written.&rdquo;
        </span>
      </div>
    </footer>
  );
}
