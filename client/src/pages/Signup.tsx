import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from '@/components/auth/SignupForm';
import { useToast } from '@/hooks/use-toast';
import type { SignupCredentials } from '@/types';
import { ROUTES } from '@/constants';
import axios from "@/api/axios";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();


const handleSignup = async (credentials: SignupCredentials) => {
  setIsLoading(true);

  try {
    const res = await axios.post("/users/signup", credentials); // ✅ real signup
    const { user } = res.data;

    toast({
      title: "Account created!",
      description: "Welcome to ChatApp. You can now log in.",
    });

    // OPTIONAL: Log the user in immediately
    navigate(ROUTES.LOGIN, { replace: true });
  } catch (error: any) {
    toast({
      title: "Signup failed",
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
            Join ChatApp
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Create your account and start connecting
          </motion.p>
        </div>

        <SignupForm onSubmit={handleSignup} isLoading={isLoading} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}