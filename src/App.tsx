
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ModeSelectionPage from "./pages/ModeSelectionPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import NotesPage from "./pages/NotesPage";
import ToDoPage from "./pages/ToDoPage";
import EventsPage from "./pages/EventsPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Add these imports for all mode-specific pages
import AchievementsPage from "./pages/AchievementsPage";
import CollaborationPage from "./pages/CollaborationPage";
// Student mode
import TermPage from "./pages/TermPage";
import DeadlinesPage from "./pages/DeadlinesPage";
import AcademicPage from "./pages/AcademicPage";
// Employee mode
import ProjectsPage from "./pages/ProjectsPage";
import UrgentPage from "./pages/UrgentPage";
// Personal mode
import GoalsPage from "./pages/GoalsPage";
import HabitsPage from "./pages/HabitsPage";
import GlowUpPage from "./pages/GlowUpPage";
import DiaryPage from "./pages/DiaryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mode-selection" element={<ModeSelectionPage />} />
              <Route path="/" element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/to-do" element={<ToDoPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/collab" element={<CollaborationPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                
                {/* Student Mode Pages */}
                <Route path="/term" element={<TermPage />} />
                <Route path="/deadlines" element={<DeadlinesPage />} />
                <Route path="/academic" element={<AcademicPage />} />
                
                {/* Employee Mode Pages */}
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/urgent" element={<UrgentPage />} />
                
                {/* Personal Mode Pages */}
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/glow-up" element={<GlowUpPage />} />
                <Route path="/diary" element={<DiaryPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
