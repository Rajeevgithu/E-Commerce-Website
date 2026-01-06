import {
  TrendingUp,
  Package,
  FileText,
  Users,
  ShoppingCart,
  ArrowUp,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCarts, setRecentCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryRes, usersRes, cartsRes] = await Promise.all([
          api.get("/admin/dashboard/summary"),
          api.get("/admin/dashboard/users"),
          api.get("/admin/dashboard/carts"),
        ]);

        setSummary(summaryRes.data);
        setRecentUsers(usersRes.data);
        setRecentCarts(cartsRes.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard");
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  /* -------------------- Metrics -------------------- */

  const totalUsers = summary?.totalUsers || 0;
  const totalProducts = summary?.totalProducts || 0;
  const totalBlogs = summary?.totalBlogs || 0;
  const totalCarts = summary?.totalCarts || 0;

  /* -------------------- Charts (STATIC BUT VALID) -------------------- */

  const salesData = [
    { month: "Jan", value: totalCarts },
    { month: "Feb", value: totalCarts + 1 },
    { month: "Mar", value: totalCarts + 2 },
    { month: "Apr", value: totalCarts + 3 },
  ];

  const categoryData = [
    { name: "Users", value: totalUsers },
    { name: "Products", value: totalProducts },
    { name: "Blogs", value: totalBlogs },
    { name: "Carts", value: totalCarts },
  ];

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];

  /* -------------------- Activity Feed -------------------- */

  const recentActivity = [
    ...recentUsers.map((u) => ({
      action: "New user registered",
      item: u.email,
      time: new Date(u.createdAt).toLocaleDateString(),
      type: "user",
    })),
    ...recentCarts.map((c) => ({
      action: "Cart updated",
      item: c.userId?.email || "User",
      time: new Date(c.updatedAt).toLocaleDateString(),
      type: "cart",
    })),
  ].slice(0, 5);

  /* -------------------- UI -------------------- */

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Admin overview of users, products, blogs and carts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users />} label="Total Users" value={totalUsers} />
        <StatCard icon={<Package />} label="Total Products" value={totalProducts} />
        <StatCard icon={<FileText />} label="Total Blogs" value={totalBlogs} />
        <StatCard icon={<ShoppingCart />} label="Active Carts" value={totalCarts} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="font-semibold text-gray-900 mb-6">
            Cart Activity Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <h3 className="font-semibold text-gray-900 mb-6">
            Platform Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="font-semibold text-gray-900 mb-6">Recent Activity</h3>

        <div className="space-y-4">
          {recentActivity.length === 0 && (
            <p className="text-gray-500">No recent activity</p>
          )}

          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 pb-4 border-b last:border-0"
            >
              <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <TrendingUp size={18} />
              </div>

              <div className="flex-1">
                <p className="text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.item}</p>
              </div>

              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Stat Card -------------------- */

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-6 border hover:shadow-sm transition">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <span className="text-sm flex items-center gap-1 text-green-600">
          <ArrowUp size={14} /> Live
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
