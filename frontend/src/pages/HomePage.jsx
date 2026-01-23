import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

import api from "../api/axios";

import banner from "../assets/images/sdc-banner.jpg";
import featuredBg from "../assets/images/featured-bg.jpg";
import queryBg from "../assets/images/query-bg.jpg";
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const clickTimersRef = useRef({});
  const topControls = useAnimation();
  const bottomControls = useAnimation();

  /* ================= SLIDER START FUNCTION ================= */
  const startSlider = (controls, direction) => {
    controls.start({
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: {
        repeat: Infinity,
        duration: 30,
        ease: "linear",
      },
    });
  };

  /* ================= SKELETON ================= */
  const ProductSkeleton = () => (
    <div className="
      min-w-[220px] max-w-[220px]
      sm:min-w-[280px] sm:max-w-[280px]
      min-h-[360px] sm:min-h-[420px]
      rounded-2xl overflow-hidden
      bg-white/10 animate-pulse
    ">
      <div className="h-56 sm:h-72 m-4 rounded-lg bg-white/20" />
      <div className="h-16 sm:h-20 mt-auto bg-slate-900/40 flex items-center justify-center">
        <div className="h-3 sm:h-4 w-3/4 rounded bg-white/20" />
      </div>
    </div>
  );

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

  /* ================= START SLIDERS ================= */
  useEffect(() => {
    if (!products.length) return;
    startSlider(topControls, "left");
    startSlider(bottomControls, "right");
  }, [products]);

  /* ================= SPLIT PRODUCTS ================= */
  const half = Math.ceil(products.length / 2);
  const topSlider = products.slice(0, half);
  const bottomSlider = products.slice(half);

  /* ================= SLIDER RENDER ================= */
  const renderSlider = (items, controls, direction) => (
    <motion.div
      className="
        flex gap-5 sm:gap-8
        cursor-grab active:cursor-grabbing
        select-none
        px-4 sm:px-0
      "
      animate={controls}
      drag="x"
      dragConstraints={{ left: -3000, right: 3000 }}
      onDragStart={() => controls.stop()}
      onDragEnd={() => startSlider(controls, direction)}
    >
      {[...items, ...items].map((product, index) => {
        const img = Array.isArray(product.image)
          ? product.image[0]
          : product.image;

        const imgSrc = img?.startsWith("http")
          ? img
          : `${import.meta.env.VITE_API_URL}/${img?.replace(/^\/+/, "")}`;

        return (
          <div
            key={`${product._id}-${index}`}
            className="
              group
              min-w-[220px] max-w-[220px]
              sm:min-w-[280px] sm:max-w-[280px]
              min-h-[320px] sm:min-h-[400px]
              flex flex-col
              rounded-2xl overflow-hidden
              cursor-pointer
              bg-gradient-to-b from-white/90 via-white/60 to-slate-900
              border border-white/15
              transition-all duration-300
              hover:border-yellow-400
              hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]
              focus-within:ring-2 focus-within:ring-yellow-400
              active:scale-[0.97]
            "
            onClick={() => {
              controls.stop();
              clearTimeout(clickTimersRef.current[product._id]);
              clickTimersRef.current[product._id] = setTimeout(() => {
                window.location.href = `/product/${product._id}`;
              }, 200);
            }}
            onDoubleClick={() => {
              clearTimeout(clickTimersRef.current[product._id]);
              setPreviewImage(imgSrc);
            }}
          >
            <span
              className="
                absolute inset-0
                bg-gradient-to-t from-yellow-500/40 via-yellow-400/20 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                pointer-events-none
              "
            />

           {/* IMAGE */}
<div className="
  h-48 sm:h-72
  flex items-center justify-center
  px-3 sm:px-4
  pt-3 sm:pt-6
  pb-2 sm:pb-4
  relative z-10
">

              <div className="
                w-full h-full bg-white rounded-lg
                flex items-center justify-center
                shadow-inner
              ">
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* NAME */}
            <div className="
              mt-auto
              h-14 sm:h-20
              px-3 sm:px-4
              bg-gradient-to-b from-transparent via-slate-900/85 to-slate-900
              flex items-center justify-center
              text-center
              relative z-10
            ">
              <h3 className="
                text-xs sm:text-sm
                font-semibold text-gray-200
                line-clamp-2
              ">
                {product.name}
              </h3>
            </div>
          </div>
        );
      })}
    </motion.div>
  );

 return (
  <div className="w-full">

    {loading ? (
      <div className="w-full py-16 sm:py-24 overflow-hidden">
        <div className="flex gap-5 sm:gap-8 px-4 sm:px-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    ) : (
      <>
        {/* ================= HERO ================= */}
        <section
          className="
            relative w-full
            h-[65vh] sm:h-[80vh]
            bg-cover bg-center
            flex items-center
          "
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-black/65" />

          <div
            className="
              relative mx-auto text-white
              px-4 sm:px-6 lg:px-10
              max-w-[95vw] 2xl:max-w-[90vw]
            "
          >
            <h1 className="
              text-3xl sm:text-4xl lg:text-5xl
              font-extrabold
              mb-4 sm:mb-6
              leading-tight
            ">
              Industrial Machinery & Engineering Solutions
            </h1>

            <p className="
              text-base sm:text-lg lg:text-xl
              text-gray-200
              mb-6 sm:mb-8
              max-w-3xl
            ">
              Precision-engineered solutions for modern industries.
            </p>

            <div className="
              flex flex-col sm:flex-row
              gap-3 sm:gap-4
              w-full sm:w-auto
            ">
              <Link
                to="/all-products"
                className="
                  px-6 sm:px-8
                  py-3 sm:py-4
                  rounded-lg
                  bg-yellow-500
                  text-black
                  font-semibold
                  text-sm sm:text-base
                  hover:bg-yellow-400
                  transition
                  text-center
                "
              >
                Explore Machinery
              </Link>

              <Link
                to="/contact"
                className="
                  px-6 sm:px-8
                  py-3 sm:py-4
                  rounded-lg
                  border-2 border-white
                  text-white
                  text-sm sm:text-base
                  transition-all duration-300
                  hover:bg-white/10
                  hover:border-white
                  hover:text-white
                  text-center
                "
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

        <SectionDivider />
 

  {/* ================= FEATURED PRODUCTS ================= */}
<section
  className="
    relative
    py-10 sm:py-20
    overflow-hidden
  "
  style={{
    backgroundImage: `linear-gradient(rgba(8,18,35,0.92), rgba(8,18,35,0.92)), url(${featuredBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* FULL-WIDTH CONTAINER */}
  <div className="w-full text-white">

    {/* ================= HEADING ================= */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        className="
          flex items-start justify-between
          sm:flex-row sm:items-end
          gap-3 sm:gap-0
          mb-6 sm:mb-14
        "
      >
        {/* LEFT: TITLE + SUBTITLE */}
        <div className="flex-1">
          <div className="flex items-center justify-between sm:block">
            <h2
              className="
                text-xl sm:text-4xl md:text-5xl
                font-extrabold
                mb-1 sm:mb-4
              "
            >
              Featured Machinery
            </h2>

            {/* MOBILE BUTTON (INLINE) */}
            <Link
              to="/all-products"
              className="
                sm:hidden
                inline-flex items-center
                px-3 py-1.5
                rounded-md
                border border-white
                text-xs font-semibold
                transition
                hover:bg-white/10
              "
            >
              View All →
            </Link>
          </div>

          <p
            className="
              text-gray-300
              text-xs sm:text-lg
              max-w-2xl
            "
          >
            Our most trusted and high-performance industrial products.
          </p>
        </div>

        {/* DESKTOP BUTTON */}
        <Link
          to="/all-products"
          className="
            hidden sm:inline-flex items-center
            px-7 py-3
            rounded-lg
            border border-white
            text-white font-semibold
            transition-all duration-300
            hover:bg-white/10
          "
        >
          View All Products →
        </Link>
      </div>
    </div>

    {/* ================= TOP SLIDER ================= */}
    <div
      className="
        relative overflow-hidden
        mb-4 sm:mb-10
        max-h-[360px] sm:max-h-none
      "
    >
      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-16 md:w-24 lg:w-32 xl:w-36 bg-gradient-to-r from-[rgba(8,18,35,0.95)] via-[rgba(8,18,35,0.65)] to-transparent z-20" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-16 md:w-24 lg:w-32 xl:w-36 bg-gradient-to-l from-[rgba(8,18,35,0.95)] via-[rgba(8,18,35,0.65)] to-transparent z-20" />

      <div className="[&_.slider-item]:scale-[0.92] sm:[&_.slider-item]:scale-100 transition">
        {renderSlider(topSlider, topControls, "left")}
      </div>
    </div>

    {/* ================= BOTTOM SLIDER ================= */}
    <div
      className="
        relative overflow-hidden
        max-h-[360px] sm:max-h-none
      "
    >
      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-16 md:w-24 lg:w-32 xl:w-36 bg-gradient-to-r from-[rgba(8,18,35,0.95)] via-[rgba(8,18,35,0.65)] to-transparent z-20" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-16 md:w-24 lg:w-32 xl:w-36 bg-gradient-to-l from-[rgba(8,18,35,0.95)] via-[rgba(8,18,35,0.65)] to-transparent z-20" />

      <div className="[&_.slider-item]:scale-[0.92] sm:[&_.slider-item]:scale-100 transition">
        {renderSlider(bottomSlider, bottomControls, "right")}
      </div>
    </div>

  </div>
</section>


{/* ================= IMAGE LIGHTBOX ================= */}
{previewImage && (
  <div
    className="
      fixed inset-0 z-50
      bg-black/90
      flex items-center justify-center
      cursor-zoom-out
      px-4
    "
    onClick={() => setPreviewImage(null)}
  >
    <img
      src={previewImage}
      alt="Preview"
      className="max-h-[85vh] sm:max-h-[90vh] max-w-[90vw] object-contain"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}


<SectionDivider />

{/* ================= CUSTOM REQUIREMENT CTA ================= */}
<section
  className="
    relative
    py-10 sm:py-24
  "
  style={{
    backgroundImage: `linear-gradient(rgba(6,16,30,0.85), rgba(6,16,30,0.85)), url(${queryBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div
      className="
        grid
        grid-cols-1 md:grid-cols-2
        gap-6 sm:gap-14
        items-center
        text-white
      "
    >
      {/* LEFT CONTENT */}
      <div>
        <h2
          className="
            text-2xl sm:text-3xl md:text-4xl
            font-extrabold
            mb-3 sm:mb-6
          "
        >
          Reliable Machinery for Industrial Excellence
        </h2>

        <p
          className="
            text-gray-200
            text-sm sm:text-lg
            mb-3 sm:mb-6
            max-w-xl
          "
        >
          We supply high-quality industrial machinery tailored
          to manufacturing, testing, and processing industries.
        </p>

        <ul
          className="
            space-y-1.5 sm:space-y-3
            text-gray-200
            text-sm sm:text-base
          "
        >
          <li>✓ Industry-grade build quality</li>
          <li>✓ Custom solutions & technical support</li>
          <li>✓ Trusted nationwide</li>
        </ul>
      </div>

      {/* RIGHT CARD */}
<div
  className="
    bg-white
    text-gray-900
    rounded-2xl
    shadow-xl
    p-4 sm:p-10
    text-center
    max-w-md
    mx-auto md:mx-0
  "
>
  <h3
    className="
      text-lg sm:text-2xl
      font-semibold
      mb-2 sm:mb-4
    "
  >
    Need a Custom Requirement?
  </h3>

  <p
    className="
      text-gray-600
      text-sm sm:text-base
      mb-3 sm:mb-6
    "
  >
    Share your specifications and our experts will assist you.
  </p>

  <Link
    to="/contact"
    className="
      inline-flex items-center justify-center
      px-6 sm:px-8
      py-2.5 sm:py-4
      rounded-lg
      bg-gray-900
      text-white
      font-semibold
      text-sm sm:text-base
      hover:bg-gray-800
      transition
    "
  >
    Contact Our Team
  </Link>
</div>

    </div>
  </div>
</section>


<SectionDivider />

        </>
      )}
    </div>
  );
}

/* ================= DIVIDER ================= */
function SectionDivider() {
  return (
    <div className="flex justify-center my-3 sm:my-10">
      <div className="w-16 sm:w-24 h-[2px] sm:h-1 bg-yellow-500 rounded-full" />
    </div>
  );
}

