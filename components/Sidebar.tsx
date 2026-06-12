"use client";

import { Instagram, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";
import CharacterDeck from "./CharacterDeck";

const EMAIL = "hemangwason@gmail.com";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

interface Props {
  open: boolean;
}

export default function Sidebar({ open }: Props) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Desktop sidebar — fixed, collapsible */}
      <aside
        className="hidden lg:block"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: open ? 360 : 52,
          transition: "width 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          overflow: "hidden",
          background: "var(--bg)",
          borderRight: "1px solid rgba(26,25,23,0.07)",
          zIndex: 50,
        }}
      >
        {/* Collapsed pill label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: open ? 0 : 0.2,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "var(--text)",
          }}
          className="font-poppins"
        >
          JEXLIN
        </div>

        {/* Full content */}
        <div
          style={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            transition: "opacity 0.18s ease",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "28px 40px 36px",
            minWidth: 360,
            overflowY: "auto",
          }}
        >
          {/* Brand */}
          <div style={{ marginBottom: 32 }}>
            <h1
              className="font-poppins"
              style={{ fontWeight: 600, fontSize: 17, lineHeight: 1.3, color: "var(--text)" }}
            >
              Jexlin
            </h1>
            <p style={{ fontSize: 13, marginTop: 2, color: "var(--text-2)" }}>
              A World by Hemang
            </p>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 32 }}>
            <p
              style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-2)", marginBottom: 10 }}
            >
              Product designer building things at{" "}
              <span style={{ color: "var(--text)" }}>Zepto</span>. Previously{" "}
              <span style={{ color: "var(--text)" }}>Zomato</span>.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-2)" }}>
              Five things that escaped my notebook and got built anyway.
            </p>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "fit-content",
                  padding: "8px 16px",
                  borderRadius: 100,
                  fontSize: 13,
                  color: "var(--text)",
                  textDecoration: "none",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "none")
                }
              >
                <Icon size={14} strokeWidth={1.8} />
                <span>{label}</span>
              </a>
            ))}
          </div>

          {/* Character deck — pushed toward bottom */}
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 28 }}>
            <CharacterDeck />
          </div>

          {/* Email */}
          <button
            onClick={copyEmail}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              width: "fit-content",
              marginTop: 16,
            }}
          >
            <span style={{ fontSize: 12, color: "var(--text-3)" }}>{EMAIL}</span>
            <span style={{ color: "var(--text-3)" }}>
              {copied ? <Check size={11} strokeWidth={2} /> : <Copy size={11} strokeWidth={1.8} />}
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden px-6 pt-8 pb-6">
        <h1
          className="font-poppins"
          style={{ fontWeight: 600, fontSize: 17, color: "var(--text)" }}
        >
          Jexlin
        </h1>
        <p style={{ fontSize: 12, marginTop: 2, color: "var(--text-2)" }}>
          A World by Hemang
        </p>
        <p
          style={{
            fontSize: 12,
            marginTop: 14,
            lineHeight: 1.65,
            maxWidth: 320,
            color: "var(--text-2)",
          }}
        >
          Product designer at Zepto. Five things built because they had to exist.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 14px",
                borderRadius: 100,
                fontSize: 12,
                color: "var(--text)",
                textDecoration: "none",
              }}
            >
              <Icon size={13} strokeWidth={1.8} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </header>
    </>
  );
}
