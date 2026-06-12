"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
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
              background: "rgba(10,10,10,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              zIndex: 101,
              top: "5vh",
              bottom: "5vh",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(540px, 92vw)",
              borderRadius: 24,
              overflow: "hidden",
              background: `linear-gradient(145deg, ${project.gradient[0]}ee, ${project.gradient[1]}ee)`,
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ height: "100%", overflowY: "auto" }}>
              {/* Hero area with device */}
              <div
                style={{
                  position: "relative",
                  padding: "36px 32px 20px",
                  display: "flex",
                  justifyContent: "center",
                  minHeight: 220,
                  alignItems: "center",
                }}
              >
                <DeviceMockup
                  device={project.device}
                  gradient={project.gradient}
                  videoSrc={project.videoSrc}
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
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  padding: "24px 28px 32px",
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
                    fontSize: "1.75rem",
                    lineHeight: 1.15,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    marginBottom: 6,
                  }}
                >
                  {project.name}
                </h2>

                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
                  {project.tagline}
                </p>

                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.08)",
                    marginBottom: 20,
                  }}
                />

                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 24,
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
