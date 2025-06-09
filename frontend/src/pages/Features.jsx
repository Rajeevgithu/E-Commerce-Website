import React from "react";
import { FaLock, FaHeadset, FaTruck } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaLock className="text-6xl text-gray-800 mx-auto mb-4" />,
      title: "SECURE PAYMENT",
      description:
        "We process end-to-end secure payments via Credit Cards, Debit Cards, UPI, and also support Cash On Delivery.",
    },
    {
      icon: <FaHeadset className="text-6xl text-gray-800 mx-auto mb-4" />,
      title: "24/7 CUSTOMER SUPPORT",
      description:
        "Our team is available around the clock to help you with your queries and order details.",
    },
    {
      icon: <FaTruck className="text-6xl text-gray-800 mx-auto mb-4" />,
      title: "FAST DELIVERY",
      description:
        "99% of orders are shipped within 48 hours. Safe, fast, and reliable delivery guaranteed.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-3 uppercase tracking-wide">
              {feature.title}
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
