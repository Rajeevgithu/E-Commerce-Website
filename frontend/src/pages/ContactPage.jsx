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
    alert("Thank you for contacting us. We will get back to you shortly.");
  };

  return (
    <div className="w-full bg-white">

      {/* ================= PAGE HEADER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4"
        >
          Contact Us
        </motion.h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Reach out to us for machinery enquiries, technical support, or general
          information. Our team is ready to assist you.
        </p>
      </section>

      <SectionDivider />

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* ================= CONTACT FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "email", "subject"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 rounded-lg 
                bg-gray-900 text-white font-semibold 
                hover:bg-gray-800 transition"
              >
                Submit Enquiry
              </button>
            </form>
          </motion.div>

          {/* ================= CONTACT DETAILS ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <FaLocationArrow className="text-yellow-500 text-xl mt-1" />
                <p>
                  Datta Wadi, Boisar, <br />
                  Maharashtra 401501, India
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaMobileAlt className="text-yellow-500 text-xl" />
                <p>+91 76669 40824</p>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-yellow-500 text-xl" />
                <p>sales@texttechenterprises.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Business Hours
                </h3>
                <p>Mon – Fri: 9:00 AM – 5:00 PM</p>
                <p>Saturday: 10:00 AM – 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  <FaInstagram className="text-2xl hover:text-yellow-500 cursor-pointer" />
                  <FaWhatsapp className="text-2xl hover:text-yellow-500 cursor-pointer" />
                  <FaTwitter className="text-2xl hover:text-yellow-500 cursor-pointer" />
                  <FaFacebook className="text-2xl hover:text-yellow-500 cursor-pointer" />
                  <FaLinkedin className="text-2xl hover:text-yellow-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= MAP ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1876.9230917386158!2d72.74786187165601!3d19.80411799841798"
            width="100%"
            height="400"
            loading="lazy"
            className="border-0 w-full"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

/* ================= DIVIDER ================= */
function SectionDivider() {
  return (
    <div className="flex justify-center">
      <div className="w-24 h-1 bg-yellow-500 rounded-full my-6" />
    </div>
  );
}

export default ContactPage;
