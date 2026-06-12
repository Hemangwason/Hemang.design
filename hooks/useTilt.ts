"use client";

import { useState, useCallback } from "react";
import type { CSSProperties, MouseEvent } from "react";

export function useTilt(maxDeg = 12) {
  const [style, setStyle] = useState<CSSProperties>({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
    willChange: "transform",
  });

  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (y - 0.5) * -maxDeg;
      const ry = (x - 0.5) * maxDeg;
      setStyle({
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`,
        transition: "transform 0.08s linear",
        willChange: "transform",
      });
      setShinePos({ x: x * 100, y: y * 100 });
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
      willChange: "transform",
    });
    setShinePos({ x: 50, y: 50 });
  }, []);

  return { style, shinePos, onMouseMove, onMouseLeave };
}
