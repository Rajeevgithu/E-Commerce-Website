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

  const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
      
      <h2 style="color:#1e293b; border-bottom:1px solid #e5e7eb; padding-bottom:10px;">
        📩 New Product Enquiry
      </h2>

      <table style="width:100%; margin-top:15px; border-collapse:collapse;">
        <tr>
          <td style="padding:8px; font-weight:bold;">Name</td>
          <td style="padding:8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Email</td>
          <td style="padding:8px;">${email}</td>
        </tr>
        ${
          productName
            ? `<tr>
                <td style="padding:8px; font-weight:bold;">Product</td>
                <td style="padding:8px;">${productName}</td>
              </tr>`
            : ""
        }
      </table>

      <div style="margin-top:20px;">
        <p style="font-weight:bold; margin-bottom:5px;">Message</p>
        <div style="background:#f8fafc; padding:12px; border-radius:6px; line-height:1.5;">
          ${message.replace(/\n/g, "<br />")}
        </div>
      </div>

      <p style="margin-top:30px; font-size:12px; color:#64748b;">
        This enquiry was sent from your website contact form.
      </p>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Text Tech Enterprises" <${process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    replyTo: email,
    subject: subject || `Product Enquiry${productName ? ` – ${productName}` : ""}`,
    html: htmlTemplate,
  });
};

module.exports = { sendEmail };
