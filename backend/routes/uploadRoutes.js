const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const adminAuth = require("../middleware/adminAuth");

// AWS SDK v3 CLIENT
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Multer S3 (ACL REMOVED)
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "text-tech-products-images",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `products/${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Upload route (admin only)
router.post("/", adminAuth, upload.single("image"), (req, res) => {
  res.json({
    imageUrl: req.file.location,
  });
});

module.exports = router;
