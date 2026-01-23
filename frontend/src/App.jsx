import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedAdminRoute from './components/guards/ProtectedAdminRoute'; 

import AdminDashboard from './components/admin/Dashboard';

import Products from './components/admin/Products';
import AdminBlogs from './components/admin/Blogs';
import Users from './components/admin/Users';
import Settings from './components/admin/Settings';
import AdminLayout from './components/admin/AdminLayout';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetails from "./pages/ProductDetails";

import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';


import Gallery from './pages/our-gallery/Gallery';
import Blogs from './pages/blogs/Blogs';
import LatestNews from './pages/latest-news/LatestNews';

import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { getWhatsAppUrl, getPhoneUrl } from './config/contact';


function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>

          <Routes>
            {/* ================= PUBLIC WEBSITE ================= */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <HomePage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  <Navbar />
                  <LoginPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/signup"
              element={
                <>
                  <Navbar />
                  <SignupPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/all-products"
              element={
                <>
                  <Navbar />
                  <ProductPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/all-products/:category"
              element={
                <>
                  <Navbar />
                  <ProductPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/product/:id"
              element={
                <>
                  <Navbar />
                  <ProductDetails />
                  <Footer />
                </>
              }
            />
  


            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <ContactPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/about-us"
              element={
                <>
                  <Navbar />
                  <AboutPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/cart"
              element={
                <>
                  <Navbar />
                  <CartPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/our-gallery"
              element={
                <>
                  <Navbar />
                  <Gallery />
                  <Footer />
                </>
              }
            />

            <Route
              path="/blogs"
              element={
                <>
                  <Navbar />
                  <Blogs />
                  <Footer />
                </>
              }
            />

            <Route
              path="/latest-news"
              element={
                <>
                  <Navbar />
                  <LatestNews />
                  <Footer />
                </>
              }
            />

            {/* ================= ADMIN PANEL ================= */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>

          </Routes>
{/* ================= FLOATING CONTACT ACTIONS ================= */}
<div className="fixed right-4 bottom-20 flex flex-col gap-4 z-50">

  {/* WhatsApp */}
  <a
    href="https://wa.me/918856963655"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="
      w-12 h-12
      flex items-center justify-center
      rounded-full
      bg-green-500
      text-white
      shadow-lg shadow-green-500/30
      transition-all duration-300

      hover:bg-green-600
      hover:scale-110

      active:scale-95
    "
  >
    <FaWhatsapp className="text-xl" />
  </a>

  {/* Phone Call */}
  <a
    href="tel:+918856963655"
    aria-label="Call us"
      className="
      w-12 h-12
      flex items-center justify-center
      rounded-full
      bg-green-500
      text-white
      shadow-lg shadow-green-500/30
      transition-all duration-300

      hover:bg-green-600
      hover:scale-110

      active:scale-95
    "
  >
    <FaPhoneAlt className="text-lg" />
  </a>

</div>


        </CartProvider>
      </Router>
    </AuthProvider>
  );
}


export default App;