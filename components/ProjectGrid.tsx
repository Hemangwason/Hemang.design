"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/projects";

export default function ProjectGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      {/* Auto-fill grid: 2 cols when sidebar open, 3 cols when collapsed */}
      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 14,
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 48,
          paddingBottom: 16,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            marginBottom: 6,
          }}
        >
          That&apos;s the whole world. Jex went home. Lin&apos;s still at it.
        </p>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            opacity: 0.6,
          }}
        >
          Jex &amp; Lin universe →
        </p>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
