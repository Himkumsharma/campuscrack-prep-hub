import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Dashboard, { DashboardHome, DashboardProfile, DashboardStats, DashboardSettings } from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="student">
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<DashboardProfile />} />
              <Route path="stats" element={<DashboardStats />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
