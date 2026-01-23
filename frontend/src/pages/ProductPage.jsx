import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { IoMdSearch } from "react-icons/io";
import { useParams, useLocation, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

/* ================= PRODUCT MENU (REUSED FROM NAVBAR) ================= */
const ProductsMenu = [
  { id: 0, name: "All", link: "/all-products" },
  { id: 1, name: "Consumable Items", link: "/all-products/consumable-items" },
  { id: 2, name: "Testing Products", link: "/all-products/testing-products" },
  { id: 3, name: "Paint & Coating", link: "/all-products/paint-and-coating" },
];

/* ================= SKELETON ================= */
const ProductSkeletonCard = () => (
  <div className="min-h-[360px] md:min-h-[420px] flex flex-col rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 via-white/5 to-slate-900/60 border border-white/10 animate-pulse">
    <div className="h-64 md:h-72 px-4 pt-6 pb-4">
      <div className="w-full h-full bg-white/20 rounded-lg" />
    </div>
    <div className="mt-auto h-16 md:h-20 px-4 bg-slate-900 flex items-center justify-center">
      <div className="h-4 w-3/4 bg-white/20 rounded" />
    </div>
  </div>
);

function ProductPage() {
  const { category } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { products, loading, error } = useProducts();

  /* ================= CATEGORY FROM ROUTE ================= */

  useEffect(() => {
  setSearchTerm(initialSearch);
}, [initialSearch]);

  useEffect(() => {
    const categorySlugMap = {
      "consumable-items": "Consumable Items",
      "testing-products": "Testing Products",
      "paint-and-coating": "Paint & Coating",
    };

    if (category) {
      setSelectedCategory(categorySlugMap[category] || "all");
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  /* ================= FILTER ================= */
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const productsByCategory = {
  "Consumable Items": products.filter(p => p.category === "Consumable Items"),
  "Testing Products": products.filter(p => p.category === "Testing Products"),
  "Paint & Coating": products.filter(p => p.category === "Paint & Coating"),
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
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Our Machinery & Equipment
          </h1>
          <p className="text-gray-300 text-sm md:text-lg max-w-3xl mx-auto">
            Industrial machinery solutions designed for performance,
            precision, and long-term reliability.
          </p>
        </div>

        {/* ================= MOBILE CATEGORY FILTER ================= */}
        {/* <div className="md:hidden mb-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {ProductsMenu.map((item) => {
              const isActive =
                (item.link === "/all-products" &&
                  selectedCategory === "all") ||
                location.pathname === item.link;

              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition
                    ${
                      isActive
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "bg-slate-900 text-gray-300 border-white/15"
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div> */}

        {/* ================= SEARCH BAR ================= */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative group">
            <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search machinery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full h-12 pl-11 pr-4 rounded-xl
                bg-slate-900 text-gray-200
                border border-white/15
                outline-none
                transition-all duration-300
                focus:border-yellow-400
                focus:ring-0
                focus:shadow-[inset_-4px_0_0_0_rgba(250,204,21,0.9)]
              "
            />
          </div>
        </div>

{/* ================= MOBILE CATEGORY SECTIONS ================= */}
<div className="space-y-14">

  {Object.entries(productsByCategory).map(([categoryName, items]) => {
    if (items.length === 0) return null;

    return (
      <div key={categoryName}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            {categoryName}
          </h2>

          <Link
            to={`/all-products/${categoryName.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-sm text-white font-medium"
          >
            View All →
          </Link>
        </div>

        {/* Products */}
        <div
          className="
            flex gap-4 overflow-x-auto no-scrollbar pb-2
            md:grid md:grid-cols-5 md:gap-6 md:overflow-visible
          "
        >
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
                  min-w-[180px] md:min-w-0
                  bg-gradient-to-b from-white/90 via-white/60 to-slate-900
                  rounded-xl
                  border border-white/15
                  overflow-hidden
                "
              >
                <div className="h-36 md:h-48 bg-white flex items-center justify-center p-3">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-3 bg-slate-900">
                  <p className="text-xs md:text-sm text-gray-200 line-clamp-2">
                    {product.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  })}

</div>

      </div>
    </div>
  );
}

export default ProductPage;
