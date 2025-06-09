import { useState, useEffect } from "react";
import api from "../api/axios"; // your axios instance with baseURL

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userId = user?._id;
  const token = user?.token;

  // Helper to save guest cart to localStorage
  const saveGuestCart = (items) => {
    localStorage.setItem("guestCart", JSON.stringify(items));
  };

  // Load cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (userId) {
          // Logged in: fetch cart from backend
          const { data } = await api.get(`/cart/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(data.items || []);
        } else {
          // Guest: load cart from localStorage
          const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          setCartItems(guestCart);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, token]);

  // Add or update an item in the cart
  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true);
      if (userId) {
        // Logged in: send API request
        await api.post(
          `/cart/${userId}`,
          { productId: product._id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Refresh cart after adding
        const { data } = await api.get(`/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(data.items || []);
      } else {
        // Guest: update cart in localStorage
        setCartItems((prevItems) => {
          const existing = prevItems.find(
            (item) => item.product._id === product._id
          );
          let updatedCart;
          if (existing) {
            updatedCart = prevItems.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            updatedCart = [...prevItems, { product, quantity }];
          }
          saveGuestCart(updatedCart);
          return updatedCart;
        });
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity for a product
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    if (userId) {
      // API call to update quantity for logged-in user
      try {
        setLoading(true);
        await api.put(
          `/cart/${userId}`,
          { productId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { data } = await api.get(`/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Guest: update localStorage
      setCartItems((prevItems) => {
        const updatedCart = prevItems.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        );
        saveGuestCart(updatedCart);
        return updatedCart;
      });
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (userId) {
      // API call to remove for logged-in user
      try {
        setLoading(true);
        await api.delete(`/cart/${userId}/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { data } = await api.get(`/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Guest: remove from localStorage
      setCartItems((prevItems) => {
        const updatedCart = prevItems.filter(
          (item) => item.product._id !== productId
        );
        saveGuestCart(updatedCart);
        return updatedCart;
      });
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
  };
};
