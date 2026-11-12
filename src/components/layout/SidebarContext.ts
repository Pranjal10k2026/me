import { createContext } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);