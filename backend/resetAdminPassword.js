require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

// 🔗 connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const resetPassword = async () => {
  const hash = await bcrypt.hash("Admin@123", 10);

  const result = await Admin.updateOne(
    { email: "admin@texttech.com" },
    { password: hash }
  );

  console.log("Admin password reset:", result);
  process.exit(0);
};

resetPassword();
