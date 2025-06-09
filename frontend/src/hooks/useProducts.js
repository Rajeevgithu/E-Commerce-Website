import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useProducts = (initialSearch = '', initialCategory = 'all') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {};
        if (search) params.search = search;
        if (category && category !== 'all') params.category = category;

        const response = await api.get('/products', { params });
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  return {
    products,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
  };
};
