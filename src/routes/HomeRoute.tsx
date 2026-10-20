import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LandingPage from "../pages/customer/LandingPage";
import Home from "../pages/customer/Home";

export default function HomeRoute() {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) return <LandingPage />;
  if (role === "admin") return <Navigate to="/admin" replace />;

  return <Home />;
}
