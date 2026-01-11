import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        // Fetch related products (same category)
        const relatedRes = await api.get("/products");
        const filtered = relatedRes.data.filter(
          (p) => p.category === res.data.category && p._id !== res.data._id
        );
        setRelated(filtered.slice(0, 3));
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  /* ================= HANDLE FORM ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/enquiries", {
        ...formData,
        productId: product._id,
        productName: product.name,
      });

      alert("Your enquiry has been sent successfully.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Failed to send enquiry. Please try again.");
    }
  };

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
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* ================= PRODUCT INFO ================= */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow p-6 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={product.name}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            {product.model && (
              <p>
                <span className="font-semibold">Model:</span> {product.model}
              </p>
            )}
            {product.application && (
              <p>
                <span className="font-semibold">Application:</span>{" "}
                {product.application}
              </p>
            )}
          </div>

          <div className="mt-8">
            <a
              href="#enquiry"
              className="inline-block px-8 py-4 rounded-lg bg-yellow-500 
              text-black font-semibold text-lg hover:bg-yellow-400 transition"
            >
              Enquire About This Product
            </a>
          </div>
        </div>
      </div>

      {/* ================= ENQUIRY FORM ================= */}
      <section id="enquiry" className="max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-6">
          Request More Information
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Fill out the form below and our team will contact you regarding
          <span className="font-semibold"> {product.name}</span>.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow p-8 space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />

          <textarea
            name="message"
            placeholder="Your Requirement / Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-md 
            hover:bg-gray-800 transition font-semibold"
          >
            Submit Enquiry
          </button>
        </form>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      {related.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            Related Machinery
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => {
              const relImg = Array.isArray(item.image)
                ? item.image[0]
                : item.image;

              const relImgSrc = relImg?.startsWith("http")
                ? relImg
                : `${BASE_URL}/${relImg?.replace(/^\/+/, "")}`;

              return (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="bg-white border border-gray-200 rounded-xl 
                  hover:shadow-lg transition overflow-hidden"
                >
                  <div className="h-48 bg-gray-50 flex items-center justify-center">
                    <img
                      src={relImgSrc}
                      alt={item.name}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
