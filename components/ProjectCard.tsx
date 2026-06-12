"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <article
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = "0 12px 36px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      }}
    >
      {/* Aspect-ratio wrapper — padding-bottom trick for reliable height */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "133.33%" }}>
        {project.videoSrc ? (
          <video
            ref={videoRef}
            src={project.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        ) : (
          <Image
            src={project.imageSrc}
            alt={project.name}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          />
        )}

        {/* Gradient for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 45%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Glass info overlay — absolutely on top of the padding-box */}
      <div
        className="glass"
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 10,
          borderRadius: 12,
          padding: "14px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-3)",
                marginBottom: 4,
              }}
            >
              {project.id} &nbsp;·&nbsp; {project.status}
            </p>
            <h3
              className="font-poppins"
              style={{
                fontWeight: 600,
                fontSize: 15,
                lineHeight: 1.25,
                color: "var(--text)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontSize: 12,
                marginTop: 2,
                color: "var(--text-2)",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* Play/pause button for video only */}
          {project.videoSrc && (
            <button
              onClick={togglePlay}
              className="glass"
              style={{
                flexShrink: 0,
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause size={11} strokeWidth={2.5} />
              ) : (
                <Play size={11} strokeWidth={2.5} />
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
