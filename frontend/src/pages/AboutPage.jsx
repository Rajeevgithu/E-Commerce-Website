import React from "react";
import aboutUsImage from "../assets/images/about-us.jpg";

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-br from-white to-gray-50">
      {/* Introduction */}
      <section
        className="mb-24 grid md:grid-cols-2 gap-10 items-center"
        data-aos="fade-up"
      >
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            Text Tech Enterprises is a highly renowned supplier and importer in
            the textile industry and testing labs. Our goal is to provide
            cutting-edge quality control solutions to empower businesses through
            precision and innovation.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We specialize in premium industrial machinery and tools, ensuring
            our clients operate with confidence and accuracy. Each solution we
            provide is built on a foundation of trust, transparency, and
            technological excellence.
          </p>
        </div>
        <div className="bg-white max-w-md mx-auto" data-aos="fade-left">
          <img
            src={aboutUsImage}
            alt="About Text Tech Enterprises"
            className="rounded-2xl shadow-md w-full object-cover max-h-[700px]"
          />
        </div>
      </section>

      <div className="h-1 w-2/3 mx-auto my-12 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 animate-pulse rounded-full" />

      {/* Vision */}
      <section className="text-center mb-24" data-aos="fade-up">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
          Vision for the Future
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Looking ahead, Text Tech Enterprises aspires to expand globally,
          making a lasting impact on industries and communities. Through ethical
          practices and transparent operations, we continue to redefine
          standards with innovation, sustainability, and enduring quality.
        </p>
      </section>

      <div className="h-1 w-2/3 mx-auto my-12 bg-gradient-to-r from-indigo-500 via-white to-indigo-500 animate-pulse rounded-full" />

      {/* Commitment Cards */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-10 text-indigo-700">
          Our Commitment
        </h2>
        <div className="grid md:grid-cols-3 gap-6 justify-center">
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
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition max-w-sm mx-auto"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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
