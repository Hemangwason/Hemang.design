"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

/* ─── Reusable phone shell ─── */
function PhoneShell({
  w,
  h,
  radius,
  bezel,
  islandW,
  islandH,
  children,
  shadow = "0 0 0 1px rgba(255,255,255,0.12), 0 24px 64px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.1)",
}: {
  w: number;
  h: number;
  radius: number;
  bezel: number;
  islandW: number;
  islandH: number;
  children: React.ReactNode;
  shadow?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        borderRadius: radius,
        background: "linear-gradient(160deg, #3a3a3c, #1c1c1e)",
        boxShadow: shadow,
        flexShrink: 0,
      }}
    >
      {/* Screen inset */}
      <div
        style={{
          position: "absolute",
          inset: bezel,
          borderRadius: radius - bezel,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {children}
      </div>
      {/* Dynamic island */}
      <div
        style={{
          position: "absolute",
          top: bezel + 6,
          left: "50%",
          transform: "translateX(-50%)",
          width: islandW,
          height: islandH,
          borderRadius: islandH / 2,
          background: "#000",
          zIndex: 10,
        }}
      />
    </div>
  );
}

/* ─── Screenshot phone (section) — 130 × 275 ─── */
function SectionPhone({ src, alt }: { src: string; alt: string }) {
  return (
    <PhoneShell w={130} h={275} radius={24} bezel={5} islandW={42} islandH={11}>
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover", objectPosition: "top" }}
        sizes="130px"
      />
    </PhoneShell>
  );
}

/* ─── Hero fan ─── */
function HeroFan({ videoSrc }: { videoSrc?: string }) {
  return (
    <div
      style={{
        position: "relative",
        height: 340,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Left — focus block screen */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-185px) rotate(-14deg)",
          zIndex: 1,
          opacity: 0.72,
        }}
      >
        <PhoneShell w={128} h={262} radius={24} bezel={5} islandW={40} islandH={11}>
          <Image
            src="/screenshots/st-focus.png"
            alt="Focus block"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="128px"
          />
        </PhoneShell>
      </div>

      {/* Right — book a session screen */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(58px) rotate(12deg)",
          zIndex: 2,
          opacity: 0.8,
        }}
      >
        <PhoneShell w={128} h={262} radius={24} bezel={5} islandW={40} islandH={11}>
          <Image
            src="/screenshots/st-book.png"
            alt="Book a session"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="128px"
          />
        </PhoneShell>
      </div>

      {/* Center — live video */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <PhoneShell
          w={152}
          h={324}
          radius={32}
          bezel={6}
          islandW={50}
          islandH={13}
          shadow="0 0 0 1px rgba(255,255,255,0.14), 0 40px 100px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12)"
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(160deg, #1a0f2e, #0d0a1a)",
              }}
            />
          )}
          {/* Home indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 9,
              left: "50%",
              transform: "translateX(-50%)",
              width: 46,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.25)",
              zIndex: 10,
            }}
          />
        </PhoneShell>
      </div>
    </div>
  );
}

/* ─── Section screenshot mapping (all 5 screens) ─── */
const SECTION_SCREENS = [
  { src: "/screenshots/st-home.png",   alt: "Sidetake home screen" },
  { src: "/screenshots/st-active.png", alt: "Active project detail" },
  { src: "/screenshots/st-learn.png",  alt: "Learn from the Best" },
  { src: "/screenshots/st-focus.png",  alt: "Record a Focus Block" },
  { src: "/screenshots/st-book.png",   alt: "Book a session" },
];

/* ─── Main component ─── */
interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function SidetakeCaseStudy({ project, onClose }: Props) {
  if (!project?.caseStudy) return null;
  const cs = project.caseStudy;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(4,4,8,0.82)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          />

          {/* Scroll wrapper */}
          <motion.div
            key="cs-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              overflowY: "auto",
              display: "flex",
              justifyContent: "center",
              paddingTop: "3vh",
              paddingBottom: "8vh",
              pointerEvents: "none",
            }}
          >
            {/* Panel */}
            <motion.div
              initial={{ scale: 0.95, y: 32 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 24 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              style={{
                pointerEvents: "auto",
                width: "min(720px, 94vw)",
                borderRadius: 28,
                background: "#0d0b14",
                boxShadow:
                  "0 48px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
                overflow: "hidden",
                flexShrink: 0,
                alignSelf: "flex-start",
              }}
            >
              {/* Sticky header */}
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "rgba(13,11,20,0.9)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 14px",
                    borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#4ade80",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {project.status}&nbsp;&nbsp;·&nbsp;&nbsp;{project.year}
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.5)",
                    flexShrink: 0,
                  }}
                >
                  <X size={13} strokeWidth={2} />
                </button>
              </div>

              {/* Hero fan */}
              <div
                style={{
                  background:
                    "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(167,139,250,0.12) 0%, transparent 70%), #0d0b14",
                  padding: "48px 40px 0",
                  overflow: "hidden",
                }}
              >
                <HeroFan videoSrc={project.videoSrc} />
              </div>

              {/* Title + meta */}
              <div style={{ padding: "44px 52px 0" }}>
                <h1
                  className="font-poppins"
                  style={{
                    fontSize: "clamp(2.8rem, 6vw, 4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  {project.name}
                </h1>
                <p
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.42)",
                    marginBottom: 40,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.tagline}
                </p>

                {/* Meta grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    marginBottom: 40,
                  }}
                >
                  {(
                    [
                      ["ROLE", cs.role],
                      ["CLIENT", cs.client],
                      ["YEAR", project.year],
                    ] as [string, string][]
                  ).map(([label, val], idx) => (
                    <div
                      key={label}
                      style={{
                        padding: "20px 0",
                        borderLeft:
                          idx > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                        paddingLeft: idx > 0 ? 24 : 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                          marginBottom: 7,
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Intro */}
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: 60,
                  }}
                >
                  {cs.intro}
                </p>
              </div>

              {/* Case study sections — all 5 screens */}
              {cs.sections.map((section, i) => {
                const screen = SECTION_SCREENS[i] ?? SECTION_SCREENS[0];
                return (
                  <div
                    key={section.num}
                    style={{
                      padding: "52px 52px 64px",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Heading */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 12,
                        marginBottom: 36,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.2)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {section.num}
                      </span>
                      <h2
                        className="font-poppins"
                        style={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: "#fff",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {section.title}
                      </h2>
                    </div>

                    {/* Two-column */}
                    <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
                      <SectionPhone src={screen.src} alt={screen.alt} />

                      {/* Text blocks */}
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            padding: "20px 22px",
                            borderRadius: 14,
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 9,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.28)",
                              marginBottom: 10,
                            }}
                          >
                            PROBLEM
                          </div>
                          <p
                            style={{
                              fontSize: 14,
                              lineHeight: 1.75,
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {section.problem}
                          </p>
                        </div>

                        <div
                          style={{
                            padding: "20px 22px",
                            borderRadius: 14,
                            background: "rgba(167,139,250,0.04)",
                            border: "1px solid rgba(167,139,250,0.1)",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 9,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "rgba(167,139,250,0.5)",
                              marginBottom: 10,
                            }}
                          >
                            WHY THIS WAY
                          </div>
                          <p
                            style={{
                              fontSize: 14,
                              lineHeight: 1.75,
                              color: "rgba(255,255,255,0.6)",
                            }}
                          >
                            {section.why}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* CTA row */}
              <div
                style={{
                  padding: "40px 52px 52px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                    marginBottom: 4,
                  }}
                >
                  Explore
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {/* Figma prototype — paste URL below when ready */}
                  <a
                    href="https://www.sidetake.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      borderRadius: 100,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Visit Site
                    <ExternalLink size={11} style={{ opacity: 0.5 }} />
                  </a>
                </div>
              </div>

              {/* Tech footer */}
              <div
                style={{
                  padding: "32px 52px 52px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                    marginBottom: 12,
                  }}
                >
                  Built with
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
                        padding: "6px 14px",
                        borderRadius: 100,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
