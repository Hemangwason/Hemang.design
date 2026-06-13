"use client";

import { Instagram, Twitter, Linkedin, Copy, Check, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import CharacterDeck from "./CharacterDeck";

const EMAIL = "hemangwason@gmail.com";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/hemangwason" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/hemangwason" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/hemangwason" },
];

interface Props {
  open: boolean;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "28px 28px 28px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Mobile close button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            alignSelf: "flex-end",
            marginBottom: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(26,25,23,0.06)",
            border: "1px solid rgba(26,25,23,0.10)",
            cursor: "pointer",
            color: "var(--text)",
          }}
        >
          <X size={15} strokeWidth={2} />
        </button>
      )}

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            marginBottom: 6,
          }}
        >
          A word by{" "}
          <span
            className="font-poppins"
            style={{ fontWeight: 700, color: "var(--text)", letterSpacing: "0.12em" }}
          >
            Hemang Wason
          </span>
        </p>
        <h1
          className="font-poppins"
          style={{
            fontWeight: 700,
            fontSize: 22,
            lineHeight: 1.15,
            color: "var(--text)",
            letterSpacing: "-0.03em",
          }}
        >
          Jexlin
        </h1>
      </div>

      {/* What this is + stack — single paragraph */}
      <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--text-2)", marginBottom: 24 }}>
        This isn't my portfolio — it's a live log of what happens when a product designer points a
        full AI stack at a blank canvas and ships. Built with{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Claude</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Antigravity</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Cursor</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Claude Code</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>v0</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Midjourney</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Perplexity</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Lovable</strong>,{" "}
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>Runway</strong>, etc. — from blank
        canvas to shipped in a single session. Spent the past week figuring out how to build my own
        AI orchestration.
      </p>

      {/* Portfolio link — highlighted */}
      <a
        href="https://www.hemangwason.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderRadius: 14,
          background: "rgba(26,25,23,0.88)",
          color: "#f0ece6",
          textDecoration: "none",
          marginBottom: 24,
          boxShadow: "0 4px 20px rgba(26,25,23,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
          transition: "background 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(26,25,23,1)";
          el.style.boxShadow = "0 6px 28px rgba(26,25,23,0.22), inset 0 1px 0 rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(26,25,23,0.88)";
          el.style.boxShadow = "0 4px 20px rgba(26,25,23,0.14), inset 0 1px 0 rgba(255,255,255,0.06)";
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span
            className="font-poppins"
            style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "#f0ece6" }}
          >
            See my portfolio
          </span>
          <span style={{ fontSize: 11, letterSpacing: "0.04em", color: "rgba(240,236,230,0.42)" }}>
            hemangwason.com
          </span>
        </div>
        <ExternalLink size={13} strokeWidth={1.7} style={{ opacity: 0.4, color: "#f0ece6" }} />
      </a>

      {/* Social links — equal-width row */}
      <div style={{ display: "flex", gap: 7, marginBottom: 28 }}>
        {socials.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "9px 8px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text)",
              textDecoration: "none",
              transition: "box-shadow 0.15s ease, transform 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "none";
              el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)";
            }}
          >
            <Icon size={13} strokeWidth={1.7} />
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Character deck — sits naturally after socials, no flex growth */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 24, paddingBottom: 8 }}>
        <CharacterDeck />
      </div>

      {/* Email — pinned to bottom via auto margin */}
      <button
        onClick={copyEmail}
        style={{
          marginTop: "auto",
          paddingTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 7,
          cursor: "pointer",
          width: "fit-content",
          background: "none",
          border: "none",
          padding: 0,
        }}
      >
        <span style={{ fontSize: 11, color: "var(--text-3)" }}>{EMAIL}</span>
        {copied
          ? <Check size={10} strokeWidth={2} style={{ color: "var(--text-3)" }} />
          : <Copy size={10} strokeWidth={1.8} style={{ color: "var(--text-3)" }} />}
      </button>
    </div>
  );
}

export default function Sidebar({ open }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop sidebar ────────────────────────────── */}
      <aside
        className="hidden lg:block"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: open ? 340 : 52,
          transition: "width 0.38s cubic-bezier(0.23, 1, 0.32, 1)",
          zIndex: 50,
          overflow: "visible",
        }}
      >
        {/* Collapsed vertical label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: open ? 0 : 0.2,
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "var(--text)",
          }}
          className="font-poppins"
        >
          HEMANG WASON
        </div>

        {/* Sliding panel */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 340,
            transform: open ? "translateX(0)" : "translateX(-340px)",
            transition: "transform 0.38s cubic-bezier(0.23, 1, 0.32, 1)",
            background: "var(--bg)",
            borderRight: "1px solid rgba(26,25,23,0.07)",
          }}
        >
          <SidebarContent />
        </div>
      </aside>

      {/* ── Mobile top bar ─────────────────────────────── */}
      <header
        className="lg:hidden flex items-center justify-between"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          height: 56,
          padding: "0 20px",
          background: "rgba(240,236,230,0.90)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(26,25,23,0.07)",
        }}
      >
        <div>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 1 }}>
            A word by{" "}
            <span className="font-poppins" style={{ fontWeight: 700, color: "var(--text)", letterSpacing: "0.10em" }}>
              Hemang Wason
            </span>
          </p>
          <h1
            className="font-poppins"
            style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1 }}
          >
            Jexlin
          </h1>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(26,25,23,0.06)",
            border: "1px solid rgba(26,25,23,0.10)",
            cursor: "pointer",
            color: "var(--text)",
          }}
        >
          <Menu size={17} strokeWidth={1.8} />
        </button>
      </header>

      {/* ── Mobile drawer overlay ───────────────────────── */}
      <div
        className="lg:hidden"
        onClick={() => setMobileOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 95,
          background: "rgba(10,9,8,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Mobile drawer panel ──────────────────────────── */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(300px, 86vw)",
          zIndex: 96,
          background: "var(--bg)",
          borderRight: "1px solid rgba(26,25,23,0.08)",
          boxShadow: "4px 0 40px rgba(0,0,0,0.12)",
          transform: mobileOpen ? "translateX(0)" : "translateX(-110%)",
          transition: "transform 0.38s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </div>
    </>
  );
}
