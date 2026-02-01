const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.loginAdmin = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);   // 🔴 ADD THIS

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    console.log("ADMIN FOUND:", !!admin);   // 🔴 ADD THIS

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("PASSWORD MATCH:", isMatch); // 🔴 ADD THIS

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
  { id: admin._id, email: admin.email, role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
);


    res.json({ token, user: { id: admin._id, email: admin.email, role: "admin" } });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
