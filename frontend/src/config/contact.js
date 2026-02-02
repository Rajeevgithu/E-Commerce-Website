// Contact Information Configuration
// Update these values for each client/project

export const contactConfig = {
  // Company Information
  companyName: "Text Tech Enterprises",
  companyShortName: "TTE",
  
  // Contact Details
  phone: "+91 8856963655", // Update for each client
  whatsapp: "+91 8856963655", // Update for each client
  email: "sales@texttechenterprises.com", // Update for each client
  
  // Address
  address: "Boisar, Palghar, Mumbai, Maharashtra 401506", // Update for each client
  
  // Social Media (update URLs for each client)
  socialMedia: {
    instagram: "#",
    whatsapp: "#",
    twitter: "#",
    facebook: "#",
    linkedin: "#"
  },
  
  // Business Hours
  businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
  
  // Services
  services: [
    "Texttiles Testing Instruments",
    "Consumables", 
    "Paint & Coating",
    "Test Chambers"
  ]
};

// Helper function to get WhatsApp URL (generic or product-specific)
export const getWhatsAppUrl = (product = null) => {
  const phone = contactConfig.whatsapp.replace(/\D/g, "");

  let message = `Hello ${contactConfig.companyName},\n\n`;

  if (product?.name) {
    message += `I am interested in the following product:\n\n`;
     message += `🟢 Product: ${product.name}\n`;

    if (product.category) {
      message += `🟢 Category: ${product.category}\n`;
    }

    message += `\nPlease share more details, pricing, and availability.\n\n`;
  } else {
    message += `I would like to enquire about your products.\n\n`;
  }

  message += `Thank you.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

// Helper function to get phone URL
export const getPhoneUrl = () => {
  return `tel:${contactConfig.phone}`;
};
