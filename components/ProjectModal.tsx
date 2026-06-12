"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import SidetakeCaseStudy from "./SidetakeCaseStudy";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  if (project?.caseStudy) {
    return <SidetakeCaseStudy project={project} onClose={onClose} />;
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(10,10,10,0.65)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            onClick={onClose}
          />

          {/*
           * Centering wrapper — flexbox, not transform, to avoid conflicting
           * with Framer Motion's scale/y animation on the panel below.
           */}
          <motion.div
            key="panel-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: "4vh",
              paddingBottom: "4vh",
              overflowY: "auto",
              pointerEvents: "none",
            }}
          >
            {/* Panel */}
            <motion.div
              initial={{ scale: 0.94, y: 28 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{
                pointerEvents: "auto",
                width: "min(540px, 92vw)",
                borderRadius: 24,
                overflow: "hidden",
                background: `linear-gradient(145deg, ${project.gradient[0]}f0, ${project.gradient[1]}f0)`,
                boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            >
              {/* Hero: device mockup */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 300,
                  padding: "40px 32px 24px",
                  backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 60%, ${project.gradient[1]}66, transparent 70%)`,
                }}
              >
                <DeviceMockup
                  device={project.device}
                  gradient={project.gradient}
                  videoSrc={project.videoSrc}
                  size="modal"
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="glass"
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  aria-label="Close"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>

              {/* Content */}
              <div
                style={{
                  background: "rgba(0,0,0,0.38)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  padding: "24px 28px 36px",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 8,
                  }}
                >
                  {project.year}&nbsp;&nbsp;·&nbsp;&nbsp;{project.status}
                  {project.company && (
                    <span style={{ marginLeft: 6 }}>/ {project.company}</span>
                  )}
                </p>

                <h2
                  className="font-poppins"
                  style={{
                    fontWeight: 700,
                    fontSize: "1.85rem",
                    lineHeight: 1.1,
                    color: "#fff",
                    letterSpacing: "-0.03em",
                    marginBottom: 6,
                  }}
                >
                  {project.name}
                </h2>

                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", marginBottom: 22 }}>
                  {project.tagline}
                </p>

                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.08)",
                    marginBottom: 22,
                  }}
                />

                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.62)",
                    marginBottom: 28,
                  }}
                >
                  {project.description}
                </p>

                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 10,
                  }}
                >
                  Built with
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="glass"
                      style={{
                        fontSize: 12,
                        padding: "6px 14px",
                        borderRadius: 100,
                        color: "rgba(255,255,255,0.55)",
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
