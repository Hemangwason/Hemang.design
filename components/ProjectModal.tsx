"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const statusColors: Record<Project["status"], string> = {
  Live: "#6bd4a8",
  Beta: "#d4a848",
  "In Progress": "#45a8d4",
  "Coming Soon": "#8b8b8b",
};

export default function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(7,7,12,0.88)", backdropFilter: "blur(8px)" }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[101] overflow-y-auto"
            style={{
              inset: "5vh 5vw",
              maxWidth: 680,
              margin: "0 auto",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-strong)",
              borderRadius: 2,
              padding: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--text-muted)", opacity: 0.7 }}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Exhibit number */}
            <div
              className="text-xs tracking-[0.35em] uppercase mb-10"
              style={{ color: "var(--text-dim)" }}
            >
              Exhibit №{project.id}
            </div>

            {/* Name */}
            <h2
              className="font-serif leading-tight mb-3"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--text)",
              }}
            >
              {project.name}
            </h2>

            <p
              className="text-sm mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              {project.tagline}
            </p>

            <div
              className="h-px w-full mb-8"
              style={{ background: "var(--border)" }}
            />

            {/* Full description */}
            <p
              className="text-sm leading-[1.95] mb-10"
              style={{ color: "var(--text-muted)", maxWidth: 520 }}
            >
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="mb-10">
              <div
                className="text-xs tracking-[0.25em] uppercase mb-4"
                style={{ color: "var(--text-dim)" }}
              >
                Built with
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs rounded-sm"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      background: "var(--bg-card)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta row */}
            <div
              className="flex items-center gap-10 pt-8"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div>
                <div
                  className="text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: "var(--text-dim)" }}
                >
                  Status
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: statusColors[project.status] }}
                  />
                  <span className="text-sm" style={{ color: "var(--text)" }}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div>
                <div
                  className="text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: "var(--text-dim)" }}
                >
                  Year
                </div>
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {project.year}
                </span>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[var(--gold)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Visit →
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
