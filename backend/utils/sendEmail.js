const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, subject, message, productName }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    replyTo: email,
    subject: subject || "New Website Enquiry",
    html: `
      <h3>New Enquiry Received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};

module.exports = { sendEmail };
