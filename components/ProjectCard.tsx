"use client";

import { useTilt } from "@/hooks/useTilt";
import DeviceMockup from "./DeviceMockup";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const { style, shinePos, onMouseMove, onMouseLeave } = useTilt(10);

  return (
    <article
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        ...style,
      }}
    >
      {/* Aspect-ratio box — 1:1.35 portrait */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "135%" }}>

        {/* Gradient background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(145deg, ${project.gradient[0]}, ${project.gradient[1]})`,
          }}
        />

        {/* Specular shine tracking mouse */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.09) 0%, transparent 55%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Device mockup — fills center, overflows naturally into gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <DeviceMockup
            device={project.device}
            gradient={project.gradient}
            videoSrc={project.videoSrc}
            size="card"
          />
        </div>

        {/* Glass info overlay */}
        <div
          className="glass-dark"
          style={{
            position: "absolute",
            left: 10,
            right: 10,
            bottom: 10,
            borderRadius: 14,
            padding: "14px 16px",
            zIndex: 3,
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 5,
            }}
          >
            {project.id}&nbsp;&nbsp;·&nbsp;&nbsp;{project.status}
            {project.company && (
              <span style={{ marginLeft: 6, color: "rgba(255,255,255,0.2)" }}>
                / {project.company}
              </span>
            )}
          </p>

          <h3
            className="font-poppins"
            style={{
              fontWeight: 600,
              fontSize: 16,
              lineHeight: 1.2,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontSize: 12,
              marginTop: 3,
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.45,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.tagline}
          </p>
        </div>
      </div>
    </article>
  );
}
