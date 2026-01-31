const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
  getRecentUsers,
  getRecentCarts,
} = require("../controllers/adminDashboardController");

const adminAuth = require("../middleware/adminAuth");

// 🔐 All routes are ADMIN ONLY
router.use(adminAuth);

// 📊 Dashboard summary
router.get("/summary", getDashboardSummary);

// 👥 Recent users
router.get("/users", getRecentUsers);

// 🛒 Recent carts
router.get("/carts", getRecentCarts);

module.exports = router;
