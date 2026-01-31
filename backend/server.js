const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// ================== DATABASE ==================
connectDB();

// ================== SECURITY ==================
app.set("trust proxy", 1);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use("/api", limiter);

// ================== CORS ==================
const allowedOrigins = [
  "http://localhost:5173",
  "https://texttechenterprises.com",
  "https://www.texttechenterprises.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ================== MIDDLEWARE ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================== ROUTES ==================

// 🔐 ADMIN AUTH
app.use("/api/admin", require("./routes/adminAuthRoutes"));

// 📩 CONTACT / ENQUIRY
app.use("/api/contact", require("./routes/contact"));


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
