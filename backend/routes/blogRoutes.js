const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/s3Upload");

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
  upload.single("image"), // 🔑 REQUIRED for S3
  createBlog
);

// PUT /api/blogs/:id (Update blog + optional image replace)
router.put(
  "/:id",
  adminAuth,
  upload.single("image"), // 🔑 REQUIRED for S3
  updateBlog
);

// DELETE /api/blogs/:id
router.delete("/:id", adminAuth, deleteBlog);

module.exports = router;
