"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import banner from "../assets/images/sdc-banner.jpg";

import FeaturesSection from "./Features";
import FeaturedProducts from "./FeaturedProducts"; // Corrected import

const products = [
  {
    id: 1,
    name: "Laboratory Hot Air Oven",
    description:
      "Computerized laboratory hot air oven with advanced features.",
    image:
      "http://localhost:5000/uploads/product53.jpg",
  },
  {
    id: 2,
    name: "STD Calibration weight",
    description: "High precision calibration weight for accurate measurements.",
    image:
      "http://localhost:5000/uploads/product61.webp",
  },
  {
    id: 3,
    name: "SDC Grey Scale for Staining",
    description: "Essential tool for evaluating color fastness in textiles.",
    image:
      "http://localhost:5000/uploads/product58.webp",
  },
  {
    id: 4,
    name: "Fabric Thickness Tester",
    description: "Highly durable fabric thickness testing equipment for industrial use.",
    image: "http://localhost:5000/uploads/product62.jpg",
  },
  {
    id: 5,
    name: "Hydraulic GSM Cutter",
    description: "Accurate and easy-to-use GSM cutting machine.",
    image: "http://localhost:5000/uploads/product52.png",
  },
  {
    id: 6,
    name: "Acrylic Plate for Color Fastness Testing",
    description: "High-quality acrylic plate for color fastness testing in textiles.",
    image: "http://localhost:5000/uploads/product40.jpg",
  },
  {
    id: 7,
    name: "SDC TAED- Tetraacetylethylenediamine",
    description: "High-quality TAED for use in detergents and cleaning products.",
    image: "http://localhost:5000/uploads/product47.webp",
  },
];

const heroImages = [
  {
    id: 1,
    url: products[0].image,
    title: products[0].name,
    subtitle: products[0].description,
  },
  {
    id: 2,
    url: products[1].image,
    title: products[1].name,
    subtitle: products[1].description,
  },
  {
    id: 3,
    url: products[2].image,
    title: products[2].name,
    subtitle: products[2].description,
  },
  {
    id: 4,
    url: "https://source.unsplash.com/1600x900/?industrial,machine",
    title: "Explore More Products",
    subtitle: "Check out our full product range for all your testing needs.",
    seeMore: true,
  },
];

const sectionBackgrounds = [
  "https://source.unsplash.com/1600x900/?technology",
  "https://source.unsplash.com/1600x900/?customer",
  "https://source.unsplash.com/1600x900/?sale",
  "https://source.unsplash.com/1600x900/?email",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-4 lg:px-8">
      {/* Hero Section */}
      <section className="relative h-[450px] rounded-lg overflow-hidden mt-4 md:mt-0">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
              <motion.h1
                key={image.id}
                className="text-4xl md:text-6xl font-extrabold mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : -50,
                }}
                transition={{ duration: 1 }}
              >
                {image.title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-2xl mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : 30,
                }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {image.subtitle}
              </motion.p>

              <Link
                to="/all-products"
                className={`px-6 py-2 rounded-full transition-all duration-300 font-semibold border-2 border-transparent 
                  hover:border-yellow-500 hover:ring-1 hover:ring-yellow-500
                   ${
                     image.seeMore
                       ? "border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"
                       : "bg-gray-800 text-white hover:bg-gray-700 shadow-md hover:shadow-lg"
                   }`}
              >
                {image.seeMore ? "See More" : "Shop Now"}
              </Link>
            </div>
          </div>
        ))}
        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${
                currentSlide === i
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Floating Icons */}
      <div className="fixed right-4 bottom-20 flex flex-col items-center space-y-4 z-50">
        <a
          href="https://wa.me/7756038758"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-green-500 text-4xl hover:text-white transition-all" />
        </a>
        <a href="tel:7756038758">
          <FaPhoneAlt className="text-green-500 text-4xl hover:text-white transition-all" />
        </a>
      </div>

      {/* Divider */}
      <Divider />

      {/* Featured Products Section */}
      <FeaturedProducts
        products={products}
        sectionBackgrounds={sectionBackgrounds}
      />

      <Divider />

      {/* Testimonials */}
      <section
        className="w-full h-[500px] bg-cover bg-center flex items-center justify-center m-0 p-0 "
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 mt-[-180px] rounded-lg text-white text-center">
          <h2 className="text-3xl font-bold">
            Welcome to Our Testing Solutions
          </h2>
          <p className="mt-1 text-1xl max-w-xl">
            Delivering premium quality testing machines and exceptional customer
            support.
          </p>
        </div>
      </section>

      <Divider />

      {/* Promotions */}
      <section
        className="py-20 text-white text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sectionBackgrounds[2]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-4xl font-bold mb-8">Limited Time Promotion</h2>
        <p className="max-w-xl mx-auto text-xl">
          For Addvertisement Contact With Us
        </p>
      </section>

      <FeaturesSection />
    </div>
  );
}

function Divider() {
  return (
    <div className="relative w-full my-3">
      <div className="mx-auto w-2/5 border-t-4 border-blue-500"></div>
      <span className="absolute -left-4 translate-x-20 -top-3 text-orange-400 text-xl rotate-0">
        ➤
      </span>
      <span className="absolute -right-4 -translate-x-20 -top-3 text-orange-400 text-xl rotate-180">
        ➤
      </span>
    </div>
  );
}
