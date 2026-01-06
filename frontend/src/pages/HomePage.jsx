import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

import api from "../api/axios";
import FeaturesSection from "./Features";
import FeaturedProducts from "./FeaturedProducts";
import banner from "../assets/images/sdc-banner.jpg";

const sectionBackgrounds = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /* ================= HERO SLIDES ================= */
  const heroImages = products.slice(0, 3).map((p, i) => ({
    id: i,
    title: p.name,
    subtitle: p.description,
    image: Array.isArray(p.image) ? p.image[0] : p.image,
  }));

  useEffect(() => {
    if (!heroImages.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading homepage…
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ================= HERO ================= */}
      <section className="relative h-[480px] rounded-2xl overflow-hidden mt-4">
        {heroImages.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70 flex items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white px-6 max-w-3xl backdrop-blur-md bg-white/10 rounded-xl p-8"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-200">
                  {slide.subtitle}
                </p>
                <Link
                  to="/all-products"
                  className="inline-block px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
                >
                  Explore Products
                </Link>
              </motion.div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + heroImages.length) % heroImages.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % heroImages.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white"
        >
          <ChevronRight />
        </button>
      </section>

      <Divider />

      {/* ================= FEATURED PRODUCTS ================= */}
      <FeaturedProducts
        products={products.slice(0, 8)}
        sectionBackgrounds={sectionBackgrounds}
      />

      <Divider />

      {/* ================= BRAND BANNER ================= */}
      <section
        className="w-full h-[420px] bg-cover bg-center flex items-center justify-center rounded-xl"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="bg-black/60 backdrop-blur-md px-8 py-6 rounded-xl text-white text-center">
          <h2 className="text-3xl font-bold mb-2">
            Precision Testing Solutions
          </h2>
          <p className="text-lg text-gray-200 max-w-xl">
            Trusted laboratory & textile testing instruments with unmatched
            reliability.
          </p>
        </div>
      </section>

      <Divider />

      <FeaturesSection />

      {/* ================= FLOATING ACTIONS ================= */}
      <div className="fixed right-4 bottom-20 flex flex-col gap-4 z-50">
        <a href="https://wa.me/77560387" target="_blank" rel="noreferrer">
          <FaWhatsapp className="text-green-500 text-4xl hover:scale-110 transition" />
        </a>
        <a href="tel:7756038758">
          <FaPhoneAlt className="text-green-500 text-4xl hover:scale-110 transition" />
        </a>
      </div>
    </div>
  );
}

/* ================= DIVIDER ================= */
function Divider() {
  return (
    <div className="relative my-14">
      <div className="mx-auto w-1/3 border-t-4 border-yellow-500"></div>
    </div>
  );
}
