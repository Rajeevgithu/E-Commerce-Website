import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // user | admin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth(); // ✅ SINGLE SOURCE
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔥 Delegate login to AuthContext
      await login(email, password, role);

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
      <div className="w-full max-w-md bg-white border border-black rounded-xl shadow-md p-6 relative">
        {/* Close */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-3xl"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        {/* Role Selector */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded font-medium ${
              role === "user"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded font-medium ${
              role === "admin"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Admin
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-black rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-black text-white rounded font-semibold"
          >
            {loading ? "Logging in..." : `Login as ${role}`}
          </button>
        </form>

        {/* Signup only for USER */}
        {role === "user" && (
          <div className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold underline hover:text-gray-700"
            >
              Create one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
