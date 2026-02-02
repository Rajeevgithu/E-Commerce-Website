const Blog = require("../models/Blog");

/**
 * @desc    Fetch all blogs
 * @route   GET /api/blogs
 * @access  Public
 */
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Fetch single blog
 * @route   GET /api/blogs/:id
 * @access  Public
 */
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Create a blog (Image uploaded to S3)
 * @route   POST /api/blogs
 * @access  Private/Admin
 */
const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      category,
      excerpt,
      readTime,
      published,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Blog image is required" });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
      category,
      image: req.file.location,
      excerpt,
      readTime,
      published: published ?? false,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create blog error:", error.message);
    res.status(500).json({ message: "Failed to create blog" });
  }
};



/**
 * @desc    Update a blog (optional image replacement)
 * @route   PUT /api/blogs/:id
 * @access  Private/Admin
 */
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const {
      title,
      content,
      author,
      category,
      excerpt,
      readTime,
      published,
    } = req.body;

    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (author !== undefined) blog.author = author;
    if (category !== undefined) blog.category = category;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (readTime !== undefined) blog.readTime = readTime;
    if (published !== undefined) blog.published = published;

    if (req.file) {
      blog.image = req.file.location;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error("Update blog error:", error.message);
    res.status(500).json({ message: "Failed to update blog" });
  }
};


/**
 * @desc    Delete a blog
 * @route   DELETE /api/blogs/:id
 * @access  Private/Admin
 */
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
