// Updated ProductPage.jsx with responsive and user-friendly card layout
import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../contexts/CartContext";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { useParams, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BASE_URL = import.meta.env.VITE_API_URL;


function ProductPage() {
  const { addToCart } = useCart();
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("query") || "";

  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOption, setSortOption] = useState("newest");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [modalProduct, setModalProduct] = useState(null);

  const { products, loading, error } = useProducts();

  useEffect(() => {
    const categorySlugMap = {
      "consumable-items": "Consumable Items",
      "testing-products": "Testing Products",
      "paint-and-coating": "Paint & Coating",
    };

    if (category) {
      const readableCategory = categorySlugMap[category.toLowerCase()] || "all";
      setSelectedCategory(readableCategory);
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("query") || "";
    setSearchTerm(q);
  }, [location.search]);

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
    <div className="max-w-7xl mx-auto px-3 py-2 relative">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-3 text-gray-800">
        Browse Our Products
      </h1>

      {/* Search, Category, Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mb-4">
        <div className="relative group w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-8 pl-10 pr-4 rounded-md bg-gray-800 border border-gray-400 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-yellow-400" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full h-8 px-4 rounded-md bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="all">All Categories</option>
          <option value="Consumable Items">Consumable Items</option>
          <option value="Testing Products">Testing Products</option>
          <option value="Paint & Coating">Paint & Coating</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full h-8 px-4 rounded-md bg-gray-800 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="newest">Newest First</option>
          <option value="name-a-z">Name: A to Z</option>
          <option value="name-z-a">Name: Z to A</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <div
            key={product._id || product.id}
            onClick={() => setModalProduct(product)}
            className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col"
          >
            <div className="bg-white h-44 sm:h-52 md:h-56 overflow-hidden flex items-center justify-center">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="h-full w-full"
              >
                {(Array.isArray(product.image)
                  ? product.image
                  : [product.image]
                ).map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={(() => {
                        if (!img) return '';
                        if (img.startsWith('http')) return img;
                        const path = img.startsWith('/uploads') || img.includes('/uploads/')
                          ? img.replace(/^\/+/, '')
                          : `uploads/${img.replace(/^\/+/, '')}`;
                        return `${BASE_URL}/${path}`;
                      })()}
                      alt={`${product.name} ${index + 1}`}
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="p-2 flex flex-col flex-grow">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="text-xs text-gray-500 mb-1">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {product.category}
                </span>
              </div>
              <div className="text-1xl font-bold text-gray-800 mb-3">
                ₹{product.price || "N/A"}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="mt-auto text-white text-sm py-2 px-2 rounded-md bg-gray-800 border border-gray-700 hover:bg-gray-900 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProduct && (
        <>
          {/* Prevent background scroll */}
          <style>{`body { overflow: hidden; }`}</style>

          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 px-2 sm:px-8 py-6 overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-white bg-opacity-95 backdrop-blur-lg border border-gray-300 rounded-2xl shadow-2xl overflow-hidden my-10">
              {/* Flex column layout */}
              <div className="flex flex-col">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setModalProduct(null);
                    document.body.style.overflow = "auto"; // Restore scroll
                  }}
                  className="absolute top-3 right-4 text-gray-700 hover:text-red-500 text-3xl font-bold z-10"
                  aria-label="Close preview"
                >
                  &times;
                </button>

                {/* Modal Header */}
                <div className="px-4 pt-4 pb-3 border-b border-gray-300 bg-white shrink-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center truncate">
                    {modalProduct.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 text-center mt-1">
                    {modalProduct.category}
                  </p>
                </div>

                {/* Image Slider */}
                <div className="px-2 sm:px-4 py-2 shrink-0">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className="w-full h-[50vw] sm:h-[60vh] rounded-xl"
                  >
                    {(Array.isArray(modalProduct.image)
                      ? modalProduct.image
                      : [modalProduct.image]
                    ).map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="flex justify-center items-center h-full bg-white">
                          <img
                            src={(() => {
                              if (!img) return '';
                              if (img.startsWith('http')) return img;
                              const path = img.startsWith('/uploads') || img.includes('/uploads/')
                                ? img.replace(/^\/+/, '')
                                : `uploads/${img.replace(/^\/+/, '')}`;
                              return `${BASE_URL}/${path}`;
                            })()}
                            alt={`Preview ${index + 1}`}
                            className="object-contain h-full w-full max-w-full max-h-full rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Product Details + Add to Cart */}
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-2 whitespace-pre-line">
                    {modalProduct.description}
                  </p>
                  <div className="text-lg font-semibold text-gray-900 mb-4">
                    ₹{modalProduct.price || "N/A"}
                  </div>
                  <button
                    onClick={() => {
                      addToCart(modalProduct, 1);
                      setModalProduct(null);
                      setToastMessage(`✅ ${modalProduct.name} added to cart`);
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                      document.body.style.overflow = "auto"; // Restore scroll
                    }}
                    className="w-full text-white text-sm py-2 px-2 rounded-md bg-gray-800 border border-gray-700 hover:bg-gray-900 transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 sm:right-6 bg-white/80 backdrop-blur-md text-gray-800 border border-gray-300 px-3 py-2 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-left w-[90%] sm:w-auto max-w-sm">
          <FaCartShopping className="text-4xl text-yellow-500" />

          <span className="text-sm sm:text-base font-medium truncate">
            {toastMessage}
          </span>

          <button
            onClick={() => setShowToast(false)}
            className="ml-auto text-gray-600 hover:text-red-500 text-lg font-bold"
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
