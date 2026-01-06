import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../contexts/CartContext";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!product) return null;

  const img = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  const imgSrc = img?.startsWith("http")
    ? img
    : `${BASE_URL}/${img?.replace(/^\/+/, "")}`;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={product.name}
          className="max-h-[400px] object-contain"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <p className="text-2xl font-semibold mb-4">₹{product.price}</p>

        <p className="mb-4">
          <span className="font-semibold">Category:</span>{" "}
          {product.category}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
