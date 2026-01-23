import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../../api/axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // FILE, not URL
    published: false,
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  /* ================= ACTIONS ================= */

  const handleAdd = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      image: null,
      published: false,
    });
    setShowModal(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: null, // optional replacement
      published: blog.published,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog permanently?")) return;

    try {
      await api.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete blog");
    }
  };

  const togglePublish = async (id) => {
    try {
      const blog = blogs.find((b) => b._id === id);

      const form = new FormData();
      form.append("published", !blog.published);

      const res = await api.put(`/api/blogs/${id}`, form);

      setBlogs(
        blogs.map((b) => (b._id === id ? res.data : b))
      );
    } catch {
      alert("Failed to update publish status");
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("published", formData.published);
    data.append(
      "excerpt",
      formData.content.substring(0, 120) + "..."
    );
    data.append(
      "readTime",
      Math.ceil(formData.content.split(" ").length / 200) +
        " min read"
    );
    data.append("author", "Admin");
    data.append("category", "General");
    data.append(
      "date",
      new Date().toISOString().split("T")[0]
    );

    if (formData.image) {
      data.append("image", formData.image); // 🔑 MUST MATCH upload.single("image")
    }

    try {
      if (editingBlog) {
        const res = await api.put(
          `/api/blogs/${editingBlog._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setBlogs(
          blogs.map((b) =>
            b._id === editingBlog._id ? res.data : b
          )
        );
      } else {
        const res = await api.post("/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setBlogs([...blogs, res.data]);
      }

      setShowModal(false);
      setEditingBlog(null);
    } catch {
      alert("Failed to save blog");
    }
  };

  /* ================= FILTERING ================= */

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && blog.published) ||
      (filterStatus === "draft" && !blog.published);

    return matchesSearch && matchesStatus;
  });

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Blogs
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage articles, publishing status, and content
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 
          bg-indigo-600 text-white rounded-lg font-semibold 
          hover:bg-indigo-500 transition"
        >
          <Plus size={18} />
          Create Blog
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 
            rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex gap-2">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                filterStatus === status
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* ================= BLOG GRID ================= */}
      {loading && <p className="text-gray-500">Loading blogs…</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {!loading && filteredBlogs.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-500">
            No blogs found
          </div>
        )}

        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    blog.published
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {blog.published ? "Published" : "Draft"}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(
                    blog.date || blog.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {blog.excerpt}
              </p>

              <div className="flex items-center gap-2 pt-4 border-t">
                <button
                  onClick={() => togglePublish(blog._id)}
                  className={`flex-1 flex items-center justify-center gap-2 
                  px-3 py-2 rounded-lg text-sm transition ${
                    blog.published
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {blog.published ? (
                    <>
                      <EyeOff size={16} /> Unpublish
                    </>
                  ) : (
                    <>
                      <Eye size={16} /> Publish
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleEdit(blog)}
                  className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">
                {editingBlog ? "Edit Blog" : "Create Blog"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(v) =>
                  setFormData({ ...formData, title: v })
                }
              />

              <Textarea
                label="Content"
                rows={7}
                value={formData.content}
                onChange={(v) =>
                  setFormData({ ...formData, content: v })
                }
              />

              {/* 🔑 FILE INPUT (NO URL) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      published: e.target.checked,
                    })
                  }
                />
                Publish immediately
              </label>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500"
                >
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= SMALL INPUT COMPONENTS ================= */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>
  );
}

function Textarea({ label, rows, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>
  );
}
