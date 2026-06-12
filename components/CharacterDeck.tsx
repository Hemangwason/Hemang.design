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

export default function CharacterDeck() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState<number | null>(null);

  const count = cards.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)" }}>
        Jex &amp; Lin universe
      </p>

      {/* Deck */}
      <div
        style={{ position: "relative", width: 80, height: 120, cursor: "pointer" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => { setOpen(false); setFlipped(null); }}
      >
        {cards.map((card, i) => {
          const spread = open ? (i - (count - 1) / 2) * 28 : (i - (count - 1) / 2) * 3;
          const rotate = open ? (i - (count - 1) / 2) * 10 : (i - (count - 1) / 2) * 1.5;
          const lift = flipped === i ? -20 : open ? -(i * 3) : 0;
          const scale = flipped === i ? 1.12 : 1;
          return (
            <div
              key={card.src}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 80,
                height: 120,
                borderRadius: 10,
                overflow: "hidden",
                transformOrigin: "bottom center",
                transform: `translateX(${spread}px) translateY(${lift}px) rotate(${rotate}deg) scale(${scale})`,
                transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                zIndex: i,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <Image src={card.src} alt={card.label} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="80px" />
            </div>
          );
        })}
      </div>

      {open && (
        <p style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em" }}>
          7 chapters. One world.
        </p>
      )}
    </div>
  );
}
