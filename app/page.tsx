"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";
import Loader from "@/components/Loader";
import { GyroProvider } from "@/lib/gyro";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarW = sidebarOpen ? 340 : 52;

  return (
    <GyroProvider>
      <div style={{ minHeight: "100vh" }}>
        <Loader />
        <Sidebar open={sidebarOpen} />

        {/* Desktop toggle button — straddles sidebar edge */}
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
          style={{
            marginLeft: isLg ? sidebarW : 0,
            paddingTop: isLg ? 56 : 56 + 20,
            paddingBottom: 64,
            paddingLeft: isLg ? 56 : 20,
            paddingRight: isLg ? 56 : 20,
            transition: isLg ? "margin-left 0.4s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
          }}
        >
          <ProjectGrid />
        </main>
      </div>
    </GyroProvider>
  );
}
