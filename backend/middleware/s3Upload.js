const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

// ✅ AWS SDK v2 CONFIG (REQUIRED for multer-s3)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3(); // ✅ v2 S3 INSTANCE

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
storage: multerS3({
  s3,
  bucket: "text-tech-products-images",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(null, `products/${Date.now()}-${file.originalname}`);
  },
})
,
});

module.exports = upload;
