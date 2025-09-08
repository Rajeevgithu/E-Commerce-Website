import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { products, loading, error, setProducts } = useProducts();
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  if (!user || user.role !== 'admin') {
    return <p className="text-center text-red-500 mt-10">Access denied.</p>;
  }

  const handleDelete = async (productId) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      setDeletingId(productId);
      setDeleteError(null);
      await axios.delete(`${import.meta.env.VITE_API_URL || 'https://e-commerce-website-1-lmr9.onrender.com'}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Remove deleted product from state for instant UI update
      setProducts(prev => prev.filter(product => product._id !== productId));
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Link
        to="/admin/add-product"
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded mb-6 inline-block transition"
      >
        ➕ Add Product
      </Link>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {deleteError && <p className="text-red-600 mb-4">{deleteError}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}

          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-md p-4 shadow hover:shadow-lg transition flex flex-col"
            >
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="mb-2 text-sm text-gray-700">Category: {product.category}</p>

              <div className="mt-auto flex gap-4">
                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  disabled={deletingId === product._id}
                  className={`text-red-600 hover:text-red-800 underline disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {deletingId === product._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
