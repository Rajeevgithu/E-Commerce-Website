import { useEffect, useState } from "react";
import api from "../api/axios";

export const useProductNames = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  return products;
};
