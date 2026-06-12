"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const characterY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Ambient glow behind character */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, rgba(91,71,212,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Character illustration — right side */}
      <motion.div
        style={{ y: characterY }}
        className="absolute top-0 right-0 h-full w-[50%] md:w-[42%] pointer-events-none select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src="/characters/jex-selfie.png"
            alt="Jex"
            fill
            className="object-contain object-right-bottom"
            priority
            sizes="(max-width: 768px) 50vw, 42vw"
          />
          {/* Fade edges */}
          <div
            className="absolute inset-y-0 left-0 w-40"
            style={{
              background:
                "linear-gradient(to right, #07070c, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-48"
            style={{
              background:
                "linear-gradient(to top, #07070c, transparent)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Hero text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 px-8 md:px-16 pb-16 md:pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-center gap-4 mb-6"
        >
          <div
            className="h-px w-8"
            style={{ background: "var(--gold)" }}
          />
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            An AI Projects Museum
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif leading-[0.88] tracking-tight select-none"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(5.5rem, 20vw, 18rem)",
            color: "var(--text)",
          }}
        >
          JEXLIN
        </motion.h1>

        {/* Subtitle row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col md:flex-row md:items-end justify-between mt-6 gap-6"
        >
          <div>
            <p
              className="text-base md:text-lg leading-relaxed max-w-xs"
              style={{ color: "var(--text-muted)" }}
            >
              A World by Hemang —<br />
              five AI experiments,<br />
              two characters, one story.
            </p>
          </div>

          <div
            className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            <span>Scroll</span>
            <div
              className="overflow-hidden h-px w-12 relative"
              style={{ background: "var(--text-dim)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 w-full"
                style={{ background: "var(--gold)" }}
                animate={{ x: ["−100%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: "var(--border)" }}
      />
    </section>
  );
}
