"use client";

import { useState } from "react";
import Image from "next/image";

const CARDS = [
  { src: "/characters/jex-selfie.png",    label: "Jex",       rotate: -7,  x: 0,   y: 12 },
  { src: "/characters/mirror-selfie.png", label: "Lin",       rotate:  2,  x: 52,  y: 2  },
  { src: "/characters/kurta-saree.png",   label: "Jex & Lin", rotate: -4,  x: 104, y: 16 },
  { src: "/characters/baseball.png",      label: "Jex",       rotate:  5,  x: 156, y: 0  },
  { src: "/characters/track.png",         label: "Jex & Lin", rotate: -2,  x: 206, y: 8  },
];

const CARD_W = 62;
const CARD_H = 88;
const IMG_H = CARD_H - 6 - 20; // top pad 6, bottom caption 20
const CONTAINER_W = 206 + CARD_W; // 268
const CONTAINER_H = 120; // room for rotation overflow

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
          marginBottom: 20,
        }}
      >
        Jex &amp; Lin universe
      </p>

      <div style={{ position: "relative", width: CONTAINER_W, height: CONTAINER_H }}>
        {CARDS.map((card, i) => {
          const isHov = hovered === i;
          return (
            <div
              key={card.src}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                left: card.x,
                top: card.y,
                width: CARD_W,
                height: CARD_H,
                background: "#f9f8f6",
                padding: "6px 6px 0 6px",
                borderRadius: 2,
                boxShadow: isHov
                  ? "0 18px 40px rgba(0,0,0,0.26), 0 4px 10px rgba(0,0,0,0.14)"
                  : "0 3px 10px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.08)",
                transform: isHov
                  ? `rotate(${card.rotate * 0.25}deg) translateY(-14px) scale(1.1)`
                  : `rotate(${card.rotate}deg)`,
                transition: "transform 0.32s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.32s ease",
                zIndex: isHov ? 20 : i,
                cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Photo */}
              <div
                style={{
                  width: CARD_W - 12,
                  height: IMG_H,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 1,
                }}
              >
                <Image
                  src={card.src}
                  alt={card.label}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  sizes="50px"
                />
              </div>

              {/* Polaroid caption */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 7.5,
                  letterSpacing: "0.05em",
                  color: "rgba(26,25,23,0.42)",
                  margin: "5px 0 6px",
                  lineHeight: 1,
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {card.label}
              </p>
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
        }}
      >
        7 chapters. One world.
      </p>
    </div>
  );
}
