import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import { ROUTES } from "./constants";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Wrapper: waits for authStore to initialize (no flicker)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized, user, initialize } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) initialize();
  }, [isInitialized]);

  if (!isInitialized) return <div className="flex items-center justify-center h-screen text-muted-foreground">Loading...</div>;

  return user ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized, user, initialize } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) initialize();
  }, [isInitialized]);

  if (!isInitialized) return <div className="flex items-center justify-center h-screen text-muted-foreground">Loading...</div>;

  return user ? <Navigate to={ROUTES.CHAT} replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path={ROUTES.HOME} element={<Index />} />

            <Route path={ROUTES.LOGIN} element={
              <AuthRoute><Login /></AuthRoute>
            } />

            <Route path={ROUTES.SIGNUP} element={
              <AuthRoute><Signup /></AuthRoute>
            } />

            <Route path={ROUTES.FORGOT_PASSWORD} element={
              <AuthRoute><ForgotPassword /></AuthRoute>
            } />

            <Route path={ROUTES.CHAT} element={
              <ProtectedRoute><Chat /></ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
