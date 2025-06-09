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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-gray-800 mb-12"
      >
        Contact Us
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "subject"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-lg font-semibold text-gray-800 mb-2"
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
                  className="w-full border border-gray-400 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-lg font-semibold text-gray-800 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-gray-400 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold shadow-md mt-auto  text-white text-sm  bg-gray-800 border-2 border-gray-600 
             focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
             hover:border-yellow-500 transition duration-200"
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
          className="bg-white p-8 rounded-xl shadow-md text-gray-800"
        >
          <h2 className="text-2xl font-bold mb-4">Our Location</h2>
          <p className="mb-2">Datta Wadi, Boisar, Maharashtra 401501</p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Contact Information</h2>
          <p className="mb-2">Email: sales@texttechenterprises.com</p>
          <p className="mb-6">Phone: +91 76669 40824</p>

          <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
          <p className="mb-1">Mon - Fri: 9:00 AM - 5:00 PM</p>
          <p className="mb-1">Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </motion.div>
      </div>

      {/* Google Map */}
      <div
        className="mx-auto max-w-6xl mt-12 rounded-xl overflow-hidden"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1876.9230917386158!2d72.74786187165601!3d19.80411799841798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71e53c945c451%3A0xa306330161b98314!2sDatta%20Wadi%2C%20Boisar%2C%20Maharashtra%20401501!5e0!3m2!1sen!2sin!4v1739096004526!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="w-full border-0 shadow-lg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Decorative Divider */}
      <div className="h-1 w-2/3 mx-auto my-12 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 animate-pulse rounded-full" />

      {/* Get In Touch Section */}
      <section data-aos="fade-left" className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Get In Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FaLocationArrow className="text-gray-900 text-2xl mt-1" />
              <p className="text-lg">Boisar, Palghar, Mumbai, Maharashtra 401506</p>
            </div>
            <div className="flex items-center gap-4">
              <FaMobileAlt className="text-gray-900 text-2xl" />
              <p className="text-lg">+91 76669 40824</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-gray-900 text-2xl" />
              <p className="text-lg">sales@texttechenterprises.com</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start md:items-end space-y-4">
            <p className="text-lg font-medium">Follow us on:</p>
            <div className="flex items-center gap-5">
              <a href="#" aria-label="Instagram" className="text-[#E4405F] hover:text-gray-900 transition-transform duration-300">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-[#25D366] hover:text-gray-900 transition-transform duration-300">
                <FaWhatsapp className="text-3xl" />
              </a>
              <a href="#" aria-label="Twitter" className="text-[#1DA1F2] hover:text-gray-900 transition-transform duration-300">
                <FaTwitter className="text-3xl" />
              </a>
              <a href="#" aria-label="Facebook" className="text-[#1877F2] hover:text-gray-900 transition-transform duration-300">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-[#0077B5] hover:text-gray-900 transition-transform duration-300">
                <FaLinkedin className="text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
