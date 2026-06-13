"use client";

import { useCallback, useRef } from "react";
import type { CSSProperties, MouseEvent } from "react";

export function useTilt(maxDeg = 12) {
  // Use a ref for the DOM element style directly — no React re-render on every move
  const elRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const style: CSSProperties = {
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: "transform",
  };

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!elRef.current) elRef.current = e.currentTarget;
      if (rafRef.current !== null) return; // already queued
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = elRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * -maxDeg;
        const ry = (x - 0.5) * maxDeg;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
        el.style.transition = "transform 0.08s linear";
      });
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = elRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";
    elRef.current = null;
  }, []);

  return { style, onMouseMove, onMouseLeave };
}
