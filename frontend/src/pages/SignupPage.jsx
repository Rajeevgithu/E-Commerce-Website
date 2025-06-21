import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await axios.post("/api/auth/signup", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setServerError(error.response?.data?.message || "Signup failed");
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border border-black rounded-xl shadow-md p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-2 text-black text-3xl sm:text-4xl font-bold hover:text-red-600"
          aria-label="Close signup form"
        >
          &times;
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-6">Sign Up</h1>

        {serverError && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-center font-medium text-sm sm:text-base">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-black font-medium mb-1 text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.username ? "border-red-500" : "border-black"
              } rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-black font-medium mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-black"
              } rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-black font-medium mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-black"
              } rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-black font-medium mb-1 text-sm sm:text-base">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-black"
              } rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center text-sm sm:text-base">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2 border-black"
            />
            <label htmlFor="agreeTerms" className="text-black">
              I agree to the terms and conditions
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition text-sm sm:text-base ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Already have an account */}
        <div className="mt-6 text-center text-black text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-gray-700">
            Login
          </Link>
        </div>

        {/* Social Signup */}
        <div className="mt-6">
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-gray-600 text-sm">or sign up with</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-black rounded hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-black text-sm font-medium">Google</span>
            </button>

            <button
              onClick={() => handleOAuth("facebook")}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-black rounded hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="text-black text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
