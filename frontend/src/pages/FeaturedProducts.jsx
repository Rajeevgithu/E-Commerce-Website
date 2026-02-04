import { Link } from "react-router-dom";
import featuredBg from "../assets/featured-bg.jpg";
import placeholder from "../assets/images/placeholder.png";
// adjust path if needed

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
    <section
      className="relative py-24"
      style={{
        backgroundImage: `linear-gradient(rgba(5,15,30,0.9), rgba(5,15,30,0.9)), url(${featuredBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Featured Machinery
          </h2>
          <p className="text-gray-300 text-lg">
            High-performance industrial machines engineered for precision,
            durability, and long-term reliability.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const imgSrc =
  Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]   // ✅ S3 URL
    : placeholder;        // ✅ bundled fallback



            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group block"
              >
                <div
                  className="h-full rounded-2xl bg-slate-900
                  border border-white/10 shadow-lg
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div
                    className="h-60 bg-white rounded-t-2xl
                    flex items-center justify-center p-6 overflow-hidden"
                  >
                   <img
  src={imgSrc}
  alt={product.name}
  onError={(e) => {
    e.currentTarget.onerror = null; // prevent infinite loop
    e.currentTarget.src = placeholder;
  }}
  className="
    max-h-full max-w-full object-contain
    transition-transform duration-300
    group-hover:scale-105
  "
/>

                  </div>

                  {/* Name */}
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
