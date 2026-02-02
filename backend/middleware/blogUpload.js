const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3");

const blogUpload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
  storage: multerS3({
    s3,
    bucket: "text-tech-products-images",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const safeName = file.originalname.replace(/\s+/g, "-");
      cb(null, `blogs/${Date.now()}-${safeName}`);
    },
  }),
});

module.exports = blogUpload;
