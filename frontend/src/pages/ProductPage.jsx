import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { IoMdSearch } from "react-icons/io";
import { useParams, useLocation, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

/* ================= CATEGORY MAP ================= */
const CATEGORY_SLUG_MAP = {
  "consumable-items": "Consumable Items",
  "testing-products": "Testing Products",
  "paint-and-coating": "Paint & Coating",
};

function ProductPage() {
  const { category } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { products, loading, error } = useProducts();

  /* ================= HANDLE ROUTE CATEGORY ================= */
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (category && CATEGORY_SLUG_MAP[category]) {
      setSelectedCategory(CATEGORY_SLUG_MAP[category]);
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  /* ================= FILTERED PRODUCTS ================= */
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  /* ================= GROUP BY CATEGORY (HOME PAGE) ================= */
  const productsByCategory = {
    "Consumable Items": products.filter(
      (p) => p.category === "Consumable Items"
    ),
    "Testing Products": products.filter(
      (p) => p.category === "Testing Products"
    ),
    "Paint & Coating": products.filter(
      (p) => p.category === "Paint & Coating"
    ),
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 text-white">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Our Machinery & Equipment
          </h1>
          <p className="text-gray-300 text-sm md:text-lg max-w-3xl mx-auto">
            Industrial machinery solutions designed for performance,
            precision, and long-term reliability.
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="max-w-xl mx-auto mb-14">
          <div className="relative">
            <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search machinery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full h-12 pl-11 pr-4 rounded-xl
                bg-slate-900 text-gray-200
                border border-white/15 outline-none
                focus:border-yellow-400 transition
              "
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* ================= CATEGORY PAGE VIEW ==================== */}
        {/* ========================================================= */}
        {selectedCategory !== "all" && (
  <>
    {/* ================= CATEGORY HEADER ================= */}
    <div className="mb-10">

      {/* ================= MOBILE QUICK NAV (ONLY MOBILE) ================= */}
      <div className="flex md:hidden gap-3 mb-4">
        <Link
          to="/"
          className="
            flex-1 text-center text-sm font-medium
            py-2 rounded-lg
            bg-slate-800 text-white
            border border-white/10
            hover:bg-slate-700 transition
          "
        >
          Home
        </Link>

        <Link
          to="/all-products"
          className="
            flex-1 text-center text-sm font-medium
            py-2 rounded-lg
            bg-slate-800 text-white
            border border-white/10
            hover:bg-slate-700 transition
          "
        >
          Products
        </Link>
      </div>

      {/* ================= MOBILE BREADCRUMB (ONLY MOBILE) ================= */}
<p className="block md:hidden text-sm text-gray-400 mb-2">
  Home / Products / {selectedCategory}
</p>


      <h2 className="text-2xl md:text-3xl font-bold text-white">
        {selectedCategory}
      </h2>

      <p className="text-gray-300 mt-2 max-w-3xl">
        Explore our complete range of{" "}
        {selectedCategory.toLowerCase()} engineered for industrial
        performance and reliability.
      </p>
    </div>

    {/* ================= PRODUCT GRID ================= */}
<div className="w-full">
  <div className="
    max-w-[1600px]
    mx-auto
    px-2 sm:px-4 md:px-8
    grid
    grid-cols-2
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-4 sm:gap-6 lg:gap-10
  ">


      {filteredProducts.map((product) => {
        const img = Array.isArray(product.image)
          ? product.image[0]
          : product.image;

        const imgSrc = img?.startsWith("http")
          ? img
          : `${BASE_URL}/${img?.replace(/^\/+/, "")}`;

        return (
         <Link
  key={product._id}
  to={`/product/${product._id}`}
  className="
    w-full
    flex flex-col
    group
    bg-gradient-to-b from-white/95 via-white/80 to-slate-900
    rounded-xl border border-white/15 overflow-hidden
    hover:shadow-xl hover:-translate-y-1 transition
  "
>

            <div className="h-40 bg-white flex items-center justify-center p-4">
              <img
                src={imgSrc}
                alt={product.name}
                className="max-h-full object-contain group-hover:scale-105 transition"
              />
            </div>

            <div className="bg-slate-900 px-4 py-3 flex-1 flex items-end">
  <p className="text-sm text-gray-200 line-clamp-2">
    {product.name}
  </p>
</div>

          </Link>
        );
      })}
    </div>
    </div>
  </>
)}


        {/* ========================================================= */}
        {/* ================= ALL PRODUCTS VIEW ===================== */}
        {/* ========================================================= */}
        {selectedCategory === "all" && (
          <div className="space-y-16">
            {Object.entries(productsByCategory).map(
              ([categoryName, items]) => {
                if (!items.length) return null;

                return (
                  <div key={categoryName}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg md:text-xl font-semibold">
                        {categoryName}
                      </h2>

                      <Link
                        to={`/all-products/${categoryName
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-sm font-medium text-white hover:text-yellow-400 transition"
                      >
                        View All →
                      </Link>
                    </div>

                    {/* Horizontal Row */}
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                      {items.slice(0, 10).map((product) => {
                        const img = Array.isArray(product.image)
                          ? product.image[0]
                          : product.image;

                        const imgSrc = img?.startsWith("http")
                          ? img
                          : `${BASE_URL}/${img?.replace(/^\/+/, "")}`;

                        return (
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                          className="
                            min-w-[180px]
                            sm:min-w-[200px]
                            md:min-w-[240px]
                            lg:min-w-[280px]
                            xl:min-w-[320px]
                            bg-gradient-to-b from-white/95 via-white/80 to-slate-900
                            rounded-xl border border-white/15 overflow-hidden
                          "

                          >
                           <div className="h-36 sm:h-40 md:h-44 lg:h-52 bg-white flex items-center justify-center p-4">

                              <img
                                src={imgSrc}
                                alt={product.name}
                                className="max-h-full object-contain"
                              />
                            </div>

                           <div className="bg-slate-900 px-4 py-3 flex-1 flex items-end">
    <p className="text-sm text-gray-200 line-clamp-2">
      {product.name}
    </p>
  </div>
</Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
