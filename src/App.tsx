import { useState } from "react";
import { SidebarContext } from "@/components/layout/SidebarContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ideas from "./pages/Ideas";
import Quotes from "./pages/Quotes";
import Pranpaan from "./pages/Pranpaan";
import Cycling from "./pages/Cycling";
import NotFound from "./pages/NotFound";
import PetCanvas from "@/components/PetCanvas";


const queryClient = new QueryClient();

function App() {
  const [collapsed, setCollapsed] = useState(false);

const toggleSidebar = () => {
  setCollapsed((previous) => !previous);
};
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <Toaster />
        <Sonner />
        <HashRouter>
          <PetCanvas />
          <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/pranpaan" element={<Pranpaan />} />
            <Route path="/cycling" element={<Cycling />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarContext.Provider>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
