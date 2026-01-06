import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return null;

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
