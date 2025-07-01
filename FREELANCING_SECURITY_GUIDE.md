# 🔒 Freelancing Security Guide

## ⚠️ CRITICAL: Protect Your Client's Information

This guide ensures your project is secure and professional for freelancing work.

## 🚨 Security Checklist

### ✅ Before Sharing Code:
1. **Remove all hardcoded sensitive data**
2. **Use environment variables**
3. **Create client-specific configurations**
4. **Remove personal contact information**
5. **Use placeholder data for demos**

### ✅ Before Deployment:
1. **Set up proper environment variables**
2. **Configure secure database connections**
3. **Enable HTTPS**
4. **Set up proper CORS**
5. **Use strong secrets**

## 📁 Client Customization Files

### 1. Contact Configuration (`frontend/src/config/contact.js`)
Update this file for each client:

```javascript
export const contactConfig = {
  companyName: "Client Company Name",
  companyShortName: "CCN",
  phone: "+1 234 567 8900",
  whatsapp: "+1 234 567 8900",
  email: "contact@clientcompany.com",
  address: "Client Address, City, State, ZIP",
  // ... other settings
};
```

### 2. Environment Variables
Create these files for each client:

**Backend (.env)**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/client_database
JWT_SECRET=client_specific_jwt_secret_key
FRONTEND_URL=https://client-frontend-domain.vercel.app
```

**Frontend (.env.local)**
```env
VITE_API_URL=https://client-backend-url.railway.app
```

## 🔧 Quick Client Setup Process

### Step 1: Create Client Branch
```bash
git checkout -b client/client-name
```

### Step 2: Update Contact Information
Edit `frontend/src/config/contact.js` with client details

### Step 3: Update Environment Variables
- Backend: Create `.env` file
- Frontend: Create `.env.local` file

### Step 4: Update Branding
- Replace logo images
- Update color scheme in `tailwind.config.js`
- Update company name throughout the app

### Step 5: Test Locally
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

### Step 6: Deploy
Follow the deployment guide for the specific client

## 🛡️ Security Best Practices

### 1. **Never Commit Sensitive Data**
- ✅ Use `.env` files (already in `.gitignore`)
- ✅ Use placeholder data in code
- ✅ Use configuration files for client data

### 2. **Database Security**
- ✅ Use separate databases for each client
- ✅ Use strong passwords
- ✅ Enable MongoDB Atlas security features
- ✅ Use IP whitelist if needed

### 3. **API Security**
- ✅ Use HTTPS in production
- ✅ Implement proper CORS
- ✅ Use JWT tokens for authentication
- ✅ Validate all inputs

### 4. **Deployment Security**
- ✅ Use environment variables in deployment platforms
- ✅ Enable automatic security updates
- ✅ Monitor for vulnerabilities
- ✅ Regular backups

## 📋 Client Handover Checklist

### ✅ Code Delivery
- [ ] All sensitive data removed
- [ ] Configuration files provided
- [ ] Environment variables documented
- [ ] Deployment instructions included
- [ ] Custom domain setup guide

### ✅ Documentation
- [ ] README.md updated for client
- [ ] API documentation provided
- [ ] User manual created
- [ ] Maintenance guide included

### ✅ Security
- [ ] Environment variables set up
- [ ] Database credentials provided
- [ ] SSL certificates configured
- [ ] Backup strategy documented

## 🎨 Branding Customization

### Colors
Update `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#client-primary-color',
      secondary: '#client-secondary-color',
    }
  }
}
```

### Logo
Replace these files:
- `frontend/src/assets/images/Logo.png`
- `frontend/src/assets/images/footer-banner.jpg`

### Company Information
Update throughout the app:
- Company name
- Contact information
- Services offered
- Social media links

## 🔄 Template Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── contact.js          # Client contact info
│   │   └── assets/
│   │       └── images/
│   │           ├── Logo.png        # Client logo
│   │           └── footer-banner.jpg
│   ├── .env.local                  # Frontend environment
│   └── tailwind.config.js          # Branding colors
├── backend/
│   ├── .env                        # Backend environment
│   └── server.js                   # CORS configuration
└── docs/
    ├── DEPLOYMENT_GUIDE.md         # Deployment instructions
    └── CLIENT_SETUP.md             # Client-specific setup
```

## 🚀 Quick Start for New Client

1. **Clone the repository**
2. **Create client branch**: `git checkout -b client/client-name`
3. **Update contact configuration**: Edit `frontend/src/config/contact.js`
4. **Replace branding assets**: Update logos and images
5. **Set environment variables**: Create `.env` files
6. **Test locally**: Run both frontend and backend
7. **Deploy**: Follow deployment guide
8. **Handover**: Provide documentation and credentials

## ⚡ Automation Scripts

### Create Client Setup Script
```bash
#!/bin/bash
# create-client.sh

CLIENT_NAME=$1
CLIENT_DOMAIN=$2

if [ -z "$CLIENT_NAME" ] || [ -z "$CLIENT_DOMAIN" ]; then
    echo "Usage: ./create-client.sh <client-name> <client-domain>"
    exit 1
fi

# Create client branch
git checkout -b client/$CLIENT_NAME

# Update contact configuration
sed -i "s/Text Tech Enterprises/$CLIENT_NAME/g" frontend/src/config/contact.js

# Create environment files
echo "VITE_API_URL=https://$CLIENT_DOMAIN-backend.railway.app" > frontend/.env.local

echo "Client setup complete for $CLIENT_NAME"
```

## 🔍 Security Audit Commands

### Check for Sensitive Data
```bash
# Search for hardcoded secrets
grep -r "password\|secret\|key\|token" . --exclude-dir=node_modules

# Search for API keys
grep -r "sk_\|pk_\|ghp_\|gho_" . --exclude-dir=node_modules

# Search for database URLs
grep -r "mongodb://\|mongodb+srv://" . --exclude-dir=node_modules
```

### Check for Personal Information
```bash
# Search for phone numbers
grep -r "[0-9]\{10,\}" . --exclude-dir=node_modules

# Search for email addresses
grep -r "[a-zA-Z0-9._%+-]\+@[a-zA-Z0-9.-]\+\.[a-zA-Z]\{2,\}" . --exclude-dir=node_modules
```

## 📞 Support

If you need help with client setup or security:
1. Check this guide first
2. Review the deployment guide
3. Test locally before deploying
4. Use the security audit commands
5. Contact for additional support

## 🎯 Success Metrics

- ✅ No sensitive data in code
- ✅ Easy client customization
- ✅ Secure deployment
- ✅ Professional handover
- ✅ Happy clients
- ✅ Repeat business 