import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/shared/DashboardHeader";
import DashboardAside from "../components/shared/DashboardAside";
import Footer from "../components/shared/Footer";

export default function AdminLayout() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <DashboardAside
          isOpen={isAsideOpen}
          onClose={() => setIsAsideOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader onMenuClick={() => setIsAsideOpen(true)} />

          <main className="flex-1 px-4">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
