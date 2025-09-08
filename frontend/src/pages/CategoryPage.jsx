import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const categoryMap = {
  'consumables': 'Consumable Items',
  'paint-&-coating': 'Paint & Coating',
  'texttiles-testing-instruments': 'Textiles Testing Instruments',
  'test-chambers': 'Test Chambers',
};

function CategoryPage({ addToCart }) {
  const { pathname } = useLocation();
  const [categoryName, setCategoryName] = useState('');
  const { products, loading, error, setCategory } = useProducts();

  useEffect(() => {
    const slug = pathname.split('/')[1]; // Updated: matches routes like `/consumables`
    const readableCategory = categoryMap[slug] || '';

    setCategoryName(readableCategory);
    setCategory(readableCategory || 'all');
  }, [pathname, setCategory]);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {categoryName || 'All'} Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found for this category.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white flex flex-col"
            >
              <img
                src={(() => {
                  const base = import.meta.env.VITE_API_URL || 'https://e-commerce-website-1-lmr9.onrender.com';
                  const img = product.image;
                  if (!img) return '';
                  if (img.startsWith('http')) return img;
                  const path = img.startsWith('/uploads') || img.includes('/uploads/')
                    ? img.replace(/^\/+/, '')
                    : `uploads/${img.replace(/^\/+/, '')}`;
                  return `${base}/${path}`;
                })()}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500 mt-1">${product.price?.toFixed(2)}</p>
              <button
                onClick={() => addToCart && addToCart(product)}
                className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
