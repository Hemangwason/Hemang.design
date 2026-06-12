import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Main content — offset by sidebar on desktop */}
      <main className="lg:ml-[360px] px-6 pt-4 pb-16 lg:px-14 lg:pt-14">
        <ProjectGrid />
      </main>
    </div>
  );
}
