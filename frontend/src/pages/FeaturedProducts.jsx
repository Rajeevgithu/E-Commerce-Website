import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";

const FeaturedProducts = ({ products = [], sectionBackgrounds = [] }) => {
  if (!products.length || !sectionBackgrounds.length) return null;

  return (
    <section
      id="featured"
      className="py-20 text-white text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${sectionBackgrounds[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r text-white bg-clip-text text-transparent">
        Featured Products
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={5}
          slidesPerGroup={1}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          grabCursor
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white text-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col w-[300px] h-[420px] mx-auto "
              >
                <div className="relative overflow-hidden flex items-center justify-center h-48 bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link to={`/our-products/${product.id}`}></Link>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-900 font-bold text-lg">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <Link
                      to={`/our-products/${product.id}`}
                      className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold 
             hover:bg-gray-800 transition 
             border-2 border-transparent hover:border-yellow-500 
             hover:ring-1 hover:ring-yellow-500"
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProducts;
