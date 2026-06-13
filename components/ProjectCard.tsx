"use client";

import { useTilt } from "@/hooks/useTilt";
import { useGyro } from "@/lib/gyro";
import DeviceMockup from "./DeviceMockup";
import type { Project } from "@/lib/projects";
import type { CSSProperties } from "react";

interface Props {
  project: Project;
  onClick: () => void;
  videoPaused?: boolean;
}

export default function ProjectCard({ project, onClick, videoPaused = false }: Props) {
  const { style: mouseTiltStyle, onMouseMove, onMouseLeave } = useTilt(7);
  const { tiltX, tiltY, active: gyroActive } = useGyro();

  const gyroStyle: CSSProperties = {
    transform: `perspective(900px) rotateX(${tiltY * -6}deg) rotateY(${tiltX * 6}deg)`,
    transition: "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: "transform",
  };

  const activeStyle = gyroActive ? gyroStyle : mouseTiltStyle;
  const handlers = gyroActive ? {} : { onMouseMove, onMouseLeave };

  return (
    <article
      onClick={onClick}
      {...handlers}
      style={{
        position: "relative",
        borderRadius: 20,
        cursor: "pointer",
        boxShadow: "0 2px 20px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)",
        ...activeStyle,
      }}
    >
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          width: "100%",
          paddingBottom: "135%",
        }}
      >
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, background: project.thumbnailBg }} />

        {/* Status + Platform badges */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 5,
            display: "flex",
            gap: 5,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 9px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.90)",
              border: "1px solid rgba(255,255,255,0.85)",
              boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.03em",
              color: project.status === "live" ? "rgba(15,110,55,0.9)" : "rgba(140,85,10,0.9)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                flexShrink: 0,
                background: project.status === "live" ? "#16a34a" : "#d97706",
                boxShadow: project.status === "live"
                  ? "0 0 0 2.5px rgba(22,163,74,0.18)"
                  : "0 0 0 2.5px rgba(217,119,6,0.18)",
              }}
            />
            {project.status === "live" ? "Live" : "Building"}
          </div>
          <div
            style={{
              padding: "4px 9px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.90)",
              border: "1px solid rgba(255,255,255,0.85)",
              boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.03em",
              color: "rgba(26,25,23,0.55)",
            }}
          >
            {project.platform}
          </div>
        </div>

        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Device */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            paddingBottom: "14%",
            pointerEvents: "none",
          }}
        >
          <DeviceMockup
            device={project.device}
            gradient={project.gradient}
            videoSrc={project.thumbnailVideo}
            size="card"
            videoPaused={videoPaused}
          />
        </div>

        {/* Bottom gradient — gives glass contrast on near-white card backgrounds */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "linear-gradient(to top, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.04) 55%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* Info overlay */}
        <div
          style={{
            position: "absolute",
            left: 10,
            right: 10,
            bottom: 10,
            borderRadius: 14,
            padding: "12px 16px",
            zIndex: 4,
            background: "rgba(255,255,255,0.62)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.72)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05), inset 0 1.5px 0 rgba(255,255,255,1)",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(26,25,23,0.42)",
              marginBottom: 5,
            }}
          >
            {project.id}&nbsp;&nbsp;·&nbsp;&nbsp;{project.year}&nbsp;&nbsp;·&nbsp;&nbsp;{project.tags[0]}
          </p>

          <h3
            className="font-poppins"
            style={{
              fontWeight: 600,
              fontSize: 17,
              lineHeight: 1.2,
              color: "#1a1917",
              letterSpacing: "-0.02em",
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontSize: 12,
              marginTop: 4,
              color: "rgba(26,25,23,0.52)",
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
