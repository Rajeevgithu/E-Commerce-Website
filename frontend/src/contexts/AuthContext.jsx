import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 // Restore session
useEffect(() => {
  const restore = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Decode token safely (no backend call needed)
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Admin session → trust token + dashboard APIs
      if (payload.role === "admin") {
        setUser({
          id: payload.id,
          email: payload.email,
          role: "admin",
        });
        setLoading(false);
        return;
      }

      // Normal user session → validate with backend
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  restore();
}, []);


  const login = async (email, password, role) => {
    const endpoint =
      role === "admin" ? "/admin/login" : "/auth/login";

    const res = await api.post(endpoint, { email, password });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
