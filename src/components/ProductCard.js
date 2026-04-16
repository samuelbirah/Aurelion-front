import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product, compact = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Produit en rupture de stock');
      return;
    }
    addToCart(product);
    toast.success('Ajouté au panier', {
      description: product.name,
    });
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#1A1A1A] rounded-[24px] overflow-hidden border border-white/5 shadow-sm min-w-[280px] snap-start"
        data-testid={`product-card-${product.id}`}
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-serif font-medium text-lg text-white mb-1">
            {product.name}
          </h3>
          <p className="text-[#D4AF37] text-xl font-semibold mb-2">
            {product.price.toFixed(2)} €
          </p>
          <p className="text-gray-400 text-xs mb-3">
            {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full py-3 px-4 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(212,175,55,0.25)]"
            data-testid={`add-to-cart-btn-${product.id}`}
          >
            Ajouter
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1A1A1A] rounded-[24px] overflow-hidden border border-white/5 shadow-sm"
      data-testid={`product-card-${product.id}`}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif font-medium text-2xl text-white mb-2">
          {product.name}
        </h3>
        <p className="text-[#D4AF37] text-2xl font-semibold mb-3">
          {product.price.toFixed(2)} €
        </p>
        <p className="text-gray-400 text-sm mb-4">
          {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="w-full py-4 px-6 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans text-lg shadow-[0_4px_14px_rgba(212,175,55,0.25)]"
          data-testid={`add-to-cart-btn-${product.id}`}
        >
          Ajouter au panier
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
