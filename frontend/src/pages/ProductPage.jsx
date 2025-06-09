import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../contexts/CartContext";
import { IoMdSearch } from "react-icons/io";

const BASE_URL = "http://localhost:5000";

function ProductPage() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { products, loading, error } = useProducts();

  // Filter + Sort
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      case "price-low-high":
        return (a.price || 0) - (b.price || 0);
      case "price-high-low":
        return (b.price || 0) - (a.price || 0);
      default:
        return typeof b._id === "string" && typeof a._id === "string"
          ? b._id.localeCompare(a._id)
          : 0;
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setToastMessage(`✅ ${product.name} added to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Browse Our Products
      </h1>

      <div className="flex flex-wrap gap-4 mb-10 justify-center items-center">
        {/* Search */}
        <div className="relative group w-56">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md bg-gray-800 border-2 border-gray-400 text-white placeholder-gray-200
               shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
               hover:border-yellow-500 transition duration-200 text-sm"
          />
          <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200 group-hover:text-yellow-500" />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-56 h-10 px-4 rounded-md bg-gray-800 border-2 border-gray-600 text-white text-sm
             focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
             hover:border-yellow-500 transition duration-200"
        >
          <option value="all">All Categories</option>
          <option value="Consumable Items">Consumable Items</option>
          <option value="Testing Machine">Testing Machine</option>
        </select>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-56 h-10 px-4 rounded-md bg-gray-800 border-2 border-gray-600 text-white text-sm
             focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
             hover:border-yellow-500 transition duration-200"
        >
          <option value="newest">Newest First</option>
          <option value="name-a-z">Name: A to Z</option>
          <option value="name-z-a">Name: Z to A</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Status Messages */}
      {loading && (
        <div className="text-center text-gray-500">Loading products...</div>
      )}
      {error && <div className="text-center text-red-600">Error: {error}</div>}
      {!loading && !error && sortedProducts.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col hover:shadow-lg transition duration-300"
          >
            <div className="bg-white flex items-center justify-center h-48 overflow-hidden p-4">
              <img
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : `${BASE_URL}${product.image}`
                }
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.description || "No description available."}
              </p>

              <div className="text-sm text-gray-500 mb-1">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {product.category}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800 mb-3">
                ₹{product.price || "N/A"}
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto  text-white text-sm py-2 px-4 rounded-md  bg-gray-800 border-2 border-gray-600 
             focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
             hover:border-yellow-500 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-opacity duration-300 ease-in-out">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="flex-grow font-semibold">{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="text-white hover:text-gray-200"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
