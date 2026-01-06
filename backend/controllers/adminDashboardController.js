const User = require('../models/User');
const Product = require('../models/Product');
const Blog = require('../models/Blog');
const Cart = require('../models/Cart');

// ===============================
// GET DASHBOARD SUMMARY
// ===============================
const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalBlogs,
      totalCarts,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Product.countDocuments(),
      Blog.countDocuments(),
      Cart.countDocuments(),
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalBlogs,
      totalCarts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load dashboard summary' });
  }
};

// ===============================
// GET RECENT USERS
// ===============================
const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users' });
  }
};

// ===============================
// GET RECENT CARTS
// ===============================
const getRecentCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('userId', 'name email')
      .sort({ updatedAt: -1 })
      .limit(5);

    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load carts' });
  }
};

module.exports = {
  getDashboardSummary,
  getRecentUsers,
  getRecentCarts,
};
