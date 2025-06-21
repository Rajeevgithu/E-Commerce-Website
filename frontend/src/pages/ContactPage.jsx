import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";


function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Thank you for reaching out!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 px-4 py-8 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10"
      >
        Contact Us
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-md"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "subject"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-semibold text-white text-sm bg-gray-800 border border-gray-700 hover:border-yellow-500 transition duration-200"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-md text-gray-800"
        >
          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <h2 className="text-xl font-bold mb-1">Our Location</h2>
              <p>Datta Wadi, Boisar, Maharashtra 401501</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-1">Contact Information</h2>
              <p>Email: sales@texttechenterprises.com</p>
              <p>Phone: +91 76669 40824</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-1">Business Hours</h2>
              <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Google Map */}
      <div className="mt-10 rounded-xl overflow-hidden max-w-6xl mx-auto shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1876.9230917386158!2d72.74786187165601!3d19.80411799841798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71e53c945c451%3A0xa306330161b98314!2sDatta%20Wadi%2C%20Boisar%2C%20Maharashtra%20401501!5e0!3m2!1sen!2sin!4v1739096004526!5m2!1sen!2sin"
          width="100%"
          height="400"
          className="w-full border-0"
          loading="lazy"
        ></iframe>
      </div>

      {/* Decorative Divider */}
      <div className="h-1 w-2/3 mx-auto my-10 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 animate-pulse rounded-full" />

      {/* Get In Touch */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Get In Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm sm:text-base">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaLocationArrow className="text-gray-900 text-xl mt-1" />
              <p>Boisar, Palghar, Mumbai, Maharashtra 401506</p>
            </div>
            <div className="flex items-center gap-3">
              <FaMobileAlt className="text-gray-900 text-xl" />
              <p>+91 76669 40824</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-900 text-xl" />
              <p>sales@texttechenterprises.com</p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-medium">Follow us on:</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" aria-label="Instagram" className="text-[#E4405F] hover:text-gray-900">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-[#25D366] hover:text-gray-900">
                <FaWhatsapp className="text-2xl" />
              </a>
              <a href="#" aria-label="Twitter" className="text-[#1DA1F2] hover:text-gray-900">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" aria-label="Facebook" className="text-[#1877F2] hover:text-gray-900">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-[#0077B5] hover:text-gray-900">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;

