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
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 40px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 20px rgba(0,0,0,0.07)";
      }}
    >
      {/* Visual */}
      <div className="relative" style={{ aspectRatio: "3/4" }}>
        {project.videoSrc ? (
          <video
            ref={videoRef}
            src={project.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={project.imageSrc}
            alt={project.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        )}

        {/* Subtle bottom gradient for readability */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Glass info overlay */}
      <div
        className="absolute inset-x-3 bottom-3 glass rounded-xl p-4"
        style={{ color: "var(--text)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-[11px] tracking-widest uppercase mb-1"
              style={{ color: "var(--text-3)" }}
            >
              {project.id} &nbsp;·&nbsp; {project.status}
            </p>
            <h3
              className="font-poppins font-semibold text-[15px] leading-tight truncate"
              style={{ color: "var(--text)" }}
            >
              {project.name}
            </h3>
            <p
              className="text-[12px] mt-0.5 leading-snug line-clamp-2"
              style={{ color: "var(--text-2)" }}
            >
              {project.tagline}
            </p>
          </div>

          {/* Play/pause button — only for video */}
          {project.videoSrc && (
            <button
              onClick={togglePlay}
              className="glass shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
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
