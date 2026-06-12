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

        {/* Subtle dot grid — adds texture without noise */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Ambient glow — soft bloom behind where the device sits */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "50%",
            background: `radial-gradient(ellipse, ${project.gradient[1]}55 0%, transparent 70%)`,
            filter: "blur(32px)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Specular shine tracking mouse */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.08) 0%, transparent 55%)`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Device mockup — centered in card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
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
            zIndex: 4,
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
              fontSize: 17,
              lineHeight: 1.2,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontSize: 12,
              marginTop: 4,
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
