# 🛍️ Text Tech Enterprises - E-Commerce Website

A modern, full-stack e-commerce platform built with React, Node.js, and MongoDB. This project provides a complete online shopping experience with user authentication, product management, shopping cart functionality, and admin dashboard.

## 🌟 Live Demo

**Frontend**: [e-commerce-website-lilac-ten-30.vercel.app](https://e-commerce-website-lilac-ten-30.vercel.app)

## ✨ Features

### 🛒 Customer Features
- **Product Browsing**: Browse products by categories (Consumable, Testing, Paint & Coating)
- **Product Search**: Search and filter products
- **Shopping Cart**: Add/remove items, quantity management
- **User Authentication**: Secure login/signup with JWT
- **Product Gallery**: Visual product showcase
- **Responsive Design**: Mobile-first responsive UI
- **Contact & Support**: WhatsApp and phone integration

### 👨‍💼 Admin Features
- **Admin Dashboard**: Complete product management
- **Add Products**: Upload product images and details
- **Edit Products**: Modify existing product information
- **Product Categories**: Organize products by categories
- **Image Management**: Handle product image uploads

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface
- **Dark/Light Mode**: Toggle between themes
- **Animations**: Smooth transitions and micro-interactions
- **Loading States**: Better user experience
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Bootstrap** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Swiper** - Touch slider
- **AOS** - Scroll animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Nodemon** - Development server

## 📁 Project Structure

```
Text-Tech-Website/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API configuration
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json
├── backend/                 # Node.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   ├── uploads/           # Uploaded files
│   └── package.json
├── admin/                  # Admin panel assets
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rajeevgithu/E-Commerce-Website.git
   cd E-Commerce-Website
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   **Backend (.env)**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend (.env.local)**
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start Development Servers**

   **Backend**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Seed Database (Optional)**
   ```bash
   cd backend
   npm run seed
   ```

## 🌐 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Backend (Railway/Render)
1. Push your code to GitHub
2. Connect your repository to Railway/Render
3. Set root directory to `backend`
4. Configure environment variables
5. Deploy

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📱 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm start            # Start production server
npm run dev          # Start development server
npm run seed         # Seed database with sample data
```

## 🔧 Configuration

### Database
- MongoDB Atlas cluster
- Mongoose connection with error handling
- Product, User, and Cart models

### Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes middleware

### File Upload
- Multer configuration for image uploads
- Support for multiple image formats
- Automatic file naming and organization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rajeev Githu**
- GitHub: [@Rajeevgithu](https://github.com/Rajeevgithu)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vercel for hosting
- MongoDB Atlas for database
- All contributors and supporters

## 📞 Support

For support, email or reach out through:
- WhatsApp: [Contact via WhatsApp]
- Phone: [Contact via Phone]

---

⭐ **Star this repository if you found it helpful!**
