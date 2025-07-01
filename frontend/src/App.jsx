import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext'; 

import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';

import Gallery from './pages/our-gallery/Gallery';
import Blogs from './pages/blogs/Blogs';
import LatestNews from './pages/latest-news/LatestNews';

import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { getWhatsAppUrl, getPhoneUrl } from './config/contact';

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <Router future={{ v7_startTransition: true }}>
        <CartProvider>
          <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/edit-product/:id" element={<EditProduct />} />

                {/* Public Routes */}
                <Route path="/all-products" element={<ProductPage />} />
                <Route path="/all-products/:category" element={<ProductPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/cart" element={<CartPage />} />
                
                {/* Category Routes */}
                <Route path="/consumable-products" element={<CategoryPage />} />
                <Route path="/testing-products" element={<CategoryPage />} />
                <Route path="/paint-&-coating" element={<CategoryPage />} />

                {/* New Routes */}
                <Route path="/our-gallery" element={<Gallery />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/latest-news" element={<LatestNews />} />
              </Routes>
            </main>

            {/* Floating WhatsApp & Phone icons */}
            <div className="fixed right-4 bottom-20 flex flex-col items-center space-y-4 z-50">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-green-500 text-4xl hover:text-white transition-all drop-shadow-lg" />
              </a>
              <a href={getPhoneUrl()} target="_blank" rel="noopener noreferrer">
                <FaPhoneAlt className="text-green-500 text-4xl hover:text-white transition-all drop-shadow-lg" />
              </a>
            </div>

            <Footer />
          </div>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
