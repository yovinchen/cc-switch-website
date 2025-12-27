import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import CCSwitchHome from "./pages/CCSwitchHome";
import DocsPage from "./pages/DocsPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<CCSwitchHome />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
