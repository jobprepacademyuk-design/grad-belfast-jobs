import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FindJobs from "./pages/FindJobs";
import JobListings from "./pages/JobListings";
import ApplicationHelp from "./pages/ApplicationHelp";
import SignIn from "./pages/SignIn";
import Pricing from "./pages/Pricing";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/jobs/:category" element={<JobListings />} />
          <Route path="/help" element={<ApplicationHelp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/thanks" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
