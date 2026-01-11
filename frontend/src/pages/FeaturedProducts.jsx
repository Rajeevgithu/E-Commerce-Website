import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const FeaturedProducts = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        No featured machinery available
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Machinery & Equipment
        </h2>
        <p className="text-gray-600 text-lg">
          Explore our range of industrial machinery designed for precision,
          durability, and performance across multiple industries.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
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

                <div className="mt-5 inline-flex items-center text-yellow-600 font-semibold">
                  View Details
                  <span className="ml-2 group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
