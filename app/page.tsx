"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarW = sidebarOpen ? 360 : 52;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} />

      {/* Toggle button — straddles sidebar edge, always above everything */}
      {isLg && (
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          style={{
            position: "fixed",
            left: sidebarW - 14,
            top: 22,
            zIndex: 60,
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "left 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            background: "var(--bg)",
            border: "1px solid rgba(26,25,23,0.12)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1), 0 0 0 4px var(--bg)",
            color: "var(--text-2)",
          }}
        >
          {sidebarOpen ? (
            <ChevronLeft size={12} strokeWidth={2.5} />
          ) : (
            <ChevronRight size={12} strokeWidth={2.5} />
          )}
        </button>
      )}

      <main
        className="px-6 pt-8 pb-16 lg:px-14 lg:pt-14"
        style={{
          marginLeft: isLg ? sidebarW : 0,
          transition: "margin-left 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <ProjectGrid />
      </main>
    </div>
  );
}
