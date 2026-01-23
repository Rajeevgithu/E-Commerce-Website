const Product = require("../models/Product");

/* ================= CREATE PRODUCT ================= */

exports.createProduct = async (req, res) => {
  try {
    // 🔒 SAFETY CHECK
    if (!req.body) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const brand = req.body.brand;

    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and price are required" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Product image is required" });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      brand,
      image: [req.file.location], // ✅ S3 URL
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

/* ================= UPDATE PRODUCT ================= */

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.body) {
      if (req.body.name !== undefined) product.name = req.body.name;
      if (req.body.description !== undefined)
        product.description = req.body.description;
      if (req.body.price !== undefined)
        product.price = Number(req.body.price);
      if (req.body.category !== undefined)
        product.category = req.body.category;
      if (req.body.brand !== undefined)
        product.brand = req.body.brand;
    }

    // ✅ Replace image only if new file uploaded
    if (req.file) {
      product.image = [req.file.location];
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
};
