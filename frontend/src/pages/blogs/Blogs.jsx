import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const categories = [
  "All",
  "Technology",
  "Quality Control",
  "Sustainability",
  "Industry News",
  "Innovation",
  "Other",
];

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");

        const data = await response.json();

        const formatted = data
          .filter((blog) => blog.published === true)
          .map((blog) => ({
            id: blog._id,
            title: blog.title,
            excerpt:
              blog.excerpt ||
              blog.content.substring(0, 120).trim() + "...",
            content: blog.content,
            author: blog.author || "Admin",
            date: blog.date || blog.createdAt,
            category: categories.includes(blog.category)
              ? blog.category
              : "Other",
            image: Array.isArray(blog.image)
              ? blog.image[0]
              : blog.image ||
                "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21",
            readTime: blog.readTime || "3 min read",
          }));

        setBlogPosts(formatted);
      } catch (err) {
        setError("Unable to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading articles…</div>;

  if (error)
    return (
      <div className="text-center py-20 text-red-500">{error}</div>
    );

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

  const handlePrev = () => {
    setCurrentIndex((i) =>
      i === 0 ? filteredPosts.length - 1 : i - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((i) =>
      i === filteredPosts.length - 1 ? 0 : i + 1
    );
  };

  return (
    <div className="w-full bg-white">

      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4"
        >
          Industry Insights & Articles
        </motion.h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Insights on industrial technology, quality control, sustainability,
          and innovations shaping modern manufacturing.
        </p>
      </section>

      <SectionDivider />

      {/* ================= CATEGORY FILTER ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
                selectedCategory === cat
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-yellow-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ================= BLOG GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaClock /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {post.date}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setCurrentIndex(index);
                  }}
                  className="text-yellow-600 font-semibold hover:underline"
                >
                  Read Article →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={filteredPosts[currentIndex].image}
                  alt={filteredPosts[currentIndex].title}
                  className="h-64 w-full object-cover"
                />

                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full"
                >
                  <FaTimes />
                </button>

                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">
                  {filteredPosts[currentIndex].title}
                </h2>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <FaUser /> {filteredPosts[currentIndex].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {filteredPosts[currentIndex].readTime}
                  </span>
                </div>

                <div className="prose max-w-none text-gray-700">
                  {filteredPosts[currentIndex].content
                    .split("\n\n")
                    .map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function SectionDivider() {
  return (
    <div className="flex justify-center my-10">
      <div className="w-24 h-1 bg-yellow-500 rounded-full" />
    </div>
  );
}

export default Blogs;
