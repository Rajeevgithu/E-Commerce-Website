const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/s3Upload");

/* ===============================
   PUBLIC ROUTES
================================ */

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category.toLowerCase() !== "all") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Product fetch error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

/* ===============================
   ADMIN ROUTES (JWT REQUIRED)
================================ */

// POST /api/products (CREATE PRODUCT + S3 IMAGE)
// router.post in your products route file
router.post(
  "/",
  adminAuth,
  upload.array("images", 5), // Change "image" to "images" and .single to .array
  async (req, res) => {
    try {
      // 1. Check if files were uploaded (req.files for arrays, not req.file)
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Product images are required" });
      }

      const { name, description, category, availability } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      // 2. Map through the uploaded files to get their S3 locations
      const imageUrls = req.files.map((file) => file.location);

      // 3. Create the product
      const product = await Product.create({
        name,
        description,
        category,
        availability,
        image: imageUrls, // This now matches your array structure
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({
        message: "Failed to create product",
        error: error.message,
      });
    }
  }
);


// PUT /api/products/:id (UPDATE PRODUCT + OPTIONAL IMAGES)
router.put(
  "/:id",
  adminAuth,
  // 1. Changed .single("image") to .array("images") to match frontend
  upload.array("images", 5), 
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update text fields if they exist in req.body
      if (req.body.name !== undefined) product.name = req.body.name;
      if (req.body.description !== undefined) product.description = req.body.description;
      if (req.body.category !== undefined) product.category = req.body.category;
      if (req.body.brand !== undefined) product.brand = req.body.brand; // Added brand from your frontend
      if (req.body.availability !== undefined) product.availability = req.body.availability;

      // 2. Handle Image Uploads
      // If new images are uploaded via Multer, they appear in req.files
      if (req.files && req.files.length > 0) {
        const newImageUrls = req.files.map((file) => file.location);
        
        // Option: Replace old images with new ones (standard for single-item updates)
        product.image = newImageUrls; 
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      console.error("Update product error:", error);
      res.status(500).json({
        message: "Failed to update product",
        error: error.message,
      });
    }
  }
);

// DELETE /api/products/:id
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Logic for deleting from DB
    await product.deleteOne();
    
    // Note: You may want to add logic here to delete the files from S3 
    // using the AWS SDK to save storage space.

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
