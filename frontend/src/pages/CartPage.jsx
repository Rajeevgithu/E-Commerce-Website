import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext'; // Assumed AuthContext
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:5000";

function CartPage() {
  const {
    cartItems,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const { user } = useAuth(); // current logged-in user
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login or sign up to proceed with your order.");
      navigate('/login');
      return;
    }

    try {
      // Mocking sending order details to the store owner
      await fetch(`${BASE_URL}/api/notify-owner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: user.name,
            email: user.email,
          },
          cart: cartItems,
          total: totalPrice,
        }),
      });

      alert("Your order request has been sent! We'll get back to you shortly.");
    } catch (err) {
      alert("Something went wrong while sending your order. Please try again.");
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center text-gray-700 text-lg">Loading your cart...</div>;
  if (error) return <div className="container mx-auto py-20 text-center text-red-600 font-semibold">{error}</div>;
  if (cartItems.length === 0) {
    return <div className="container mx-auto py-32 text-center text-gray-500 text-xl">Your cart is currently empty.</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-24">
      {/* Cart Items with delivery info inside */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6 mb-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-neutral-900 mb-6">Shopping Cart</h1>

        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-center font-medium">
          Products will reach you in 5 to 7 working days 🚚
        </div>

        {cartItems.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-b-0"
          >
            <img
              src={product.image?.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg border"
            />

            <div className="flex-1 w-full">
              <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-700 font-medium mt-1">₹{product.price?.toFixed(2)}</p>

              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(product._id, quantity - 1)}
                  disabled={quantity === 1}
                  className={`w-9 h-9 flex items-center justify-center rounded border text-lg font-bold transition
                    ${
                      quantity === 1
                        ? 'text-gray-800 border-yellow-500 cursor-not-allowed bg-gray-100'
                        : 'text-gray-800 border-yellow-500 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  −
                </button>
                <span className="text-md font-medium text-gray-800">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product._id, quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded border text-gray-800 border-yellow-500 hover:bg-gray-700 hover:text-white text-lg font-bold transition "
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(product._id)}
              className="px-4 py-2 rounded-md font-semibold mt-auto  text-white text-sm  bg-gray-800 border-2 border-gray-600 
             focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
             hover:border-yellow-500 transition duration-200"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary - full width match */}
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Order Summary</h3>

        <div className="flex justify-between text-lg font-medium text-gray-700 mb-4">
          <span>Total:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full  py-3 rounded-lg font-semibold  text-white text-sm  bg-gray-800 border-2 border-gray-600 
             focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
             hover:border-yellow-500 transition duration-200"
        >
          Proceed to Checkout
        </button>

        {!user && (
          <p className="mt-4 text-sm text-center text-gray-600">
            New user? Please <span className="font-semibold text-indigo-600">Sign Up</span> first.
            Already have an account? <span className="font-semibold text-indigo-600">Log in</span> to proceed.
          </p>
        )}
      </div>
    </div>
  );
}

export default CartPage;
