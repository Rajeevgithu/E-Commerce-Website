import React from "react";
import aboutUsImage from "../assets/images/about-us.jpg";

function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden">
      
      {/* SUBTLE BACKGROUND TEXTURE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10">

        {/* ================= HERO / INTRO ================= */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8 py-14 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* TEXT */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-100 mb-4 md:mb-6">
                About Text Tech Enterprises
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4 md:mb-5">
                Text Tech Enterprises is a trusted supplier and importer of
                industrial machinery and textile testing instruments, serving
                manufacturing units and testing laboratories.
              </p>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                We deliver reliable, high-performance equipment that enables
                quality, accuracy, and operational excellence.
              </p>
            </div>

        {/* IMAGE */}
<div className="
  rounded-xl md:rounded-2xl
  border border-white/15
  shadow-[0_16px_40px_rgba(0,0,0,0.45)]
  bg-white
  flex items-center justify-center
  h-[240px] sm:h-[300px] md:h-[420px]
">
  <img
    src={aboutUsImage}
    alt="Text Tech Enterprises products and solutions"
    className="max-w-full max-h-full object-contain"
  />
</div>

          </div>
        </section>

        {/* ================= VALUE PROPOSITION ================= */}
<section className="max-w-5xl mx-auto px-4 md:px-6 pt-4 pb-12 md:py-20 text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2 md:mb-4">
    What We Stand For
  </h2>

  <p className="text-slate-300 text-base md:text-lg leading-snug md:leading-relaxed">
    We help industries achieve consistency and compliance by supplying
    machinery that meets international quality standards, backed by
    ethical practices and long-term partnerships.
  </p>
</section>


        {/* ================= VISION ================= */}
       <section className="max-w-5xl mx-auto px-4 md:px-6 pt-10 pb-12 md:py-20 text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2 md:mb-4">
    Vision for the Future
  </h2>

  <p className="text-slate-300 text-base md:text-lg leading-snug md:leading-relaxed">
    Our vision is to expand globally while preserving trust. Through
    innovation, sustainability, and advanced technologies, we aim to
    redefine industrial quality standards.
  </p>
</section>


        {/* ================= COMMITMENTS ================= */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-100 mb-10 md:mb-14">
            Our Commitment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">

            {/* CARD */}
            {[
              {
                title: "Quality Assurance",
                text: "We supply machinery that meets rigorous performance and durability standards for long-term reliability."
              },
              {
                title: "Customer-Focused Solutions",
                text: "Solutions aligned with customer requirements, supported by technical expertise and responsive service."
              },
              {
                title: "Innovation & Responsibility",
                text: "Modern technologies and responsible practices for efficient, future-ready solutions."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
              >
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
