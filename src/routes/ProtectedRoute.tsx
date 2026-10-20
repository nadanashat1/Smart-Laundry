import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { homePathFor, useAuthStore } from "../store/authStore";
import type { UserRole } from "../store/authStore";

type ProtectedRouteProps = {
  role: UserRole;
  children?: ReactNode;
};

export default function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { isAuthenticated, role: userRole } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    const loginPath = role === "admin" ? "/admin/login" : "/login";
    return <Navigate to={loginPath} replace state={{ from: location.pathname }} />;
  }

  if (userRole !== role) {
    return <Navigate to={homePathFor(userRole)} replace />;
  }

  return children ?? <Outlet />;
}
