import React from "react";
import aboutUsImage from "../assets/images/about-us.jpg";

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-white to-gray-100">
      {/* Introduction */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-indigo-700">
            Who We Are
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
            Text Tech Enterprises is a highly renowned supplier and importer in
            the textile industry and testing labs. Our goal is to provide
            cutting-edge quality control solutions to empower businesses through
            precision and innovation.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We specialize in premium industrial machinery and tools, ensuring
            our clients operate with confidence and accuracy. Each solution we
            provide is built on a foundation of trust, transparency, and
            technological excellence.
          </p>
        </div>
        <div className="max-w-md w-full mx-auto md:mx-0">
          <img
            src={aboutUsImage}
            alt="About Text Tech Enterprises"
            className="rounded-2xl shadow-lg w-full object-cover max-h-[500px]"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 w-2/3 mx-auto my-12 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 animate-pulse rounded-full" />

      {/* Vision Section */}
      <section className="text-center mb-20 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-indigo-700">
          Vision for the Future
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Looking ahead, Text Tech Enterprises aspires to expand globally,
          making a lasting impact on industries and communities. Through ethical
          practices and transparent operations, we continue to redefine
          standards with innovation, sustainability, and enduring quality.
        </p>
      </section>

      {/* Divider */}
      <div className="h-1 w-2/3 mx-auto my-12 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 animate-pulse rounded-full" />

      {/* Commitment Cards */}
      <section className="mb-16 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-indigo-700">
          Our Commitment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "Quality Assurance",
              desc: "We prioritize high-performance products that exceed industry standards.",
              icon: "🛠️",
            },
            {
              title: "Customer-Centric Approach",
              desc: "Our customers are the core of our mission. We aim to surpass expectations.",
              icon: "🤝",
            },
            {
              title: "Innovation & Sustainability",
              desc: "We drive forward-thinking, eco-conscious solutions for a better future.",
              icon: "🌱",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 max-w-sm mx-auto"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
