"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import ProcessOverlay from "./ProcessOverlay";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

// Inner glass cards — NO backdropFilter (would flash black on scroll)
const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.12)",
};

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      style={{
        position: "absolute",
        top: 14,
        right: 14,
        width: 36,
        height: 36,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.20)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 4px 16px rgba(0,0,0,0.44)",
        color: "rgba(255,255,255,0.88)",
        zIndex: 10,
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.7)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)"; }}
    >
      <X size={14} strokeWidth={2} />
    </button>
  );
}

export default function GroundModal({ project, onClose }: Props) {
  const [showProcess, setShowProcess] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AnimatePresence>
        {project && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={onClose}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                background: "rgba(4,4,6,0.80)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
              }}
            />

            {/* Centred panel wrapper — does NOT scroll */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 101,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "3vh 20px",
                pointerEvents: "none",
              }}
            >
              {/* Panel — frosted glass, fixed in viewport */}
              <motion.div
                key="panel"
                initial={{ scale: 0.94, y: 32, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.93, y: 24, opacity: 0 }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  pointerEvents: "auto",
                  width: "min(680px, 94vw)",
                  maxHeight: "92vh",
                  borderRadius: 28,
                  overflow: "hidden",
                  background: project.modalBg,
                  // No backdropFilter on the panel — it causes the compositor to
                  // black-flash every scroll frame. The modalBg is already 94–96%
                  // opaque so the blur is invisible in practice.
                  border: "1px solid rgba(255,255,255,0.11)",
                  boxShadow:
                    "0 48px 128px rgba(0,0,0,0.82), 0 0 0 0.5px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.11)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* ── Masthead (fixed at top, never scrolls) ── */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    background: project.mastheadBg,
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <video
                    src={project.mastheadVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: project.device === "laptop" ? "contain" : "cover",
                      display: "block",
                    }}
                  />
                  <CloseButton onClick={onClose} />
                </div>

                {/* ── Scrollable body ── */}
                <div
                  ref={scrollRef}
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    flex: 1,
                    overscrollBehavior: "contain",
                    // Own GPU layer — keeps scroll composited independently of parent
                    transform: "translateZ(0)",
                    WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.12) transparent",
                  } as React.CSSProperties}
                >
                  <div style={{ padding: "22px 28px 48px" }}>

                    {/* Meta pill — no backdropFilter inside scroll */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 14px",
                        borderRadius: 100,
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.11)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                        marginBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.38)",
                        }}
                      >
                        {project.role}&nbsp;&nbsp;·&nbsp;&nbsp;{project.client}&nbsp;&nbsp;·&nbsp;&nbsp;{project.year}
                      </span>
                    </div>

                    {/* Name */}
                    <h2
                      className="font-poppins"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.9rem",
                        lineHeight: 1.1,
                        color: "#fff",
                        letterSpacing: "-0.03em",
                        marginBottom: 6,
                      }}
                    >
                      {project.name}
                    </h2>

                    {/* Tagline */}
                    <p
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.44)",
                        marginBottom: 20,
                        lineHeight: 1.5,
                      }}
                    >
                      {project.tagline}
                    </p>

                    {/* Tag pills — no backdropFilter */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            padding: "5px 14px",
                            borderRadius: 100,
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.13)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.09)",
                            color: "rgba(255,255,255,0.52)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: 1,
                        background:
                          "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
                        marginBottom: 24,
                      }}
                    />

                    {/* Writeup */}
                    <div
                      style={{
                        padding: "20px 22px",
                        borderRadius: 18,
                        ...glassCard,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.88,
                          color: "rgba(255,255,255,0.60)",
                          margin: 0,
                        }}
                      >
                        {project.writeup}
                      </p>
                    </div>

                    {/* Process CTA */}
                    {project.process && (
                      <button
                        onClick={() => setShowProcess(true)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 18,
                          width: "100%",
                          marginTop: 14,
                          padding: "16px 18px",
                          borderRadius: 18,
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          boxShadow:
                            "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.10)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.18s ease, border-color 0.18s ease",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = "rgba(255,255,255,0.11)";
                          el.style.borderColor = "rgba(255,255,255,0.24)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = "rgba(255,255,255,0.07)";
                          el.style.borderColor = "rgba(255,255,255,0.15)";
                        }}
                      >
                        {/* Thumbnail */}
                        <div
                          style={{
                            width: 88,
                            height: 60,
                            borderRadius: 10,
                            overflow: "hidden",
                            flexShrink: 0,
                            background: project.process.bg ?? "#111",
                            position: "relative",
                            border: "1px solid rgba(255,255,255,0.09)",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.44)",
                          }}
                        >
                          {project.process.poster && (
                            <Image
                              src={project.process.poster}
                              alt=""
                              fill
                              style={{ objectFit: "cover", opacity: 0.9 }}
                              sizes="88px"
                            />
                          )}
                        </div>

                        {/* Copy */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: 10,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.38)",
                              marginBottom: 5,
                            }}
                          >
                            {project.process.label ?? "The flow"}
                          </p>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#fff",
                              marginBottom: 4,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            See how this came together
                          </p>
                          <p
                            style={{
                              fontSize: 11,
                              color: "rgba(255,255,255,0.42)",
                              lineHeight: 1.5,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {project.process.blurb}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.09)",
                            border: "1px solid rgba(255,255,255,0.20)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "rgba(255,255,255,0.72)",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path
                              d="M2 6.5H11M7.5 3L11 6.5L7.5 10"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                    )}

                    {/* Live URL */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: 14,
                          padding: "16px 20px",
                          borderRadius: 18,
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.14)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
                          textDecoration: "none",
                          transition: "background 0.18s ease, border-color 0.18s ease",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "rgba(255,255,255,0.10)";
                          el.style.borderColor = "rgba(255,255,255,0.22)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "rgba(255,255,255,0.06)";
                          el.style.borderColor = "rgba(255,255,255,0.14)";
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: 10,
                              letterSpacing: "0.13em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.36)",
                              marginBottom: 5,
                            }}
                          >
                            {project.platform} · Live now
                          </p>
                          <p
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "#fff",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            Visit {project.name}
                          </p>
                        </div>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.09)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "rgba(255,255,255,0.72)",
                          }}
                        >
                          <ExternalLink size={14} strokeWidth={1.8} />
                        </div>
                      </a>
                    )}

                    {/* Screens */}
                    {project.screens && project.screens.length > 0 && (
                      <div style={{ marginTop: 44 }}>
                        {/* Section badge */}
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "3px 12px",
                            borderRadius: 100,
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                            marginBottom: 20,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.30)",
                            }}
                          >
                            The screens
                          </span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                          {project.screens.map((screen, i) => (
                            <div
                              key={screen.src}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "min(124px, 36%) 1fr",
                                gap: 16,
                                alignItems: "flex-start",
                                padding: "18px",
                                borderRadius: 20,
                                ...glassCard,
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "min(124px, 36%)",
                                  aspectRatio: "124 / 264",
                                  borderRadius: 20,
                                  overflow: "hidden",
                                  flexShrink: 0,
                                  boxShadow:
                                    "0 16px 40px rgba(0,0,0,0.52), 0 0 0 1px rgba(255,255,255,0.07)",
                                }}
                              >
                                <Image
                                  src={screen.src}
                                  alt={screen.title}
                                  fill
                                  loading="lazy"
                                  style={{ objectFit: "contain", objectPosition: "top" }}
                                  sizes="124px"
                                />
                              </div>

                              <div>
                                <p
                                  style={{
                                    fontSize: 10,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.22)",
                                    marginBottom: 7,
                                  }}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </p>
                                <h3
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "#fff",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.3,
                                    marginBottom: 14,
                                  }}
                                >
                                  {screen.title}
                                </h3>
                                <p
                                  style={{
                                    fontSize: 12,
                                    lineHeight: 1.75,
                                    color: "rgba(255,255,255,0.34)",
                                    marginBottom: 10,
                                    fontStyle: "italic",
                                  }}
                                >
                                  {screen.problem}
                                </p>
                                <p
                                  style={{
                                    fontSize: 12,
                                    lineHeight: 1.75,
                                    color: "rgba(255,255,255,0.55)",
                                  }}
                                >
                                  {screen.rationale}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <ProcessOverlay
        project={showProcess ? project : null}
        onClose={() => setShowProcess(false)}
      />
    </>
  );
}
