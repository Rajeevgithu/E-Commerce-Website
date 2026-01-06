import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminGuard;
