const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// GET /api/products - with optional category and search query
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category.toLowerCase() !== 'all') {
      filter.category = { $regex: new RegExp('^' + category + '$', 'i') };
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter);
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in "${category}" category.` });
    }

    res.json(products);
  } catch (error) {
    console.error('Product fetch error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/products/:id - get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/products - Admin: Create a new product
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create Product Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/products/:id - Admin: Update a product
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/products/:id - Admin: Delete a product
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
