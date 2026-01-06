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
import api from '../../api/axios';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    published: false,
  });

  /* -------------------- Actions -------------------- */

  const handleAdd = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      image: "",
      published: false,
    });
    setShowModal(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      published: blog.published,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/api/blogs/${id}`);
        setBlogs(blogs.filter((b) => b._id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const togglePublish = async (id) => {
    try {
      const blog = blogs.find(b => b._id === id);
      const response = await api.put(`/api/blogs/${id}`, {
        ...blog,
        published: !blog.published
      });
      
      setBlogs(
        blogs.map((b) =>
          b._id === id ? response.data : b
        )
      );
    } catch (error) {
      console.error('Error updating blog status:', error);
      alert('Failed to update blog status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBlog) {
        // Update existing blog
        const response = await api.put(`/api/blogs/${editingBlog._id}`, {
          title: formData.title,
          content: formData.content,
          image: formData.image,
          published: formData.published,
          author: editingBlog.author || 'Admin', // Keep existing author
          category: editingBlog.category || 'General', // Keep existing category
          excerpt: formData.content.substring(0, 100) + '...', // Generate excerpt from content
          readTime: Math.ceil(formData.content.split(' ').length / 200) + ' min read' // Estimate read time
        });
        
        setBlogs(
          blogs.map((b) =>
            b._id === editingBlog._id ? response.data : b
          )
        );
      } else {
        // Create new blog
        const response = await api.post('/api/blogs', {
          title: formData.title,
          content: formData.content,
          image: formData.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
          published: formData.published,
          author: 'Admin', // Default author
          category: 'General', // Default category
          excerpt: formData.content.substring(0, 100) + '...', // Generate excerpt from content
          readTime: Math.ceil(formData.content.split(' ').length / 200) + ' min read', // Estimate read time
          date: new Date().toISOString().split('T')[0] // Current date
        });
        
        setBlogs([...blogs, response.data]);
      }

      setShowModal(false);
      setFormData({
        title: "",
        content: "",
        image: "",
        published: false,
      });
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    }
  };

  /* -------------------- Filtering -------------------- */

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "published" && blog.published) ||
      (filterStatus === "draft" && !blog.published);

    return matchesSearch && matchesFilter;
  });

  /* -------------------- UI -------------------- */

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Blogs
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage blog content
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition"
        >
          <Plus size={18} />
          Create Blog
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg capitalize border transition ${
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

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500">
            No blogs match your criteria
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl border hover:shadow-md transition overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      blog.published
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(blog.date || blog.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {blog.excerpt || blog.content.substring(0, 100) + '...'}
                </p>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <button
                    onClick={() => togglePublish(blog._id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                      blog.published
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {blog.published ? (
                      <>
                        <EyeOff size={16} />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        Publish
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
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
              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Title
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Content
                </label>
                <textarea
                  rows={7}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Image URL
                </label>
                <input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2">
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
                <span className="text-sm text-gray-700">
                  Publish immediately
                </span>
              </div>

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
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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
