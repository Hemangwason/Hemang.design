"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
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
            className="fixed inset-0 z-[100]"
            style={{
              background: "rgba(10,10,10,0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[101] glass rounded-3xl overflow-hidden"
            style={{
              top: "5vh",
              bottom: "5vh",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(560px, 92vw)",
            }}
          >
            <div className="h-full overflow-y-auto">
              {/* Image header */}
              <div className="relative" style={{ height: 260 }}>
                <Image
                  src={project.imageSrc}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                  sizes="560px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%)",
                  }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 glass w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Close"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 pb-10 -mt-4">
                <p
                  className="text-[11px] tracking-widest uppercase mb-2"
                  style={{ color: "var(--text-3)" }}
                >
                  {project.year} &nbsp;·&nbsp; {project.status}
                </p>

                <h2
                  className="font-poppins font-bold leading-tight mb-2"
                  style={{ fontSize: "1.75rem", color: "var(--text)" }}
                >
                  {project.name}
                </h2>

                <p
                  className="text-[13px] mb-6"
                  style={{ color: "var(--text-2)" }}
                >
                  {project.tagline}
                </p>

                <div
                  className="h-px mb-6"
                  style={{ background: "rgba(0,0,0,0.08)" }}
                />

                <p
                  className="text-[13px] leading-[1.85] mb-8"
                  style={{ color: "var(--text-2)" }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div>
                  <p
                    className="text-[11px] tracking-widest uppercase mb-3"
                    style={{ color: "var(--text-3)" }}
                  >
                    Built with
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="glass text-[12px] px-3.5 py-1.5 rounded-full"
                        style={{ color: "var(--text-2)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
