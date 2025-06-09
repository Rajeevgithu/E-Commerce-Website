import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post('/api/auth/login', formData);
      setLoading(false);
      onClose(); // Close modal on success
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-transparent flex items-center justify-center z-[9999]">
      <div className="w-full max-w-md bg-white border border-black rounded-xl shadow-md p-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-4xl"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold text-black text-center mb-6">Login</h1>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-black font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-1 text-black font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-black">
          Don't have an account?{' '}
          <Link to="/signup" className="underline hover:text-gray-700">
            Sign up
          </Link>
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-gray-600">or login with</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handleOAuth('google')}
              className="flex items-center space-x-2 px-4 py-2 border border-black rounded hover:bg-gray-100"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span className="text-black text-sm font-medium">Google</span>
            </button>

            <button
              onClick={() => handleOAuth('facebook')}
              className="flex items-center space-x-2 px-4 py-2 border border-black rounded hover:bg-gray-100"
            >
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5" />
              <span className="text-black text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
