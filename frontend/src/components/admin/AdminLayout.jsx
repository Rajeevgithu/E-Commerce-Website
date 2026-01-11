import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/blogs", label: "Blogs", icon: FileText },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-gray-800">
          <h1 className="text-lg font-semibold tracking-wide">
            Text Tech Admin
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Management Console
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-yellow-500 text-black"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm 
            text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
