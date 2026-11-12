import { NavLink, useLocation } from "react-router-dom";
import { Home, Lightbulb, Quote, Camera, Bike } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Current Ideas", href: "/ideas", icon: Lightbulb },
  { name: "Daily Quotes", href: "/quotes", icon: Quote },
  { name: "Pranpaan", href: "/pranpaan", icon: Camera },
  { name: "Cycling", href: "/cycling", icon: Bike },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen overflow-y-auto bg-sidebar-bg border-r border-sidebar-border flex flex-col transition-[width] duration-200 text-[#34283C] dark:text-[#FFF9E6] ${
        collapsed ? "w-16" : "w-[260px]"
      }`}
    >
      <div
        className={`border-b border-sidebar-border flex gap-2 ${
          collapsed
            ? "p-2 flex-col items-center"
            : "p-4 items-start justify-between"
        }`}
      >
        <div className={collapsed ? "hidden" : "min-w-0"}>
          <div className="flex items-center gap-2">
            <Bike className="w-4 h-4 shrink-0" aria-hidden="true" />
            <div className="text-lg font-normal text-[#34283C] dark:text-[#FFF9E6] truncate">
              Pranjal Kalekar
            </div>
          </div>
          <p className="text-xs text-[#34283C] dark:text-[#FFF9E6] mt-1">
            Optimizing Data
          </p>
        </div>

        <div
          className={`flex items-center ${
            collapsed ? "flex-col" : "flex-row"
          }`}
        >
          <ThemeToggle />
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="w-10 h-10 shrink-0 rounded text-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {collapsed ? ">>" : "<<"}
          </button>
        </div>
      </div>

      <nav className="flex-1 py-4" aria-label="Main navigation">
        <ul className={`space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  aria-label={item.name}
                  title={item.name}
                  className={`sidebar-link flex min-h-11 items-center gap-3 rounded ${
                    collapsed ? "justify-center" : "justify-start"
                  } ${isActive ? "active bg-[#FFF2D0] dark:bg-[#402451]" : ""}`}
                >
                  <item.icon
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-[#34283C] dark:text-[#FFF9E6]">
            © 2026 Pranjal Kalekar
          </p>
        </div>
      )}
    </aside>
  );
}