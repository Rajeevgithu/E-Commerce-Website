import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { IoMdSearch } from "react-icons/io";
import { useParams, useLocation, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

function ProductPage() {
  const { category } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("query") || "";

  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const { products, loading, error } = useProducts();

  /* ================= CATEGORY FROM ROUTE ================= */
  useEffect(() => {
    const categorySlugMap = {
      "consumable-items": "Consumable Items",
      "testing-products": "Testing Products",
      "paint-and-coating": "Paint & Coating",
    };

    if (category) {
      setSelectedCategory(
        categorySlugMap[category.toLowerCase()] || "all"
      );
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  /* ================= FILTER LOGIC ================= */
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">

      {/* ================= PAGE HEADER ================= */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Our Machinery & Equipment
        </h1>
        <p className="text-gray-600 text-lg">
          Browse our industrial machinery solutions designed for performance,
          precision, and reliability.
        </p>
      </div>

      {/* ================= SEARCH & FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search machinery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg 
            focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 py-3 px-4 border rounded-lg 
          focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="Consumable Items">Consumable Items</option>
          <option value="Testing Products">Testing Products</option>
          <option value="Paint & Coating">Paint & Coating</option>
        </select>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No machinery found matching your search.
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group bg-white border border-gray-200 rounded-2xl 
                overflow-hidden hover:shadow-xl transition duration-300"
              >
                {/* Image */}
                <div className="h-56 bg-gray-50 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="max-h-full object-contain 
                    group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
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
      )}
    </div>
  );
}

export default ProductPage;
