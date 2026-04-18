import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/common/Loader";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <Loader label="Checking session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
