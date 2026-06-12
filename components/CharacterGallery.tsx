"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { characterArts } from "@/lib/projects";

export default function CharacterGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["10%", `-${(characterArts.length - 1) * 35}%`]
  );

  return (
    <section className="py-28 md:py-40 overflow-hidden">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-center gap-4 mb-16 px-8 md:px-16"
      >
        <span
          className="text-xs tracking-[0.35em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          The Gallery
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border)" }}
        />
        <span
          className="text-xs tracking-[0.3em]"
          style={{ color: "var(--text-dim)" }}
        >
          {characterArts.length} Works
        </span>
      </motion.div>

      {/* Sticky horizontal scroll */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${characterArts.length * 35}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex items-end gap-6 px-8 md:px-16 will-change-transform"
          >
            {characterArts.map((art, i) => (
              <motion.div
                key={art.exhibitNo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                className="flex-shrink-0 flex flex-col"
                style={{ width: "clamp(220px, 28vw, 380px)" }}
              >
                {/* Image frame */}
                <div
                  className="relative overflow-hidden rounded-sm mb-5"
                  style={{
                    height: "clamp(300px, 55vh, 600px)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 80vw, 28vw"
                  />
                  {/* Bottom fade */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(7,7,12,0.6), transparent)",
                    }}
                  />
                  {/* Exhibit number overlay */}
                  <div
                    className="absolute top-4 left-4 text-xs tracking-[0.25em] uppercase"
                    style={{ color: "rgba(232,227,208,0.4)" }}
                  >
                    №{art.exhibitNo}
                  </div>
                </div>

                {/* Museum label */}
                <div>
                  <div
                    className="h-px mb-4"
                    style={{ background: "var(--border)" }}
                  />
                  <div
                    className="text-xs tracking-[0.3em] uppercase mb-1"
                    style={{ color: "var(--gold)" }}
                  >
                    {art.title}
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                    }}
                  >
                    {art.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
