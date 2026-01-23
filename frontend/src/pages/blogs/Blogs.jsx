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

if (loading) {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-slate-900
        via-slate-950
        to-black
        flex items-center justify-center
      "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="
              bg-white/10 rounded-2xl overflow-hidden
              animate-pulse
            "
          >
            <div className="h-52 bg-white/20" />
            <div className="p-6 space-y-3">
              <div className="h-3 w-1/3 bg-white/20 rounded" />
              <div className="h-5 w-3/4 bg-white/20 rounded" />
              <div className="h-4 w-full bg-white/20 rounded" />
              <div className="h-4 w-2/3 bg-white/20 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


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
    <div
  className="
    relative w-full min-h-screen
    bg-gradient-to-b
    from-slate-900
    via-slate-950
    to-black
    overflow-hidden
  "
>
<div
  className="
    absolute inset-0
    bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]
    pointer-events-none
  "
/>
<div className="relative z-10">


   {/* ================= HEADER ================= */}
<section className="max-w-7xl mx-auto px-6 py-20 text-center">
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-100 mb-4"
  >
    Industry Insights & Articles
  </motion.h1>

  <p className="text-slate-300 text-lg max-w-3xl mx-auto">
    Insights on industrial technology, quality control, sustainability,
    and innovations shaping modern manufacturing.
  </p>
</section>


{/* ================= CATEGORY FILTER ================= */}
<section className="max-w-7xl mx-auto px-6 mb-16">
  <div className="flex flex-wrap justify-center gap-3">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`
          px-5 py-2 rounded-full text-sm font-medium
          border transition-all duration-300
          ${
            selectedCategory === cat
              ? "bg-yellow-500 text-black border-yellow-500 shadow-md"
              : "bg-slate-900 text-slate-300 border-white/15 hover:border-yellow-500 hover:text-white"
          }
        `}
      >
        {cat}
      </button>
    ))}
  </div>
</section>


   {/* ================= BLOG GRID ================= */}
<section className="max-w-7xl mx-auto px-6 pb-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {filteredPosts.map((post, index) => (
      <motion.div
        key={post.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="
          bg-white rounded-2xl overflow-hidden
          border border-white/15
          shadow-[0_10px_30px_rgba(0,0,0,0.25)]
          transition-all duration-300
          hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
        "
      >
        {/* IMAGE */}
        <img
          src={post.image}
          alt={post.title}
          className="h-52 w-full object-cover"
        />

        {/* CONTENT */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <FaClock /> {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> {post.date}
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-slate-900">
            {post.title}
          </h3>

          <p className="text-slate-600 text-sm mb-5">
            {post.excerpt}
          </p>

          <button
            onClick={() => {
              setSelectedPost(post);
              setCurrentIndex(index);
            }}
            className="
              inline-flex items-center
              text-yellow-600 font-semibold
              hover:underline
            "
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
      className="
        fixed inset-0 z-50
        bg-black/85
        flex items-center justify-center
        px-4
      "
      onClick={() => setSelectedPost(null)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="
          bg-white max-w-4xl w-full
          rounded-2xl overflow-hidden
          max-h-[90vh] overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL IMAGE */}
        <div className="relative">
          <img
            src={filteredPosts[currentIndex].image}
            alt={filteredPosts[currentIndex].title}
            className="h-64 w-full object-cover"
          />

          <button
            onClick={() => setSelectedPost(null)}
            className="
              absolute top-4 right-4
              bg-black/60 text-white
              p-2 rounded-full
            "
          >
            <FaTimes />
          </button>

          <button
            onClick={handlePrev}
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              bg-black/60 text-white
              p-2 rounded-full
            "
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              bg-black/60 text-white
              p-2 rounded-full
            "
          >
            <FaChevronRight />
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            {filteredPosts[currentIndex].title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <FaUser /> {filteredPosts[currentIndex].author}
            </span>
            <span className="flex items-center gap-1">
              <FaClock /> {filteredPosts[currentIndex].readTime}
            </span>
          </div>

          <div className="prose max-w-none text-slate-700">
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
    </div>
  );
};



export default Blogs;
