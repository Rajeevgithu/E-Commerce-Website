import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import banner from "../assets/images/sdc-banner.jpg";

export default function HomePage() {
  const [products, setProducts] = useState([]);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading homepage…
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* ================= INDUSTRIAL HERO ================= */}
      <section
        className="relative w-full h-[80vh] min-h-[520px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Industrial Machinery & Engineering Solutions
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Precision-engineered machinery designed for reliability,
              performance, and long-term industrial use.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/all-products"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg 
                bg-yellow-500 text-black font-semibold text-lg 
                hover:bg-yellow-400 transition"
              >
                Explore Machinery
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg 
                border-2 border-white text-white font-semibold text-lg 
                hover:bg-white hover:text-black transition"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Reliable Machinery for Industrial Excellence
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              We supply high-quality industrial machinery and equipment tailored
              to meet the demands of manufacturing, testing, and processing
              industries.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>✔ Industry-grade build quality</li>
              <li>✔ Custom solutions & technical support</li>
              <li>✔ Trusted by professionals nationwide</li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-2xl p-10 text-center shadow">
            <h3 className="text-2xl font-semibold mb-4">
              Need a Custom Requirement?
            </h3>
            <p className="text-gray-600 mb-6">
              Share your specifications and our experts will assist you with
              the right solution.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 rounded-md bg-gray-900 text-white 
              hover:bg-gray-800 transition"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= FEATURED MACHINERY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Machinery
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => {
            const img = Array.isArray(product.image)
              ? product.image[0]
              : product.image;

            const imgSrc = img?.startsWith("http")
              ? img
              : `${import.meta.env.VITE_API_URL}/${img?.replace(/^\/+/, "")}`;

            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group bg-white rounded-xl border border-gray-200 
                hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-56 flex items-center justify-center bg-gray-50">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="max-h-full object-contain group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {product.description}
                  </p>

                  <div className="mt-4 text-yellow-600 font-semibold">
                    View Details →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SectionDivider />
    </div>
  );
}

/* ================= SECTION DIVIDER ================= */
function SectionDivider() {
  return (
    <div className="flex justify-center my-20">
      <div className="w-24 h-1 bg-yellow-500 rounded-full" />
    </div>
  );
}
