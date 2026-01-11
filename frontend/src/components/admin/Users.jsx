import { useState, useEffect } from "react";
import { Search, Trash2, User } from "lucide-react";
import api from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        setUsers(response.data);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };

  const toggleUserRole = async (id) => {
    try {
      const user = users.find((u) => u._id === id);
      const response = await api.put(`/users/${id}`, {
        ...user,
        role: user.role === "user" ? "admin" : "user",
      });

      setUsers(
        users.map((u) => (u._id === id ? response.data : u))
      );
    } catch {
      alert("Failed to update user role");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Users
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage user accounts and admin permissions
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 
            rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Loading users…
                </td>
              </tr>
            )}

            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="text-indigo-600" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {user._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => toggleUserRole(user._id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        user.role === "admin"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {user.role === "admin" ? "Demote" : "Promote"}
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
