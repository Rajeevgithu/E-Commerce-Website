import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/images/Logo.png";
import Banner from "../assets/images/footer-banner.jpg";
import { contactConfig } from "../config/contact";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* ================= COMPANY INFO ================= */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={footerLogo}
                alt="Text Tech Enterprises"
                className="w-10 h-10"
              />
              <h2 className="text-xl font-semibold">
                {contactConfig.companyName}
              </h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Text Tech Enterprises is a trusted supplier and importer of
              industrial machinery and testing instruments, delivering reliable
              solutions for manufacturing and quality control industries.
            </p>
          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Our Products
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  to="/all-products/consumable-items"
                  className="hover:text-yellow-400 transition"
                >
                  Consumable Items
                </Link>
              </li>
              <li>
                <Link
                  to="/all-products/testing-products"
                  className="hover:text-yellow-400 transition"
                >
                  Testing Products
                </Link>
              </li>
              <li>
                <Link
                  to="/all-products/paint-and-coating"
                  className="hover:text-yellow-400 transition"
                >
                  Paint & Coating
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Get In Touch
            </h3>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <FaLocationArrow className="text-yellow-500 mt-1" />
                <p>{contactConfig.address}</p>
              </div>

              <div className="flex items-center gap-3">
                <FaMobileAlt className="text-yellow-500" />
                <p>{contactConfig.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-500" />
                <p>{contactConfig.email}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-xl hover:text-yellow-400 transition" />
              </a>
              <a href="#" aria-label="WhatsApp">
                <FaWhatsapp className="text-xl hover:text-yellow-400 transition" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-xl hover:text-yellow-400 transition" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebook className="text-xl hover:text-yellow-400 transition" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-xl hover:text-yellow-400 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="border-t border-white/20 mt-14 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {contactConfig.companyName}. All rights reserved.
          </p>
          <p className="mt-3 sm:mt-0">
            Designed for industrial excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
