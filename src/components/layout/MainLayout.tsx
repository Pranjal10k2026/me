import { useContext } from "react";
import { Sidebar } from "./Sidebar";
import { SidebarContext } from "./SidebarContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const sidebar = useContext(SidebarContext);

  if (!sidebar) {
    throw new Error("MainLayout must be inside SidebarContext.Provider");
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebar.collapsed}
        onToggle={sidebar.toggleSidebar}
      />

      <main
        className={`min-h-screen transition-[margin] duration-200 ${
          sidebar.collapsed ? "ml-16" : "ml-[260px]"
        }`}
      >
        <div className="p-4 md:p-8 max-w-5xl animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}