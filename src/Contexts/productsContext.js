import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/utility";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/products/featured`);
      if (!unmounted) {
        setFeaturedProducts(data.products);
        setLoading(false);
      }
    })();
    (async () => {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/products/categories`);
      if (!unmounted) {
        setCategories(data.categories);
        setLoading(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, featuredProducts, categories, loading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
