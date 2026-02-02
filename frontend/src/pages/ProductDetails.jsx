import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import api from "../api/axios";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "../config/contact";


const BASE_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
const [submitting, setSubmitting] = useState(false);
const [formStatus, setFormStatus] = useState({ type: "", message: "" });
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
};

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        const images = Array.isArray(res.data.image)
          ? res.data.image
          : [res.data.image];

        const formatted = images.map((img) =>
          img?.startsWith("http")
            ? img
            : `${BASE_URL}/${img?.replace(/^\/+/, "")}`
        );

        setActiveImage(formatted[0]);

        const relatedRes = await api.get("/products");
        setRelated(
          relatedRes.data.filter(
            (p) => p.category === res.data.category && p._id !== res.data._id
          ).slice(0, 3)
        );
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= FORM ================= */
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  if (submitting) return;

  if (!isValidEmail(formData.email)) {
    setFormStatus({
      type: "error",
      message: "Please enter a valid email address.",
    });
    return;
  }

  setSubmitting(true);
  setFormStatus({ type: "", message: "" });

  try {
    await api.post("/contact", {
      ...formData,
      productId: product._id,
      productName: product.name,
    });

    setFormStatus({
      type: "success",
      message: "Enquiry sent successfully. We will contact you shortly.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });

  } catch {
    setFormStatus({
      type: "error",
      message: "Failed to send enquiry. Please try again.",
    });
  } finally {
    setSubmitting(false);
  }
};



  if (loading)
    return <p className="text-center py-24 text-gray-400">Loading...</p>;
  if (error)
    return <p className="text-center py-24 text-red-500">{error}</p>;
  if (!product) return null;

  const images = Array.isArray(product.image)
    ? product.image
    : [product.image];

  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

{/* ================= MOBILE BACK BUTTON ================= */}
<button
  onClick={() => navigate(-1)}
  className="
    sm:hidden
    mb-4
    inline-flex items-center gap-2
    text-gray-300 text-sm font-medium
    hover:text-white
    active:scale-95
    transition
  "
>
  <IoArrowBack size={18} />
  Back
</button>


{/* ================= PRODUCT ================= */}
<div
  className="
    grid
    gap-6 sm:gap-14
    mb-12 sm:mb-28
    grid-cols-1
    lg:grid-cols-[480px_1fr]
  "
>

  {/* IMAGE GALLERY */}
<div
  className="
    rounded-lg sm:rounded-2xl
    border border-white/10
    shadow-lg
    bg-slate-900
    overflow-hidden
  "
>

  {/* MAIN IMAGE */}
  <div
    className="
      h-[260px] sm:h-auto
      sm:aspect-[4/3] lg:aspect-square
      bg-white
      flex items-center justify-center
      p-2 sm:p-6
    "
  >
    <img
      src={activeImage}
      alt={product.name}
      className="
        max-h-full max-w-full
        object-contain
        cursor-zoom-in
      "
      onDoubleClick={() => setPreviewImage(activeImage)}
    />
  </div>

  {/* THUMBNAILS */}
  {images.length > 1 && (
    <div
      className="
        grid
        grid-cols-4
        gap-1.5 sm:gap-3
        p-2 sm:p-4
        bg-slate-800
        border-t border-white/10
        sm:grid-cols-5
        md:grid-cols-6
        lg:grid-cols-4
      "
    >
      {images.map((img, i) => {
        const src = img.startsWith("http")
          ? img
          : `${BASE_URL}/${img.replace(/^\/+/, "")}`;

        return (
          <button
            key={i}
            onClick={() => setActiveImage(src)}
            className={`
              aspect-square
              rounded-md sm:rounded-lg
              bg-white
              p-1 sm:p-2
              transition
              ${
                activeImage === src
                  ? "ring-2 ring-orange-500"
                  : "hover:ring-1 hover:ring-gray-300"
              }
            `}
          >
            <img
              src={src}
              alt={`thumbnail-${i}`}
              className="w-full h-full object-contain"
            />
          </button>
        );
      })}
    </div>
  )}
</div>
{/* ================= DETAILS ================= */}
<div>
  {/* PRODUCT NAME */}
  <h1 className="text-xl sm:text-4xl font-extrabold mb-2 sm:mb-4">
    {product.name}
  </h1>

  {/* DESCRIPTION */}
  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-8">
    {product.description}
  </p>

  {/* CATEGORY + MOBILE ENQUIRE (SAME ROW ON MOBILE) */}
  <div
    className="
      flex items-center justify-between
      sm:block
      mb-3 sm:mb-0
      text-gray-300 text-sm sm:text-base
    "
  >
    <p>
      <span className="font-semibold text-white">Category:</span>{" "}
      {product.category}
    </p>

   {/* MOBILE ENQUIRE BUTTON */}
<a
  href="#enquiry"
  className="
    sm:hidden
    inline-flex items-center justify-center
    px-4 py-1.5
    rounded-md
    bg-slate-100
    text-slate-900
    text-xs font-semibold
    transition-all duration-200

    /* tap / click feedback */
    active:ring-2 active:ring-yellow-400/80
    focus-visible:ring-2 focus-visible:ring-yellow-400/80

    active:scale-[0.96]
    focus:outline-none
  "
>
  Enquire
</a>

  </div>

  {/* OTHER DETAILS */}
  <div className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
    {product.model && (
      <p>
        <span className="font-semibold text-white">Model:</span>{" "}
        {product.model}
      </p>
    )}

    {product.application && (
      <p>
        <span className="font-semibold text-white">Application:</span>{" "}
        {product.application}
      </p>
    )}
  </div>

  {/* DESKTOP CTA BUTTON */}
<a
  href="#enquiry"
  className="
    hidden sm:inline-flex
    items-center justify-center
    mt-10
    px-10 py-4
    rounded-xl
    bg-slate-100
    text-slate-900
    font-bold text-lg
    transition-all duration-300

    hover:bg-white
    hover:ring-2 hover:ring-yellow-400/70

    active:ring-2 active:ring-yellow-400/80
    active:scale-[0.97]

    focus-visible:ring-2 focus-visible:ring-yellow-400/80
    focus:outline-none
  "
>
  Enquire About This Product
</a>
{/* ================= PRODUCT WHATSAPP ENQUIRY ================= */}
<div className="fixed right-4 bottom-36 z-50">
  <a
    href={getWhatsAppUrl(product)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp Product Enquiry"
    className="
      w-12 h-12
      flex items-center justify-center
      rounded-full
      bg-green-500
      text-white
      shadow-lg shadow-green-500/30
      transition-all duration-300
      hover:bg-green-600
      hover:scale-110
      active:scale-95
    "
  >
    <FaWhatsapp className="text-xl" />
  </a>
</div>

</div>
</div>


{/* ================= ENQUIRY ================= */}
<section id="enquiry" className="mt-6 sm:mt-12">
  <div className="w-full sm:max-w-7xl mx-auto px-0 sm:px-6">

    <h2 className="text-lg sm:text-3xl font-bold text-center mb-4 sm:mb-8">
      Request More Information
    </h2>

    <form
      onSubmit={handleSubmit}
      className="
        bg-slate-900
        border border-white/10
        rounded-lg sm:rounded-2xl
        p-4 sm:p-8
        space-y-3 sm:space-y-5
      "
    >
      {/* PRODUCT NAME (AUTO-FILLED) */}
<input
  type="text"
  value={product.name}
  readOnly
  className="
    w-full
    px-3 sm:px-4
    py-2 sm:py-3
    text-sm sm:text-base
    rounded-md sm:rounded-lg
    bg-slate-800
    text-white
    border border-white/20
    cursor-not-allowed
    opacity-90
  "
/>

      {["name", "email", "phone"].map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : "text"}
          name={field}
          placeholder={`Your ${field}`}
          value={formData[field]}
          onChange={handleChange}
          required
          className="
            w-full
            px-3 sm:px-4
            py-2 sm:py-3
            text-sm sm:text-base
            rounded-md sm:rounded-lg
            bg-slate-950
            border border-white/10
            focus:ring-2 focus:ring-yellow-400/70
            outline-none
          "
        />
      ))}

      

      <textarea
        name="message"
        rows="3"
        placeholder="Your requirement / message"
        value={formData.message}
        onChange={handleChange}
        className="
          w-full
          px-3 sm:px-4
          py-2 sm:py-3
          text-sm sm:text-base
          rounded-md sm:rounded-lg
          bg-slate-950
          border border-white/10
          focus:ring-2 focus:ring-yellow-400/70
          outline-none
        "
      />

      <button
        type="submit"
        disabled={submitting}
        className="
          w-full
          mt-2
          bg-slate-100
          text-slate-900
          py-2.5 sm:py-3
          rounded-md sm:rounded-lg
          font-semibold
          text-sm sm:text-base
          transition-all duration-200

          active:ring-2 active:ring-yellow-400/80
          focus-visible:ring-2 focus-visible:ring-yellow-400/80
          active:scale-[0.97]

          disabled:opacity-60
          disabled:cursor-not-allowed
          focus:outline-none
        "
      >
        {submitting ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>

  </div>
</section>


</div>
    {/* ================= IMAGE LIGHTBOX (NO CARD) ================= */}
{previewImage && (
  <div
    className="
      fixed inset-0 z-50
      bg-black/90
      flex items-center justify-center
      cursor-zoom-out
      px-3 sm:px-0
    "
    onClick={() => setPreviewImage(null)}
  >
    <img
      src={previewImage}
      alt="Product preview"
      className="
        max-h-[80vh] sm:max-h-[90vh]
        max-w-[90vw]
        object-contain
        select-none
        sm:cursor-zoom-in
      "
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}

    </section>
  );
};

export default ProductDetails;
