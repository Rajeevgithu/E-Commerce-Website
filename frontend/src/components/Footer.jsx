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
  FaFileInvoice,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div
        className="
          relative z-10
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-6 sm:py-14
        "
      >
        {/* ================= MAIN GRID ================= */}
        <div
          className="
            grid
            grid-cols-2
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            sm:gap-12
          "
        >
{/* ================= COMPANY INFO ================= */}
<div className="col-span-2 sm:col-span-1">
  <div className="flex items-center gap-4 mb-3 sm:mb-5">
    <img
      src={footerLogo}
      alt="Text Tech Enterprises"
      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
    />

    <h2 className="text-lg sm:text-xl font-semibold text-white leading-tight">
      {contactConfig.companyName}
    </h2>
  </div>

  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
    Text Tech Enterprises is a trusted supplier and importer of
    industrial machinery and testing instruments, delivering reliable
    solutions for manufacturing and quality control industries.
  </p>
</div>


          {/* ================= PRODUCTS ================= */}
          <div>
            <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-5">
              Our Products
            </h3>

            <ul className="space-y-1 sm:space-y-3 text-xs sm:text-sm">
  <li>
    <Link
      to="/all-products/consumable-items"
      className="text-white hover:text-yellow-400 transition-colors duration-200"
    >
      Consumable Items
    </Link>
  </li>

  <li>
    <Link
      to="/all-products/testing-products"
      className="text-white hover:text-yellow-400 transition-colors duration-200"
    >
      Testing Products
    </Link>
  </li>


              {/* Desktop only */}
              {/* <li className="hidden sm:block">
                <Link
                  to="/all-products/paint-and-coating"
                  className="hover:text-yellow-400 transition"
                >
                  Paint & Coating
                </Link>
              </li> */}
            </ul>
          </div>

         {/* ================= CONTACT ================= */}
<div className="col-span-2 lg:col-span-1">
  <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-5">
    Get In Touch
  </h3>

  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-300">
    
    {/* Address */}
    <div className="flex items-start gap-2 sm:gap-3">
      <FaLocationArrow className="text-yellow-500 mt-0.5" />
      <p>
        3603 Durganagar, Bhaiyapada,
        
        Boisar, Dist-Palghar
        <br />
        Maharashtra 401501, India
      </p>
    </div>

    {/* Phone */}
    <div className="flex items-center gap-2 sm:gap-3">
      <FaMobileAlt className="text-yellow-500" />
      <p>+91 8856963655</p>
    </div>

    {/* GSTIN */}
    <div className="flex items-center gap-2 sm:gap-3">
      <FaFileInvoice className="text-yellow-500" />
      <p className="font-medium tracking-wide">
        GSTIN: 27ASDPG9360Q1Z3
      </p>
    </div>

    {/* Email */}
    <div className="flex items-center gap-2 sm:gap-3">
      <FaEnvelope className="text-yellow-500" />
      <p>sales@texttechenterprises.com</p>
    </div>

  </div>


        
     {/* Social Icons */}
<div className="flex gap-4 mt-3 sm:mt-6">

  {/* Instagram */}
  <a
    href="https://www.instagram.com/texttech_enterprises?igsh=MTA3aDR0ZTducWF0OA%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="
      text-pink-500
      hover:text-pink-400
      transition
      transform hover:scale-110
    "
  >
    <FaInstagram className="text-base sm:text-xl" />
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/918856963655"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="
      text-green-500
      hover:text-green-400
      transition
      transform hover:scale-110
    "
  >
    <FaWhatsapp className="text-base sm:text-xl" />
  </a>

  {/* Twitter / X */}
  {/* <a
    href="#"
    aria-label="Twitter"
    className="
      text-sky-400
      hover:text-sky-300
      transition
      transform hover:scale-110
      cursor-default
    "
  >
    <FaTwitter className="text-base sm:text-xl" />
  </a> */}

  {/* Facebook */}
  <a
    href="https://www.facebook.com/people/Text-Tech-Enterprises/61578374915859/?mibextid=ZbWKwL"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="
      text-blue-600
      hover:text-blue-500
      transition
      transform hover:scale-110
    "
  >
    <FaFacebook className="text-base sm:text-xl" />
  </a>

  {/* LinkedIn */}
  {/* <a
    href="#"
    aria-label="LinkedIn"
    className="
      text-blue-400
      hover:text-blue-300
      transition
      transform hover:scale-110
      cursor-default
    "
  >
    <FaLinkedin className="text-base sm:text-xl" />
  </a> */}

</div>


          </div>
        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div
          className="
            border-t border-white/20
            mt-5 sm:mt-12
            pt-3 sm:pt-5
            flex flex-col sm:flex-row
            justify-between items-center
            text-[11px] sm:text-sm
            text-gray-400
          "
        >
          <p>
            © {new Date().getFullYear()} {contactConfig.companyName}. All rights
            reserved.
          </p>
          <p className="mt-1 sm:mt-0">
            Designed for industrial excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
