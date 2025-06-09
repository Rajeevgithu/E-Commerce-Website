import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; // Your axios instance with baseURL

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userId = user?._id;

  const [cartItems, setCartItems] = useState(() => {
    if (userId) return []; // Will fetch from backend
    // Load guest cart from localStorage or empty array
    return JSON.parse(localStorage.getItem("guestCart")) || [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  // Fetch cart from backend if logged in
  useEffect(() => {
    if (!userId) {
      // guest: load cart from localStorage (already done in useState)
      setLoading(false);
      setError(null);
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/cart/${userId}`, config);
        setCartItems(data.items || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // Save guest cart to localStorage helper
  const saveGuestCart = (items) => {
    localStorage.setItem("guestCart", JSON.stringify(items));
  };

  // Add or update product in cart
  const addToCart = async (product, quantity = 1) => {
    if (userId) {
      // Logged in: call backend API
      try {
        setLoading(true);
        await api.post(`/cart/${userId}`, { productId: product._id, quantity }, config);
        const { data } = await api.get(`/cart/${userId}`, config);
        setCartItems(data.items || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Guest: update localStorage cart
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.product._id === product._id);
        let newCart;
        if (existingIndex >= 0) {
          newCart = [...prev];
          newCart[existingIndex].quantity += quantity;
        } else {
          newCart = [...prev, { product, quantity }];
        }
        saveGuestCart(newCart);
        return newCart;
      });
    }
  };

  // Update quantity of a product in cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    if (userId) {
      try {
        setLoading(true);
        await api.post(`/cart/${userId}`, { productId, quantity }, config);
        const { data } = await api.get(`/cart/${userId}`, config);
        setCartItems(data.items || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems((prev) => {
        const newCart = prev.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        );
        saveGuestCart(newCart);
        return newCart;
      });
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (userId) {
      try {
        setLoading(true);
        await api.patch(`/cart/${userId}/remove`, { productId }, config);
        const { data } = await api.get(`/cart/${userId}`, config);
        setCartItems(data.items || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems((prev) => {
        const newCart = prev.filter((item) => item.product._id !== productId);
        saveGuestCart(newCart);
        return newCart;
      });
    }
  };

  // Calculate total price of cart items
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
