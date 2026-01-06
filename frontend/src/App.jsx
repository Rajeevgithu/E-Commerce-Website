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

          {/* Floating icons can stay global */}
          <div className="fixed right-4 bottom-20 flex flex-col gap-4 z-50">
            <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              <FaWhatsapp className="text-green-500 text-4xl" />
            </a>
            <a href={getPhoneUrl()} target="_blank" rel="noreferrer">
              <FaPhoneAlt className="text-green-500 text-4xl" />
            </a>
          </div>

        </CartProvider>
      </Router>
    </AuthProvider>
  );
}


export default App;