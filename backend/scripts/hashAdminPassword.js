require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function hashPassword() {
  const admin = await Admin.findOne({ email: "admin@texttech.com" });

  if (!admin) {
    console.log("Admin not found");
    process.exit(1);
  }

  // ⚠️ USE THE EXACT CURRENT PASSWORD FROM ATLAS
  const hashedPassword = await bcrypt.hash("adminabhi", 10);

  admin.password = hashedPassword;
  await admin.save();

  console.log("✅ Admin password hashed successfully");
  process.exit();
}

hashPassword();
