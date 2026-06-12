"use client";

import { useState } from "react";
import Image from "next/image";

const cards = [
  { src: "/characters/jex-selfie.png",    label: "Jex" },
  { src: "/characters/mirror-selfie.png", label: "Lin" },
  { src: "/characters/kurta-saree.png",   label: "Jex & Lin" },
  { src: "/characters/baseball.png",      label: "Jex" },
  { src: "/characters/track.png",         label: "Jex & Lin" },
  { src: "/characters/field.png",         label: "Jex & Lin" },
  { src: "/characters/winter.png",        label: "Lin" },
];

const W = 118;
const H = 178;
const OFFSET_X = 11;  // cascade: each card shifts right
const OFFSET_Y = 20;  // cascade: each card shifts down
const COUNT = cards.length;
const CONTAINER_W = W + (COUNT - 1) * OFFSET_X; // 118 + 66 = 184px
const CONTAINER_H = H + (COUNT - 1) * OFFSET_Y; // 178 + 120 = 298px

export default function CharacterDeck() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p
        style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          marginBottom: 24,
        }}
      >
        Jex &amp; Lin universe
      </p>

      {/* Vertical cascade — each card peeks from beneath the next */}
      <div
        style={{
          position: "relative",
          width: CONTAINER_W,
          height: CONTAINER_H,
          cursor: "default",
        }}
      >
        {cards.map((card, i) => {
          const isHov = hovered === i;
          return (
            <div
              key={card.src}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                top: i * OFFSET_Y,
                left: i * OFFSET_X,
                width: W,
                height: H,
                borderRadius: 12,
                overflow: "hidden",
                zIndex: isHov ? COUNT + 1 : i,
                boxShadow: isHov
                  ? "0 16px 40px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.14)"
                  : "0 4px 14px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.08)",
                border: "1px solid rgba(255,255,255,0.72)",
                transform: isHov
                  ? "translateY(-18px) translateX(-6px) rotate(-2deg) scale(1.06)"
                  : "none",
                transition: "transform 0.32s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.32s ease",
                cursor: "pointer",
              }}
            >
              <Image
                src={card.src}
                alt={card.label}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="118px"
              />
            </div>
          );
        })}
      </div>

      <p
        style={{
          fontSize: 10,
          color: "var(--text-3)",
          letterSpacing: "0.06em",
          marginTop: 20,
        }}
      >
        7 chapters. One world.
      </p>
    </div>
  );
}
