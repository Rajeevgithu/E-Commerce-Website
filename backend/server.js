const express = require("express");
const cors = require("cors");
const path = require("path");          // ✅ ADD THIS
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// ================== DATABASE ==================
connectDB();

// ================== CORS ==================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ================== MIDDLEWARE ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ADD THIS BLOCK (STATIC FILES)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================== ROUTES ==================

// 🔐 ADMIN AUTH
app.use("/api/admin", require("./routes/adminAuthRoutes"));

// 📊 ADMIN DASHBOARD
app.use("/api/admin/dashboard", require("./routes/adminDashboardRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));

// 🛍 PRODUCTS
app.use("/api/products", require("./routes/productRoutes"));

// 📰 BLOGS
app.use("/api/blogs", require("./routes/blogRoutes"));

// 📷 IMAGE UPLOAD
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/cart", require("./routes/cartRoutes"));

// 👤 USER AUTH
app.use("/api/auth", require("./routes/authRoutes"));

// ================== HEALTH CHECK ==================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
  });
});

// ================== SERVER ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
