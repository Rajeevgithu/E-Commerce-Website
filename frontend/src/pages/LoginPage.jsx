import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ SANITIZE INPUTS (CRITICAL)
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      await login(cleanEmail, cleanPassword, "admin");
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
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@texttech.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-yellow-500 focus:outline-none
                  pr-14"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Eye toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-4
                  text-gray-500 hover:text-gray-800
                  focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // 🙈 Eye Off (SVG)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.81 21.81 0 0 1 5.17-6.11" />
                      <path d="M1 1l22 22" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.86 21.86 0 0 1-4.87 5.94" />
                    </svg>
                  ) : (
                    // 👁 Eye (SVG)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
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
