const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Authenticated user info
router.get('/me', protect, getUserProfile);  // ✅ Changed from /profile to /me

module.exports = router;
