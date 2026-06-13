"use client";

import GroundModal from "./GroundModal";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  return <GroundModal project={project} onClose={onClose} />;
}
