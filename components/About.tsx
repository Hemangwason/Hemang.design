"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function About() {
  return (
    <section className="py-28 md:py-40 px-8 md:px-16">
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="flex items-center gap-4 mb-20"
      >
        <span
          className="text-xs tracking-[0.35em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          The World
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border)" }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Hemang card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="relative"
        >
          <div
            className="rounded-sm p-8 md:p-10 border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            {/* Museum label */}
            <div className="mb-8">
              <div
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "var(--gold)" }}
              >
                The Creator
              </div>
              <div
                className="h-px w-full"
                style={{ background: "var(--border)" }}
              />
            </div>

            <h2
              className="font-serif text-3xl md:text-4xl mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--text)",
              }}
            >
              Hemang
            </h2>

            <p
              className="text-sm leading-[1.9] mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Product designer building at{" "}
              <span style={{ color: "var(--text)" }}>Zepto</span>. Previously
              at <span style={{ color: "var(--text)" }}>Zomato</span> and
              various ventures. I spend most of my time at the intersection of
              design, AI, and human behaviour — usually asking &ldquo;what if
              this were more alive?&rdquo;
            </p>

            <p
              className="text-sm leading-[1.9]"
              style={{ color: "var(--text-muted)" }}
            >
              This site is a museum of everything I&apos;ve built with AI.
              Projects that are live, in progress, or still just a thought I
              had at 2am. Jex and Lin live here too — they have since college.
            </p>

            <div
              className="mt-10 pt-8 flex items-center justify-between"
              style={{ borderTop: "1px solid var(--border)" }}
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
                Since 2018
              </span>
            </div>
          </div>
        </motion.div>

        {/* Jex & Lin card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.15, ease },
            },
          }}
          className="relative"
        >
          {/* Character illustration */}
          <div className="relative h-64 mb-6 overflow-hidden rounded-sm">
            <Image
              src="/characters/mirror-selfie.png"
              alt="Jex and Lin mirror selfie"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, var(--bg) 100%)",
              }}
            />
          </div>

          <div
            className="rounded-sm p-8 md:p-10 border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="mb-8">
              <div
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "var(--gold)" }}
              >
                The Characters
              </div>
              <div
                className="h-px w-full"
                style={{ background: "var(--border)" }}
              />
            </div>

            <div className="space-y-8">
              {/* Jex */}
              <div>
                <h3
                  className="font-serif text-xl mb-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--jex)",
                  }}
                >
                  Jex
                </h3>
                <p
                  className="text-sm leading-[1.9]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Blue-skinned. Curly hair. Gold chain and red shades that
                  somehow work in every setting. Jex moves through the world
                  like someone who&apos;s already read the last page. Chaotic
                  good. Perpetually amused. Born from a college sketchbook.
                </p>
              </div>

              {/* Divider */}
              <div
                className="h-px"
                style={{ background: "var(--border)" }}
              />

              {/* Lin */}
              <div>
                <h3
                  className="font-serif text-xl mb-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--lin)",
                  }}
                >
                  Lin
                </h3>
                <p
                  className="text-sm leading-[1.9]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Pink-hued. Sharp-eyed. Usually the one taking the mirror
                  selfie. Lin is three steps ahead in the conversation while
                  looking like she&apos;s barely paying attention. Do not be
                  fooled. Quietly fierce. Also from college.
                </p>
              </div>
            </div>

            <p
              className="mt-8 pt-6 text-xs leading-relaxed italic"
              style={{
                color: "var(--text-dim)",
                borderTop: "1px solid var(--border)",
                fontFamily: "var(--font-serif)",
              }}
            >
              &ldquo;Together they&apos;re Jexlin — a world still being
              written.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
