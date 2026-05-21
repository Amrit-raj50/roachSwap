import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { COPY } from "../../utils/roachCopy";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center font-mono text-roach-ink">{COPY.loading}</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
