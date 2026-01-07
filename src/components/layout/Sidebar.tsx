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

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-sidebar-bg border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Bike className="w-4 h-4" aria-hidden="true" />
            <div className="text-lg font-normal text-foreground truncate">
              pranjakalekar.me
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Applied AI Engineer</p>
        </div>
        <ThemeToggle />
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
        <p className="text-xs text-muted-foreground">© 2026 Pranjal Kalekar</p>
      </div>
    </aside>
  );
}
