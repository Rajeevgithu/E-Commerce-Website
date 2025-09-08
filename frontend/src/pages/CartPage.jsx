import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || "https://e-commerce-website-1-lmr9.onrender.com";

// Modal Component (inline)
function Modal({ title, message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6 animate-fade-in">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CartPage() {
  const {
    cartItems,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [modal, setModal] = useState({ show: false, title: '', message: '' });

  const handleCheckout = async () => {
    if (!user) {
      setModal({
        show: true,
        title: 'Login Required',
        message: 'Please login or sign up to proceed with your order.',
      });
      navigate('/login');
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/notify-owner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { name: user.name, email: user.email },
          cart: cartItems,
          total: totalPrice,
        }),
      });

      setModal({
        show: true,
        title: 'Order Sent',
        message: 'Your order request has been successfully sent. You’ll receive confirmation soon.',
      });
    } catch (err) {
      setModal({
        show: true,
        title: 'Error',
        message: 'Something went wrong while placing your order. Please try again later.',
      });
    }
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">Loading your cart...</div>;

  if (error)
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">{error}</div>;

  if (cartItems.length === 0)
    return <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">Your cart is currently empty.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="mt-3 inline-block px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-md">
            Products will reach you in 5 to 7 working days 🚚
          </p>
        </div>

        {/* Cart Items */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cartItems.map(({ product, quantity }) => (
            <div key={product._id} className="flex flex-col bg-white shadow-md rounded-xl p-4 h-full">
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <img
                  src={(() => {
                    const img = Array.isArray(product.image) ? product.image[0] : product.image;
                    if (!img) return '';
                    if (img.startsWith('http')) return img;
                    const path = img.startsWith('/uploads') || img.includes('/uploads/')
                      ? img.replace(/^\/+/, '')
                      : `uploads/${img.replace(/^\/+/, '')}`;
                    return `${BASE_URL}/${path}`;
                  })()}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 flex flex-col flex-grow">
                <h2 className="text-base font-semibold text-gray-800 line-clamp-2">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description || 'No description available.'}
                </p>
                <p className="text-md font-bold text-gray-800 mt-2">₹{product.price?.toFixed(2)}</p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    disabled={quantity === 1}
                    className={`w-8 h-8 flex items-center justify-center rounded border text-lg font-bold transition ${
                      quantity === 1
                        ? 'text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed'
                        : 'text-gray-800 border-yellow-500 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    −
                  </button>
                  <span className="text-sm font-medium text-gray-800">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded border text-gray-800 border-yellow-500 hover:bg-gray-700 hover:text-white text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="mt-4 py-2 w-full text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-gray-800 text-center">
            Order Summary
          </h3>

          <div className="flex justify-between text-base sm:text-lg font-medium text-gray-700 mb-4">
            <span>Total:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gray-800 hover:bg-gray-700 transition"
          >
            Proceed to Checkout
          </button>

          {!user && (
            <p className="mt-4 text-sm text-center text-gray-600">
              New user?{' '}
              <span className="font-semibold text-indigo-600 cursor-pointer" onClick={() => navigate('/signup')}>
                Sign Up
              </span>{' '}
              or{' '}
              <span className="font-semibold text-indigo-600 cursor-pointer" onClick={() => navigate('/login')}>
                Log In
              </span>{' '}
              to place your order.
            </p>
          )}
        </div>
      </div>

      {/* Modal Render */}
      {modal.show && (
        <Modal
          title={modal.title}
          message={modal.message}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </div>
  );
}

export default CartPage;
