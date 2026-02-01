const User = require("../models/User");
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const Cart = require("../models/Cart");

// ===============================
// GET DASHBOARD SUMMARY (ADMIN)
// ===============================
const getDashboardSummary = async (req, res) => {
  try {
    // 🔐 Role protection (MANDATORY)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const [
      totalUsers,
      totalProducts,
      totalBlogs,
      totalCarts,
    ] = await Promise.all([
      User.countDocuments({ role: { $ne: "admin" } }),
      Product.countDocuments(),
      Blog.countDocuments(),
      Cart.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalBlogs,
      totalCarts,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({
      message: "Failed to load dashboard summary",
    });
  }
};

// ===============================
// GET RECENT USERS (ADMIN)
// ===============================
const getRecentUsers = async (req, res) => {
  try {
    // 🔐 Role protection
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({ role: { $ne: "admin" } })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Recent users error:", error);
    res.status(500).json({
      message: "Failed to load users",
    });
  }
};

// ===============================
// GET RECENT CARTS (ADMIN)
// ===============================
const getRecentCarts = async (req, res) => {
  try {
    // 🔐 Role protection
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const carts = await Cart.find()
      .populate("userId", "name email")
      .sort({ updatedAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      carts,
    });
  } catch (error) {
    console.error("Recent carts error:", error);
    res.status(500).json({
      message: "Failed to load carts",
    });
  }
};

module.exports = {
  getDashboardSummary,
  getRecentUsers,
  getRecentCarts,
};
