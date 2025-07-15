import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fake delay or API call
      await new Promise((res) => setTimeout(res, 1500));

      toast.success("Reset link sent to your email");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-chat flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card p-6 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter your email and we'll send you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        <Button
          variant="link"
          type="button"
          className="w-full mt-4 text-sm"
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Back to login
        </Button>
      </motion.div>
    </div>
  );
}
