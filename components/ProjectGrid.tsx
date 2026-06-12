"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import CharacterDeck from "./CharacterDeck";
import { projects, type Project } from "@/lib/projects";

export default function ProjectGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      {/* Grid — scroll-snap on mobile for swipe-through feel */}
      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
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

      {/* Footer — fun copy */}
      <div
        style={{
          marginTop: 48,
          paddingBottom: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <CharacterDeck />

        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            textAlign: "center",
          }}
        >
          That&apos;s the whole world. Jex went home. Lin&apos;s still at it.
        </p>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
