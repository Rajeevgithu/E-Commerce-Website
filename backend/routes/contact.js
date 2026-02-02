const express = require("express");
const validator = require("email-validator");
const { sendEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message, productName } = req.body;

    // Required field validation
    if (!name || !email || !message || !productName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Email format validation
    if (!validator.validate(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Optional: restrict to trusted domains
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    const domain = email.split("@")[1];

    if (!allowedDomains.includes(domain)) {
      return res.status(400).json({
        message: "Please use a valid Gmail, Yahoo, or Outlook email",
      });
    }

    // Auto professional subject
    const finalSubject =
      subject || `Product Enquiry – ${productName}`;

    await sendEmail({
      name,
      email,
      subject: finalSubject,
      message,
      productName,
    });

    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully",
    });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send enquiry" });
  }
});

module.exports = router;
