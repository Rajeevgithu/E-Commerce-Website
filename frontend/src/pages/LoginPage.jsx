import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔒 Admin-only login
      await login(email, password, "admin");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 relative">

        {/* Close */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-3xl"
          aria-label="Close login"
        >
          &times;
        </button>

        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Authorized personnel only
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-8">

          {error && (
            <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold 
              hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? "Authenticating..." : "Login to Admin Panel"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Text Tech Enterprises
        </div>
      </div>
    </div>
  );
}
