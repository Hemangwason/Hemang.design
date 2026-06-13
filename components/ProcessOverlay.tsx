"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project, GroundProcess } from "@/lib/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 1;
const WHEEL_SENSITIVITY = 0.0018;
const EXIT_MS = 220;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

function useCached(project: Project | null): Project | null {
  const ref = useRef<Project | null>(null);
  if (project) ref.current = project;
  return ref.current;
}

export default function ProcessOverlay({ project, onClose }: Props) {
  const open = Boolean(project?.process);
  const cached = useCached(project);

  const [keepAlive, setKeepAlive] = useState(open);

  useEffect(() => {
    if (open) {
      setKeepAlive(true);
      return;
    }
    const id = window.setTimeout(() => setKeepAlive(false), EXIT_MS);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;
  if (!keepAlive && !open) return null;

  const renderProject = open ? project : cached;
  if (!renderProject?.process) return null;

  const process = renderProject.process;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        background: process.bg ?? "#0b0b0b",
        opacity: open ? 1 : 0,
        transition: `opacity ${EXIT_MS}ms ease`,
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.03), transparent 55%), radial-gradient(120% 80% at 50% 100%, rgba(0,0,0,0.45), transparent 55%)",
        }}
      />

      {/* Header */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 20px",
          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 4,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.35)" }}>{renderProject.name}</span>
            <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{process.label ?? "Process flow"}</span>
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.8)",
              maxWidth: "60ch",
            }}
          >
            {process.blurb ?? "How this project came together — explorations, decisions, and the screens that landed."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close process flow"
          style={{
            flexShrink: 0,
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.8)",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#fff";
            (e.currentTarget as HTMLButtonElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* Canvas */}
      <ProcessCanvas process={process} />
    </div>,
    document.body
  );
}

function ProcessCanvas({ process }: { process: GroundProcess }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [stageSize, setStageSize] = useState<{ w: number; h: number } | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, zoom: 1 });
  const [loaded, setLoaded] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [snapAnim, setSnapAnim] = useState(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFittedRef = useRef(true);

  const startSnap = useCallback(() => {
    setSnapAnim(true);
    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => setSnapAnim(false), 240);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fitZoom = (() => {
    if (!stageSize) return 1;
    const m = 0.96;
    const zx = (stageSize.w * m) / process.width;
    const zy = (stageSize.h * m) / process.height;
    return Math.max(zx, zy);
  })();

  const fitOrigin = (() => {
    if (!stageSize) return { x: 0, y: 0 };
    const m = 0.96;
    const rw = process.width * fitZoom;
    const rh = process.height * fitZoom;
    const iw = stageSize.w * m;
    const ih = stageSize.h * m;
    return {
      x: rw > iw ? (rw - iw) / 2 : 0,
      y: rh > ih ? (rh - ih) / 2 : 0,
    };
  })();

  const resetTransform = useCallback(() => {
    isFittedRef.current = true;
    startSnap();
    setTransform({ x: fitOrigin.x, y: fitOrigin.y, zoom: fitZoom });
  }, [fitZoom, fitOrigin.x, fitOrigin.y, startSnap]);

  useEffect(() => {
    if (!stageSize || !isFittedRef.current) return;
    setTransform({ x: fitOrigin.x, y: fitOrigin.y, zoom: fitZoom });
  }, [stageSize, fitZoom, fitOrigin.x, fitOrigin.y]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      isFittedRef.current = false;
      const isZoom = e.ctrlKey || e.metaKey;
      if (isZoom) {
        setTransform((prev) => {
          const rect = el.getBoundingClientRect();
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          const factor = Math.exp(-e.deltaY * WHEEL_SENSITIVITY);
          const nextZoom = clamp(prev.zoom * factor, MIN_ZOOM, MAX_ZOOM);
          const k = nextZoom / prev.zoom;
          return { x: cx - (cx - prev.x) * k, y: cy - (cy - prev.y) * k, zoom: nextZoom };
        });
        return;
      }
      setTransform((prev) => {
        const dx = e.shiftKey ? e.deltaY : e.deltaX;
        const dy = e.shiftKey ? e.deltaX : e.deltaY;
        return { ...prev, x: prev.x - dx, y: prev.y - dy };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const dragRef = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const pinchRef = useRef<{
    startDistance: number;
    startZoom: number;
    startMidX: number;
    startMidY: number;
    startTx: number;
    startTy: number;
  } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      if (!wrap || !stage) return;
      wrap.setPointerCapture(e.pointerId);
      isFittedRef.current = false;
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointersRef.current.size === 1) {
        dragRef.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: transform.x, oy: transform.y };
        pinchRef.current = null;
        setGrabbing(true);
      } else if (pointersRef.current.size === 2) {
        dragRef.current = null;
        const pts = Array.from(pointersRef.current.values());
        const [p1, p2] = pts;
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;
        const rect = stage.getBoundingClientRect();
        const midX = (p1.x + p2.x) / 2 - rect.left - rect.width / 2;
        const midY = (p1.y + p2.y) / 2 - rect.top - rect.height / 2;
        pinchRef.current = {
          startDistance: dist,
          startZoom: transform.zoom,
          startMidX: midX,
          startMidY: midY,
          startTx: transform.x,
          startTy: transform.y,
        };
        setGrabbing(false);
      }
    },
    [transform.x, transform.y, transform.zoom]
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const pts = Array.from(pointersRef.current.values());
      const [p1, p2] = pts;
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;
      const pinch = pinchRef.current;
      const nextZoom = clamp(pinch.startZoom * (dist / pinch.startDistance), MIN_ZOOM, MAX_ZOOM);
      const k = nextZoom / pinch.startZoom;
      const nx = pinch.startMidX - (pinch.startMidX - pinch.startTx) * k;
      const ny = pinch.startMidY - (pinch.startMidY - pinch.startTy) * k;
      setTransform({ x: nx, y: ny, zoom: nextZoom });
      return;
    }

    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    setTransform((prev) => ({
      ...prev,
      x: drag.ox + (e.clientX - drag.sx),
      y: drag.oy + (e.clientY - drag.sy),
    }));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    const drag = dragRef.current;
    if (drag?.id === e.pointerId) {
      dragRef.current = null;
      setGrabbing(false);
    }
    try { wrapRef.current?.releasePointerCapture(e.pointerId); } catch { /* already released */ }
  }, []);

  const zoomBy = useCallback(
    (factor: number) => {
      isFittedRef.current = false;
      startSnap();
      setTransform((prev) => {
        const nextZoom = clamp(prev.zoom * factor, MIN_ZOOM, MAX_ZOOM);
        const k = nextZoom / prev.zoom;
        return { x: prev.x * k, y: prev.y * k, zoom: nextZoom };
      });
    },
    [startSnap]
  );

  const zoomPercent = stageSize ? Math.round((transform.zoom / fitZoom) * 100) : 100;

  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div
        ref={stageRef}
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          minHeight: 0,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {/* Dot grid backdrop */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.18,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div
          ref={wrapRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={resetTransform}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            cursor: grabbing ? "grabbing" : "grab",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: process.width,
              height: process.height,
              transform: `translate3d(-50%, -50%, 0) translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.zoom})`,
              transformOrigin: "center center",
              willChange: "transform",
              transition: snapAnim ? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Shadow border */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 6,
                boxShadow: "0 60px 140px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                pointerEvents: "none",
              }}
            />

            {/* Blurred poster while loading */}
            {process.poster && !loaded && (
              <img
                src={process.poster}
                alt=""
                aria-hidden
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: 6,
                  filter: "blur(2px)",
                }}
              />
            )}

            {/* Main board image */}
            <img
              src={process.src}
              alt={process.label ?? "Project flow"}
              loading="eager"
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded(true)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 6,
                opacity: loaded ? 1 : 0,
                transition: "opacity 240ms ease-out",
              }}
            />
          </div>
        </div>
      </div>

      {/* Zoom dock */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.55)",
            padding: "4px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 18px 36px -18px rgba(0,0,0,0.85)",
          }}
        >
          <DockBtn onClick={() => zoomBy(1 / 1.2)} aria-label="Zoom out">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </DockBtn>

          <button
            type="button"
            onClick={resetTransform}
            style={{
              borderRadius: 100,
              padding: "0 12px",
              height: 32,
              fontFamily: "monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.75)",
              background: "none",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {zoomPercent}%
            <span style={{ margin: "0 6px", color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.45)" }}>reset</span>
          </button>

          <DockBtn onClick={() => zoomBy(1.2)} aria-label="Zoom in">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </DockBtn>
        </div>
      </div>

      {/* Footer hint */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 24px",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)" }}>
          scroll · drag to pan · ⌘ scroll to zoom
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)" }}>
          esc to close
        </span>
      </div>
    </div>
  );
}

function DockBtn({ children, onClick, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "rgba(255,255,255,0.8)",
        background: "none",
        border: "none",
        transition: "background 0.15s ease, color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "#fff";
        (e.currentTarget as HTMLButtonElement).style.color = "#000";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "none";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
