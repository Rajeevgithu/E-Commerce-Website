import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/images/Logo.png";
import Banner from "../assets/images/footer-banner.jpg";
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

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Texttiles Testing Instruments",
    link: "/texttiles-testing-instruments",
  },
  {
    title: "Consumables",
    link: "/consumables",
  },
  {
    title: "Paint & Coating",
    link: "/paint-&-coating",
  },
  {
    title: "Test Chambers",
    link: "/test-chambers",
  },
];

const Footer = () => {
  return (
    <footer
      style={BannerImg}
      className="text-white pt-10 pb-20"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div data-aos="fade-right">
            <div className="flex items-center gap-3 mb-3">
              <img src={footerLogo} alt="Logo" className="w-12 h-12" />
              <h1 className="text-2xl font-bold">Text Tech Enterprises</h1>
            </div>
            <p className="text-gray-200">
              Text Tech Enterprises is a highly renowned supplier and importer in
            the textile industry and testing labs
            </p>
          </div>

          {/* Our Services Links */}
          <div data-aos="fade-up">
            <h2 className="text-xl font-bold mb-4">Our Services</h2>
            <ul className="space-y-3">
              {FooterLinks.map((link) => (
                <li key={link.title} className="group">
                  <Link
                    to={link.link}
                    className="text-white group-hover:text-yellow-400 transition-colors duration-300 inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div data-aos="fade-left">
            <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
            <div className="space-y-3 text-gray-200">
              <div className="flex items-start gap-3">
                <FaLocationArrow className="text-xl mt-1" />
                <p>Boisar, Palghar, Mumbai, Maharashtra 401506</p>
              </div>
              <div className="flex items-center gap-3">
                <FaMobileAlt className="text-xl" />
                <p>+91 76669 40824</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                <p>sales@texttechenterprises.com</p>
              </div>
            </div>

            {/* Social Icons with Working Hover */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="group text-[#E4405F]">
                <FaInstagram className="text-2xl transition duration-300 group-hover:text-white" />
              </a>
              <a href="#" aria-label="WhatsApp" className="group text-[#25D366]">
                <FaWhatsapp className="text-2xl transition duration-300 group-hover:text-white" />
              </a>
              <a href="#" aria-label="Twitter" className="group text-[#1DA1F2]">
                <FaTwitter className="text-2xl transition duration-300 group-hover:text-white" />
              </a>
              <a href="#" aria-label="Facebook" className="group text-[#1877F2]">
                <FaFacebook className="text-2xl transition duration-300 group-hover:text-white" />
              </a>
              <a href="#" aria-label="LinkedIn" className="group text-[#0077B5]">
                <FaLinkedin className="text-2xl transition duration-300 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
