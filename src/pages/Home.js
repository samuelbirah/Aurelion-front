import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B]" data-testid="home-page">
      <Header />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-20"
        style={{
          backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/9137817e-7100-43b8-bfe5-bc3687e9e848/images/1e16f3f8bb65ebb9d0d0a74f6c105f0b6b42a462d9253a1a715c361798e3fc0f.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/60 via-transparent to-[#0B0B0B]"></div>
        
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-light tracking-tight text-white font-serif mb-6"
            data-testid="hero-title"
          >
            Révélez votre essence
          </motion.h1>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/products')}
            className="px-8 py-4 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028] shadow-[0_4px_14px_rgba(212,175,55,0.35)] font-sans text-lg"
            data-testid="explore-btn"
          >
            Explorer
          </motion.button>
        </div>
      </motion.div>

      {products.length > 0 && (
        <section className="py-10 px-6" data-testid="products-carousel">
          <h2 className="text-2xl sm:text-3xl font-regular tracking-tight text-white font-serif mb-6">
            Notre Collection
          </h2>
          
          <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory no-scrollbar">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
          
          <button
            onClick={() => navigate('/products')}
            className="w-full py-4 px-6 bg-transparent text-white border border-white/20 rounded-full transition-all duration-300 active:scale-95 hover:border-[#D4AF37] flex items-center justify-center gap-2 font-sans text-lg mt-4"
            data-testid="view-all-btn"
          >
            Voir tous les produits
          </button>
        </section>
      )}
    </div>
  );
};

export default Home;
