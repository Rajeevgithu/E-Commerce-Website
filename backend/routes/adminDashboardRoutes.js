const express = require('express');
const router = express.Router();

const {
  getDashboardSummary,
  getRecentUsers,
  getRecentCarts,
} = require('../controllers/adminDashboardController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// 🔐 All routes are ADMIN ONLY
router.use(protect, isAdmin);

// 📊 Dashboard summary
router.get('/summary', getDashboardSummary);

// 👥 Recent users
router.get('/users', getRecentUsers);

// 🛒 Recent carts
router.get('/carts', getRecentCarts);

module.exports = router;
