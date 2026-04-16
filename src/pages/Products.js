import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B]" data-testid="products-page">
      <Header />
      
      <div className="pt-24 pb-6 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-light tracking-tight text-white font-serif mb-8"
          data-testid="products-title"
        >
          Nos Parfums
        </motion.h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-20" data-testid="loading-indicator">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20" data-testid="no-products">
            <p className="text-gray-400 text-lg">Aucun produit disponible</p>
          </div>
        ) : (
          <div className="gap-6 flex flex-col" data-testid="products-list">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
