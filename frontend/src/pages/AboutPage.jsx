import React from "react";
import aboutUsImage from "../assets/images/about-us.jpg";

function AboutPage() {
  return (
    <div className="w-full bg-white">

      {/* ================= HERO / INTRO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* Text */}
          <div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
              About Text Tech Enterprises
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Text Tech Enterprises is a trusted supplier and importer of
              industrial machinery and textile testing instruments, serving
              manufacturing units and testing laboratories with precision-driven
              solutions.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Our focus is on delivering reliable, high-performance equipment
              that enables businesses to maintain quality, accuracy, and
              operational excellence.
            </p>
          </div>

          {/* Image */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
            <img
              src={aboutUsImage}
              alt="Text Tech Enterprises facility and machinery"
              className="rounded-xl w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          What We Stand For
        </h2>

        <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
          We help industries achieve consistency and compliance by supplying
          machinery that meets international quality standards. Our approach is
          rooted in technical expertise, ethical business practices, and
          long-term client partnerships.
        </p>
      </section>

      <SectionDivider />

      {/* ================= VISION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Vision for the Future
        </h2>

        <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
          Our vision is to expand globally while maintaining the trust we have
          built with our clients. By continuously investing in innovation,
          sustainable practices, and advanced technologies, we aim to redefine
          industrial quality standards worldwide.
        </p>
      </section>

      <SectionDivider />

      {/* ================= COMMITMENTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
          Our Commitment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Quality Assurance
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We supply machinery that meets rigorous performance and durability
              standards, ensuring long-term operational reliability.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Customer-Focused Solutions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every solution is aligned with customer requirements, supported by
              technical guidance and responsive service.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Innovation & Responsibility
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We adopt modern technologies and responsible practices to deliver
              efficient, future-ready industrial solutions.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

/* ================= SECTION DIVIDER ================= */
function SectionDivider() {
  return (
    <div className="flex justify-center">
      <div className="w-24 h-1 bg-yellow-500 rounded-full my-6" />
    </div>
  );
}

export default AboutPage;
