"use client";

import { useState } from "react";
import Image from "next/image";

const cards = [
  { src: "/characters/jex-selfie.png", label: "Jex" },
  { src: "/characters/mirror-selfie.png", label: "Lin" },
  { src: "/characters/kurta-saree.png", label: "Jex & Lin" },
  { src: "/characters/baseball.png", label: "Jex" },
  { src: "/characters/track.png", label: "Jex & Lin" },
  { src: "/characters/field.png", label: "Jex & Lin" },
  { src: "/characters/winter.png", label: "Lin" },
];

const W = 108;
const H = 162;
// Spread per card when fanned. Container width = W + (count-1)*SPREAD
// so all cards stay inside the container — no sidebar overflow.
const SPREAD = 22;
const COUNT = cards.length;
const CONTAINER_W = W + (COUNT - 1) * SPREAD; // 108 + 6*22 = 240px
const BASE_LEFT = (CONTAINER_W - W) / 2;       // center anchor = 66px

export default function CharacterDeck() {
  const [open, setOpen] = useState(false);
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

      {/* Container is exactly wide enough for the full open spread */}
      <div
        style={{
          position: "relative",
          width: CONTAINER_W,
          height: H + 28, // room for lift on hover
          cursor: "pointer",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          setOpen(false);
          setHovered(null);
        }}
      >
        {cards.map((card, i) => {
          const offset = i - (COUNT - 1) / 2; // −3 … +3
          const spreadX = open ? offset * SPREAD : offset * 2.5;
          const rotate = open ? offset * 9 : offset * 2;
          const lift = hovered === i ? -20 : 0;
          const scale = hovered === i ? 1.07 : 1;

          return (
            <div
              key={card.src}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                top: 14, // vertical room for lift
                left: BASE_LEFT,
                width: W,
                height: H,
                borderRadius: 12,
                overflow: "hidden",
                transformOrigin: "bottom center",
                transform: `translateX(${spreadX}px) translateY(${lift}px) rotate(${rotate}deg) scale(${scale})`,
                transition: "transform 0.38s cubic-bezier(0.23, 1, 0.32, 1)",
                zIndex: i,
                boxShadow:
                  "0 6px 22px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.08)",
                border: "1px solid rgba(255,255,255,0.68)",
              }}
            >
              <Image
                src={card.src}
                alt={card.label}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="108px"
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
          marginTop: 18,
          opacity: open ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        7 chapters. One world.
      </p>
    </div>
  );
}
