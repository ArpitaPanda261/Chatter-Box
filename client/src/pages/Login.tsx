import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useToast } from '@/hooks/use-toast';
import type { LoginCredentials } from '@/types';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/authStore';
import axios from '@/api/axios'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuthStore();

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/users/login", credentials);
      const { user, token } = res.data;

      login(user, token); // Store in Zustand

      toast({
        title: "Welcome back!",
        description: "You're now logged in.",
      });

      navigate(ROUTES.CHAT, { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-chat flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2"
          >
            ChatApp
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Connect with friends and colleagues
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="text-primary hover:underline font-medium"
            >
              Sign up here
            </button>
          </p>
        </motion.div>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </motion.div>
    </div>
  );
}