import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
  FaFileInvoice ,
} from "react-icons/fa";

function ContactPage() {
  const [mapLoaded, setMapLoaded] = useState(false);

  // ✅ FIX: submitting state added
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      alert("Thank you for contacting us. We will get back to you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
      <div className="relative z-10">

        {/* ================= PAGE HEADER ================= */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-100 mb-4"
          >
            Contact Us
          </motion.h1>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-4 md:mb-6 leading-snug md:leading-relaxed">

            Reach out to us for machinery enquiries, technical support, or general
            information. Our team is ready to assist you.
          </p>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pt-2 pb-14 md:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">

            {/* ================= CONTACT FORM ================= */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                {["name", "email", "subject"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={`Your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 outline-none"
                  />
                ))}

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 outline-none"
                />

                {/* ================= SUBMIT BUTTON ================= */}
                <button
  type="submit"
  disabled={submitting}
  className="
    w-full
    mt-3
    bg-slate-900
    text-white
    py-2 md:py-3
    rounded-md md:rounded-lg
    font-semibold
    text-sm md:text-base

    shadow-md
    hover:bg-slate-800
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
            </motion.div>

            {/* ================= CONTACT DETAILS ================= */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                Contact Information
              </h2>

              <div className="space-y-4 text-gray-900 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <FaLocationArrow className="text-slate-900 text-lg mt-1" />
                  <p>
                    3603 Durganagar, Bhaiyapada
                    <br />
                     Boisar, Dist-Palghar
                    <br />
                    Maharashtra 401501, India
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaMobileAlt className="text-slate-900 text-lg" />
                  <p>+91 8856963655</p>
                </div>

                <div className="flex items-center gap-3">
  <FaFileInvoice className="text-slate-900 text-lg" />
  <p className="font-medium">
    GSTIN: 27ASDPG9360Q1Z3
  </p>
</div>


                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-slate-900 text-lg" />
                  <p>sales@texttechenterprises.com</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= MAP ================= */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14 md:pb-20">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {!mapLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            <iframe
              src="https://www.google.com/maps?q=Datta%20Wadi%20Boisar%20Maharashtra&output=embed"
              loading="lazy"
              className="w-full h-[300px] md:h-[400px] border-0"
              onLoad={() => setMapLoaded(true)}
            />
          </div>
        </section>

      </div>
    </div>
  );
}

export default ContactPage;
