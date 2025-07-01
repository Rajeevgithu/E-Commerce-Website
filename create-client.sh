#!/bin/bash

# Text Tech Enterprises - Client Setup Script
# This script helps create a new client project from the template

echo "🚀 Text Tech Enterprises - Client Setup"
echo "======================================="

# Check if client name is provided
if [ -z "$1" ]; then
    echo "❌ Error: Client name is required"
    echo "Usage: ./create-client.sh <client-name> [client-domain]"
    echo "Example: ./create-client.sh 'ABC Company' 'abc-company'"
    exit 1
fi

CLIENT_NAME="$1"
CLIENT_DOMAIN="${2:-$(echo "$CLIENT_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-\|-$//g')}"

echo "📋 Client Details:"
echo "   Name: $CLIENT_NAME"
echo "   Domain: $CLIENT_DOMAIN"
echo ""

# Confirm before proceeding
read -p "Continue with these details? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled"
    exit 1
fi

# Create client branch
echo "🔧 Creating client branch..."
git checkout -b "client/$CLIENT_DOMAIN"

if [ $? -ne 0 ]; then
    echo "❌ Failed to create branch. Make sure you're in a git repository."
    exit 1
fi

# Update contact configuration
echo "📝 Updating contact configuration..."
cat > frontend/src/config/contact.js << EOF
// Contact Information Configuration for $CLIENT_NAME
// Update these values with actual client information

export const contactConfig = {
  // Company Information
  companyName: "$CLIENT_NAME",
  companyShortName: "$(echo "$CLIENT_NAME" | cut -d' ' -f1 | cut -c1-3 | tr '[:lower:]' '[:upper:]')",
  
  // Contact Details - UPDATE THESE FOR CLIENT
  phone: "+1 234 567 8900",
  whatsapp: "+1 234 567 8900",
  email: "contact@${CLIENT_DOMAIN}.com",
  
  // Address - UPDATE FOR CLIENT
  address: "Client Address, City, State, ZIP",
  
  // Social Media - UPDATE URLs FOR CLIENT
  socialMedia: {
    instagram: "#",
    whatsapp: "#",
    twitter: "#",
    facebook: "#",
    linkedin: "#"
  },
  
  // Business Hours
  businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
  
  // Services - UPDATE FOR CLIENT
  services: [
    "Service 1",
    "Service 2", 
    "Service 3",
    "Service 4"
  ]
};

// Helper function to get WhatsApp URL
export const getWhatsAppUrl = () => {
  return \`https://wa.me/\${contactConfig.whatsapp.replace(/\\D/g, '')}\`;
};

// Helper function to get phone URL
export const getPhoneUrl = () => {
  return \`tel:\${contactConfig.phone}\`;
};
EOF

# Create environment files
echo "🔐 Creating environment files..."

# Backend .env template
cat > backend/.env.template << EOF
# Backend Environment Variables for $CLIENT_NAME
# Copy this to .env and fill in actual values

NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/${CLIENT_DOMAIN}_db
JWT_SECRET=your_super_secret_jwt_key_for_${CLIENT_DOMAIN}
FRONTEND_URL=https://${CLIENT_DOMAIN}-frontend.vercel.app
EOF

# Frontend .env.local template
cat > frontend/.env.local.template << EOF
# Frontend Environment Variables for $CLIENT_NAME
# Copy this to .env.local and fill in actual values

VITE_API_URL=https://${CLIENT_DOMAIN}-backend.railway.app
EOF

# Create client-specific README
cat > CLIENT_README.md << EOF
# $CLIENT_NAME - Project Setup

## 🚀 Quick Start

### 1. Environment Setup
\`\`\`bash
# Backend
cp backend/.env.template backend/.env
# Edit backend/.env with actual values

# Frontend  
cp frontend/.env.local.template frontend/.env.local
# Edit frontend/.env.local with actual values
\`\`\`

### 2. Install Dependencies
\`\`\`bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
\`\`\`

### 3. Run Locally
\`\`\`bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)
cd frontend
npm run dev
\`\`\`

## 📝 Customization Checklist

- [ ] Update company name in \`frontend/src/config/contact.js\`
- [ ] Replace logo images in \`frontend/src/assets/images/\`
- [ ] Update color scheme in \`frontend/tailwind.config.js\`
- [ ] Set up MongoDB Atlas database
- [ ] Configure environment variables
- [ ] Deploy to Railway (backend) and Vercel (frontend)

## 🔗 Deployment URLs

- **Frontend**: https://${CLIENT_DOMAIN}-frontend.vercel.app
- **Backend**: https://${CLIENT_DOMAIN}-backend.railway.app

## 📞 Support

For deployment help, see \`DEPLOYMENT_GUIDE.md\`
For security guidelines, see \`FREELANCING_SECURITY_GUIDE.md\`
EOF

echo "✅ Client setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Update contact information in frontend/src/config/contact.js"
echo "2. Replace logo and branding assets"
echo "3. Set up environment variables (.env files)"
echo "4. Test locally"
echo "5. Deploy following DEPLOYMENT_GUIDE.md"
echo ""
echo "📁 Files created:"
echo "   - frontend/src/config/contact.js (updated)"
echo "   - backend/.env.template"
echo "   - frontend/.env.local.template"
echo "   - CLIENT_README.md"
echo ""
echo "🔒 Security: All sensitive data is now in templates"
echo "   Update the templates with actual client information"
echo ""
echo "🎉 Ready for client handover!" 