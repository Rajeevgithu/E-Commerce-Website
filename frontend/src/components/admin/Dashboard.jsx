import {
  TrendingUp,
  Package,
  FileText,
  Users,
  ShoppingCart,
  ArrowUpRight,
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
      } catch {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading dashboard…</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  const totalUsers = summary?.totalUsers || 0;
  const totalProducts = summary?.totalProducts || 0;
  const totalBlogs = summary?.totalBlogs || 0;
  const totalCarts = summary?.totalCarts || 0;

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

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  const recentActivity = [
    ...recentUsers.map((u) => ({
      action: "New user registered",
      item: u.email,
      time: new Date(u.createdAt).toLocaleDateString(),
    })),
    ...recentCarts.map((c) => ({
      action: "Cart updated",
      item: c.userId?.email || "User",
      time: new Date(c.updatedAt).toLocaleDateString(),
    })),
  ].slice(0, 6);

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          System-level snapshot of platform activity and usage
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={totalUsers} icon={<Users />} />
        <StatCard title="Products" value={totalProducts} icon={<Package />} />
        <StatCard title="Blogs" value={totalBlogs} icon={<FileText />} />
        <StatCard title="Active Carts" value={totalCarts} icon={<ShoppingCart />} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard title="Cart Activity Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Platform Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={95}
                dataKey="value"
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Recent Activity
        </h3>

        {recentActivity.length === 0 && (
          <p className="text-gray-500 text-sm">No recent activity</p>
        )}

        <div className="space-y-5">
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-4 pb-4 border-b last:border-none"
            >
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <TrendingUp size={18} />
              </div>

              <div className="flex-1">
                <p className="text-gray-900 text-sm">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.item}
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-5">
        <div className="h-12 w-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs text-green-600 flex items-center gap-1">
          <ArrowUpRight size={14} />
          Live
        </span>
      </div>

      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-semibold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  );
}

/* ================= CHART WRAPPER ================= */

function ChartCard({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}
