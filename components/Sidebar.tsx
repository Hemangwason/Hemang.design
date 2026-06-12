"use client";

import { Instagram, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";

const EMAIL = "hemangwason@gmail.com";

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
];

export default function Sidebar() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Desktop sidebar — fixed */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[360px] flex-col justify-between px-12 py-14">
        <div>
          {/* Brand */}
          <div className="mb-10">
            <h1
              className="font-poppins font-semibold text-[17px] leading-snug"
              style={{ color: "var(--text)" }}
            >
              Jexlin
            </h1>
            <p
              className="text-[13px] mt-0.5"
              style={{ color: "var(--text-2)" }}
            >
              A World by Hemang
            </p>
          </div>

          {/* Bio */}
          <div className="mb-10 space-y-3">
            <p
              className="text-[13px] leading-[1.75]"
              style={{ color: "var(--text-2)" }}
            >
              Product designer building things at{" "}
              <span style={{ color: "var(--text)" }}>Zepto</span>. Previously{" "}
              <span style={{ color: "var(--text)" }}>Zomato</span>.
            </p>
            <p
              className="text-[13px] leading-[1.75]"
              style={{ color: "var(--text-2)" }}
            >
              This is a small museum of AI experiments I couldn&apos;t stop
              thinking about. Jex and Lin live here too — they have since
              college.
            </p>
          </div>

          {/* Social links — glass pills */}
          <div className="flex flex-col gap-2.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-2.5 w-fit px-4 py-2 rounded-full text-[13px] hover:-translate-y-0.5 transition-transform duration-200"
                style={{ color: "var(--text)" }}
              >
                <Icon size={14} strokeWidth={1.8} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Email */}
        <button
          onClick={copyEmail}
          className="flex items-center gap-2 w-fit group"
        >
          <span
            className="text-[12px] tracking-wide"
            style={{ color: "var(--text-3)" }}
          >
            {EMAIL}
          </span>
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--text-3)" }}
          >
            {copied ? (
              <Check size={12} strokeWidth={2} />
            ) : (
              <Copy size={12} strokeWidth={1.8} />
            )}
          </span>
        </button>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden px-6 pt-8 pb-6">
        <h1
          className="font-poppins font-semibold text-[17px]"
          style={{ color: "var(--text)" }}
        >
          Jexlin
        </h1>
        <p className="text-[12px] mt-0.5" style={{ color: "var(--text-2)" }}>
          A World by Hemang
        </p>
        <p
          className="text-[12px] mt-4 leading-relaxed max-w-[320px]"
          style={{ color: "var(--text-2)" }}
        >
          Product designer at Zepto. These are five AI experiments I made.
        </p>
        <div className="flex gap-3 mt-5">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px]"
              style={{ color: "var(--text)" }}
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
