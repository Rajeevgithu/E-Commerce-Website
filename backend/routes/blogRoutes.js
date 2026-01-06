const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth");

// ===============================
// PUBLIC ROUTES
// ===============================

// GET /api/blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/blogs/:id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// ADMIN ROUTES (JWT REQUIRED)
// ===============================

// POST /api/blogs
router.post("/", adminAuth, async (req, res) => {
  try {
    const { title, content, image, published } = req.body;

    const blog = new Blog({
      title,
      content,
      image,
      published,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/blogs/:id
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = req.body.title ?? blog.title;
    blog.content = req.body.content ?? blog.content;
    blog.image = req.body.image ?? blog.image;
    blog.published = req.body.published ?? blog.published;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/blogs/:id
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
