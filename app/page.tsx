"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <main
        className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"} px-6 pt-8 pb-16 lg:px-14 lg:pt-14`}
      >
        <ProjectGrid />
      </main>
    </div>
  );
}
