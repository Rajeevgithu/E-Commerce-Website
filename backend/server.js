const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* ================== DATABASE ================== */
connectDB();

/* ================== SECURITY ================== */
app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

/* ================== CORS ================== */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://texttechenterprises.com",
    "https://www.texttechenterprises.com",
    "https://api.texttechenterprises.com",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ REQUIRED for preflight

/* ================== BODY PARSERS ================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================== PREVENT OPTIONS BLOCKING ================== */
app.use("/api", (req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

/* ================== RATE LIMIT ================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

/* ================== ROUTES ================== */

// 🔐 ADMIN AUTH
app.use("/api/admin", require("./routes/adminAuthRoutes"));

// 📊 ADMIN DASHBOARD
app.use("/api/admin/dashboard", require("./routes/adminDashboardRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));

// 👤 USER AUTH
app.use("/api/auth", require("./routes/authRoutes"));

// 🛍 PRODUCTS
app.use("/api/products", require("./routes/productRoutes"));

// 📩 CONTACT
app.use("/api/contact", require("./routes/contact"));

// 📰 BLOGS
app.use("/api/blogs", require("./routes/blogRoutes"));

// 🛒 CART
app.use("/api/cart", require("./routes/cartRoutes"));

// 📷 IMAGE UPLOADS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================== HEALTH CHECK ================== */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
  });
});

/* ================== SERVER ================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
