const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware'); // 🔐 Auth middleware

// 🛒 POST: Add or update item in user's cart
router.post('/:userId', protect, async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid userId or productId' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingIndex !== -1) {
        cart.items[existingIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate('items.productId');
    res.status(200).json(populatedCart);
  } catch (err) {
    console.error('Cart Add Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 📦 GET: Fetch user's cart
router.get('/:userId', protect, async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ PATCH: Remove item from cart
router.patch('/:userId/remove', protect, async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid userId or productId' });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    const updatedCart = await cart.populate('items.productId');
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
