import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears Zustand state
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} variant="ghost">
      Logout
    </Button>
  );
}
