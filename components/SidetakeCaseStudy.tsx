"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/lib/projects";

/* ─── Mini Sidetake screens rendered with CSS ─── */

function HomeScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#08080f", padding: "18px 14px", color: "#fff", fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", overflowY: "hidden" }}>
      {/* Gem */}
      <div style={{ textAlign: "center", marginBottom: 16, marginTop: 8 }}>
        <div style={{ fontSize: 8, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", marginBottom: 4, textTransform: "uppercase" }}>GEM</div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Calibrate</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#a78bfa", lineHeight: 1.1 }}>54</div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 6px", background: "rgba(255,255,255,0.04)", borderRadius: 7, marginBottom: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
        {[["FOCUS", "0%", "#4ade80"], ["MAKING", "0m", "#fff"], ["DRIFT", "0m", "#f87171"]].map(([label, val, col]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 7, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: col as string }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Daily Insights */}
      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 7 }}>DAILY INSIGHTS</div>
      {[
        { time: "10:40am", sub: "Deepest creative window · 68%", col: "#a78bfa" },
        { time: "14 min", sub: "Avg. before distraction · 4× better", col: "#34d399" },
        { time: "0.52×", sub: "Research/Execution ratio", col: "#fb923c" },
      ].map((item) => (
        <div key={item.time} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ width: 2.5, height: 22, borderRadius: 2, background: item.col, flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 10 }}>{item.time}</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", lineHeight: 1.3 }}>{item.sub}</div>
          </div>
        </div>
      ))}

      {/* Soundscapes pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, padding: "7px 8px", background: "rgba(255,255,255,0.04)", borderRadius: 7, border: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(96,165,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 10 }}>♪</span>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 600 }}>Soundscapes</div>
          <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)" }}>8 ambient sounds</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 8, color: "#60a5fa", background: "rgba(96,165,250,0.12)", padding: "3px 8px", borderRadius: 10 }}>Play</div>
      </div>
    </div>
  );
}

function ProjectDetailScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#080f08", padding: "14px 12px", color: "#fff", fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", overflowY: "hidden" }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 7, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 3 }}>ACTIVE PROJECT</div>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.25 }}>Café Ostra —<br />Brand Identity</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>4h 12m</div>
          <div style={{ fontSize: 8, background: "rgba(74,222,128,0.12)", color: "#4ade80", padding: "2px 6px", borderRadius: 3 }}>● Active</div>
        </div>
      </div>

      <div style={{ height: 3, borderRadius: 2, display: "flex", overflow: "hidden", marginBottom: 9, background: "rgba(255,255,255,0.06)" }}>
        {[["62%","#4ade80"],["22%","#60a5fa"],["8%","#fbbf24"],["8%","#f87171"]].map(([w,c]) => (
          <div key={c} style={{ width: w, background: c as string }} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, paddingBottom: 9, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {[["8","SESSIONS"],["4","DAYS"],["91%","DEPTH"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{v}</div>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.09em" }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 7, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 7 }}>QUICK BREAKDOWN</div>
      {[
        { label: "Creating", time: "2h 34m", pct: "62%", col: "#4ade80" },
        { label: "Research", time: "55m", pct: "22%", col: "#60a5fa" },
        { label: "Comms", time: "20m", pct: "8%", col: "#fbbf24" },
        { label: "Drift", time: "23m", pct: "8%", col: "#f87171" },
      ].map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.col, marginRight: 5, flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: 9 }}>{item.label}</span>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", marginRight: 6 }}>{item.time}</span>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.28)" }}>{item.pct}</span>
        </div>
      ))}

      <div style={{ marginTop: 9, display: "flex", gap: 4, flexWrap: "wrap" }}>
        {["✦ Active", "8 sessions", "4 days", "Depth 91%"].map((tag) => (
          <div key={tag} style={{ fontSize: 7, padding: "2px 6px", borderRadius: 10, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.07)" }}>{tag}</div>
        ))}
      </div>
    </div>
  );
}

function MentorScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0a0812", padding: "14px 12px", color: "#fff", fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", overflowY: "hidden" }}>
      <div style={{ fontSize: 7, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 10 }}>LEARN FROM THE BEST</div>

      {[
        { name: "Ravi K.", role: "Brand Director", gem: "Execute 81", col: "#a78bfa" },
        { name: "Priya S.", role: "Motion Designer", gem: "Reference 34", col: "#34d399" },
        { name: "Karan M.", role: "UX Lead", gem: "Ideate 62", col: "#fb923c" },
      ].map((m) => (
        <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 8px", marginBottom: 6, background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${m.col}22`, border: `1px solid ${m.col}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: m.col }}>{m.name[0]}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 10 }}>{m.name}</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)" }}>{m.role}</div>
          </div>
          <div style={{ fontSize: 7, color: m.col, background: `${m.col}18`, padding: "2px 5px", borderRadius: 4, whiteSpace: "nowrap" }}>{m.gem}</div>
        </div>
      ))}

      <div style={{ marginTop: 10, padding: "11px 10px", background: "rgba(167,139,250,0.07)", borderRadius: 9, border: "1px solid rgba(167,139,250,0.18)", textAlign: "center" }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: "#a78bfa", marginBottom: 3 }}>Book a session</div>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)" }}>60 min · Real conversation</div>
      </div>
    </div>
  );
}

/* ─── Mini phone mockup wrapper ─── */
function CaseStudyPhone({ children, gradient }: { children: React.ReactNode; gradient?: [string, string] }) {
  const w = 148;
  const h = 296;
  const radius = 26;
  const bezel = 6;

  return (
    <div style={{
      position: "relative",
      width: w,
      height: h,
      borderRadius: radius,
      background: "linear-gradient(160deg, #3a3a3c, #1c1c1e)",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
      flexShrink: 0,
    }}>
      <div style={{ position: "absolute", inset: bezel, borderRadius: radius - bezel, overflow: "hidden", background: "#000" }}>
        {children}
      </div>
      {/* Dynamic island */}
      <div style={{ position: "absolute", top: bezel + 6, left: "50%", transform: "translateX(-50%)", width: 46, height: 12, borderRadius: 6, background: "#000", zIndex: 10 }} />
    </div>
  );
}

/* ─── Hero phone fan ─── */
function HeroFan({ videoSrc }: { videoSrc?: string }) {
  return (
    <div style={{ position: "relative", height: 340, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      {/* Left phone */}
      <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-180px) rotate(-14deg)", zIndex: 1, opacity: 0.75 }}>
        <CaseStudyPhone>
          <HomeScreen />
        </CaseStudyPhone>
      </div>

      {/* Right phone */}
      <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(32px) rotate(12deg)", zIndex: 2, opacity: 0.8 }}>
        <CaseStudyPhone>
          <ProjectDetailScreen />
        </CaseStudyPhone>
      </div>

      {/* Center phone — video */}
      <div style={{ position: "relative", zIndex: 3, bottom: 0 }}>
        <div style={{
          position: "relative",
          width: 168,
          height: 340,
          borderRadius: 34,
          background: "linear-gradient(160deg, #3a3a3c, #1c1c1e)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.14), 0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.12)",
          flexShrink: 0,
        }}>
          <div style={{ position: "absolute", inset: 7, borderRadius: 27, overflow: "hidden", background: "#000" }}>
            {videoSrc ? (
              <video src={videoSrc} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #1a0f2e, #0d0a1a)" }} />
            )}
          </div>
          {/* Dynamic island */}
          <div style={{ position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)", width: 56, height: 14, borderRadius: 7, background: "#000", zIndex: 10 }} />
          {/* Home indicator */}
          <div style={{ position: "absolute", bottom: 9, left: "50%", transform: "translateX(-50%)", width: 46, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.25)", zIndex: 10 }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
interface Props {
  project: Project | null;
  onClose: () => void;
}

const SCREENS = [<HomeScreen key="home" />, <ProjectDetailScreen key="proj" />, <MentorScreen key="mentor" />];

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
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(4,4,8,0.82)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
          />

          {/* Scroll wrapper */}
          <motion.div
            key="cs-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 101, overflowY: "auto", display: "flex", justifyContent: "center", paddingTop: "3vh", paddingBottom: "8vh", pointerEvents: "none" }}
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
                boxShadow: "0 48px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
                overflow: "hidden",
                flexShrink: 0,
                alignSelf: "flex-start",
              }}
            >
              {/* Sticky header */}
              <div style={{
                position: "sticky",
                top: 0,
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                background: "rgba(13,11,20,0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
                  {project.status} &nbsp;·&nbsp; {project.year}
                </div>

                <button
                  onClick={onClose}
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
                  aria-label="Close"
                >
                  <X size={13} strokeWidth={2} />
                </button>
              </div>

              {/* Hero: phone fan */}
              <div style={{
                background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(167,139,250,0.12) 0%, transparent 70%), #0d0b14",
                padding: "48px 40px 0",
                overflow: "hidden",
              }}>
                <HeroFan videoSrc={project.videoSrc} />
              </div>

              {/* Title + meta */}
              <div style={{ padding: "44px 52px 0" }}>
                <h1
                  className="font-poppins"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, color: "#fff", marginBottom: 12 }}
                >
                  {project.name}
                </h1>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.42)", marginBottom: 40, letterSpacing: "-0.01em" }}>
                  {project.tagline}
                </p>

                {/* Meta grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: 40,
                }}>
                  {[
                    ["ROLE", cs.role],
                    ["CLIENT", cs.client],
                    ["YEAR", project.year],
                  ].map(([label, val], idx) => (
                    <div
                      key={label}
                      style={{
                        padding: "20px 0",
                        borderLeft: idx > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                        paddingLeft: idx > 0 ? 24 : 0,
                      }}
                    >
                      <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 7 }}>{label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Intro */}
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.55)", marginBottom: 60 }}>
                  {cs.intro}
                </p>
              </div>

              {/* Case study sections */}
              {cs.sections.map((section, i) => (
                <div
                  key={section.num}
                  style={{
                    padding: "0 52px 64px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: 52,
                  }}
                >
                  {/* Section heading */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 36 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", fontVariantNumeric: "tabular-nums" }}>{section.num}</span>
                    <h2
                      className="font-poppins"
                      style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}
                    >
                      {section.title}
                    </h2>
                  </div>

                  {/* Two-column: phone left, text right */}
                  <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
                    {/* Phone */}
                    <div style={{ flexShrink: 0 }}>
                      <CaseStudyPhone>{SCREENS[i] ?? SCREENS[0]}</CaseStudyPhone>
                    </div>

                    {/* Text blocks */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                      {/* Problem */}
                      <div style={{
                        padding: "20px 22px",
                        borderRadius: 14,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}>
                        <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 10 }}>PROBLEM</div>
                        <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>{section.problem}</p>
                      </div>

                      {/* Why */}
                      <div style={{
                        padding: "20px 22px",
                        borderRadius: 14,
                        background: "rgba(167,139,250,0.04)",
                        border: "1px solid rgba(167,139,250,0.1)",
                      }}>
                        <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(167,139,250,0.5)", marginBottom: 10 }}>WHY THIS WAY</div>
                        <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>{section.why}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Tech footer */}
              <div style={{ padding: "32px 52px 52px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>Built with</div>
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
