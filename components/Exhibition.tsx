"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import ProjectModal from "./ProjectModal";

const statusColors: Record<Project["status"], string> = {
  Live: "#6bd4a8",
  Beta: "#d4a848",
  "In Progress": "#45a8d4",
  "Coming Soon": "#8b8b8b",
};

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      data-cursor
      className="group relative rounded-sm cursor-none overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        transition: "border-color 0.3s, transform 0.3s",
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Accent top line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
        style={{ background: project.accent }}
      />

      {/* Large faded exhibit number */}
      <div
        className="absolute right-4 top-4 font-serif text-7xl md:text-8xl leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--border)",
          lineHeight: 1,
        }}
      >
        {project.id}
      </div>

      {/* Top row */}
      <div className="flex items-start justify-between mb-8">
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--text-dim)" }}
        >
          Exhibit №{project.id}
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: statusColors[project.status] }}
          />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Project name */}
      <h3
        className="font-serif mb-2"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
          color: "var(--text)",
          lineHeight: 1.1,
        }}
      >
        {project.name}
      </h3>

      <p
        className="text-xs tracking-wide mb-8 leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {project.tagline}
      </p>

      {/* Tech row */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-sm"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-dim)",
            }}
          >
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span
            className="text-xs px-2 py-1 rounded-sm"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-dim)",
            }}
          >
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      {/* Bottom row */}
      <div
        className="flex items-center justify-between mt-8 pt-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="text-xs tracking-[0.2em]"
          style={{ color: "var(--text-dim)" }}
        >
          {project.year}
        </span>
        <span
          className="text-xs tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[var(--gold)]"
          style={{ color: "var(--text-dim)" }}
        >
          View →
        </span>
      </div>
    </motion.article>
  );
}

export default function Exhibition() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section
        id="exhibition"
        className="py-28 md:py-40 px-8 md:px-16"
      >
        {/* Section header */}
        <div className="flex items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              The Exhibition
            </div>
            <h2
              className="font-serif leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--text)",
              }}
            >
              Five Works.
              <br />
              <span
                className="italic"
                style={{ color: "var(--text-muted)" }}
              >
                Open to Interpretation.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block text-right"
          >
            <div
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--text-dim)" }}
            >
              MMXXIV — MMXXV
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {projects.slice(0, 4).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
          {/* Fifth card — centered */}
          <div className="md:col-span-2 md:max-w-[calc(50%-0.625rem)]">
            <ProjectCard
              project={projects[4]}
              index={4}
              onClick={() => setSelected(projects[4])}
            />
          </div>
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
