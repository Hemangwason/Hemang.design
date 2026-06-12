"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/projects";

export default function ProjectGrid() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      <p
        className="text-center text-[11px] tracking-widest uppercase mt-10 pb-4"
        style={{ color: "var(--text-3)" }}
      >
        More coming soon
      </p>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
