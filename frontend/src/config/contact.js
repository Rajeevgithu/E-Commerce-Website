// Contact Information Configuration
// Update these values for each client/project

export const contactConfig = {
  // Company Information
  companyName: "Text Tech Enterprises",
  companyShortName: "TTE",
  
  // Contact Details
  phone: "+91 7756038758", // Update for each client
  whatsapp: "+91 7756038758", // Update for each client
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

// Helper function to get WhatsApp URL
export const getWhatsAppUrl = () => {
  return `https://wa.me/${contactConfig.whatsapp.replace(/\D/g, '')}`;
};

// Helper function to get phone URL
export const getPhoneUrl = () => {
  return `tel:${contactConfig.phone}`;
}; 