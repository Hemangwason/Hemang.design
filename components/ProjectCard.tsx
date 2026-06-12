"use client";

import { useTilt } from "@/hooks/useTilt";
import DeviceMockup from "./DeviceMockup";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const { style, shinePos, onMouseMove, onMouseLeave } = useTilt(11);

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
      {/* Card body — padding-bottom for 1:1.15 ratio */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "115%" }}>
        {/* Gradient background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(145deg, ${project.gradient[0]}, ${project.gradient[1]})`,
          }}
        />

        {/* Specular shine that follows the mouse */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.10) 0%, transparent 60%)`,
            pointerEvents: "none",
            zIndex: 2,
            transition: "background 0.05s linear",
          }}
        />

        {/* Device mockup — centered in upper portion */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "12%",
            paddingBottom: "28%",
            zIndex: 1,
          }}
        >
          <DeviceMockup
            device={project.device}
            gradient={project.gradient}
            videoSrc={project.videoSrc}
          />
        </div>

        {/* Glass info overlay at bottom */}
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
              color: "rgba(255,255,255,0.38)",
              marginBottom: 5,
            }}
          >
            {project.id}&nbsp;&nbsp;·&nbsp;&nbsp;{project.status}
            {project.company && (
              <span style={{ marginLeft: 6, color: "rgba(255,255,255,0.22)" }}>
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
              color: "rgba(255,255,255,0.5)",
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
