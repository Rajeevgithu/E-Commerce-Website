const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");
const blogUpload = require("../middleware/blogUpload");

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

/* ===============================
   PUBLIC ROUTES
================================ */

// GET /api/blogs
router.get("/", getBlogs);

// GET /api/blogs/:id
router.get("/:id", getBlogById);

/* ===============================
   ADMIN ROUTES (JWT REQUIRED)
================================ */

// POST /api/blogs (Create blog + upload image to S3)
router.post(
  "/",
  adminAuth,
  blogUpload.single("image"), // ✅ uploads to blogs/ folder in S3
  createBlog
);

// PUT /api/blogs/:id (Update blog + optional image replace)
router.put(
  "/:id",
  adminAuth,
  blogUpload.single("image"), // ✅ replaces blog image in S3
  updateBlog
);

// DELETE /api/blogs/:id
router.delete("/:id", adminAuth, deleteBlog);

module.exports = router;
