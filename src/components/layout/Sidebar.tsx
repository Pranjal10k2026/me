import { NavLink, useLocation } from "react-router-dom";
import { Home, Lightbulb, Quote, Camera, Bike } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Current Ideas", href: "/ideas", icon: Lightbulb },
  { name: "Daily Quotes", href: "/quotes", icon: Quote },
  { name: "Pranpaan", href: "/pranpaan", icon: Camera },
  { name: "Cycling", href: "/cycling", icon: Bike },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-sidebar-bg border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-mono text-lg font-semibold text-foreground">
          Pranjal Kalekar
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Applied AI Engineer
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={`sidebar-link flex items-center gap-3 rounded ${
                    isActive ? "active bg-secondary" : ""
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground font-mono">
          © 2025 Pranjal Kalekar
        </p>
      </div>
    </aside>
  );
}
