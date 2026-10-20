import { Navigate, Outlet } from "react-router-dom";
import { homePathFor, useAuthStore } from "../store/authStore";

export default function GuestRoute() {
  const { isAuthenticated, role } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={homePathFor(role)} replace />;
  }

  return <Outlet />;
}
