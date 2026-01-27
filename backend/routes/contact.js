const express = require("express");
const { sendEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message, productName } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await sendEmail({ name, email, subject, message, productName });

    res.status(200).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send enquiry" });
  }
});

module.exports = router;
