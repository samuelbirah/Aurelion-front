import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full max-w-md z-50 flex justify-between items-center px-6 py-4 glass-effect border-b border-white/5"
      data-testid="header"
    >
      <button
        onClick={() => navigate('/')}
        className="text-2xl font-light tracking-[0.3em] text-[#D4AF37] font-serif"
        data-testid="logo-btn"
      >
        AURÉLION
      </button>
      
      <button
        onClick={() => navigate('/cart')}
        className="relative p-3 rounded-full bg-[#1A1A1A] text-white border border-white/10 active:scale-95 transition-transform"
        data-testid="cart-btn"
      >
        <ShoppingCart size={20} />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            data-testid="cart-count"
          >
            {itemCount}
          </motion.span>
        )}
      </button>
    </motion.header>
  );
};

export default Header;
