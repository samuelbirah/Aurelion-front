import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B] pb-32" data-testid="cart-page">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full max-w-md z-50 flex items-center gap-4 px-6 py-4 glass-effect border-b border-white/5"
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-[#1A1A1A] text-white border border-white/10 active:scale-95 transition-transform"
          data-testid="back-btn"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-light tracking-tight text-white font-serif" data-testid="cart-title">
          Panier
        </h1>
      </motion.header>

      <div className="pt-24 px-6">
        {cart.length === 0 ? (
          <div className="text-center py-20" data-testid="empty-cart">
            <p className="text-gray-400 text-lg mb-6">Votre panier est vide</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028]"
              data-testid="shop-now-btn"
            >
              Commencer vos achats
            </button>
          </div>
        ) : (
          <div className="space-y-4" data-testid="cart-items">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#1A1A1A] rounded-[20px] p-4 border border-white/5 flex gap-4"
                data-testid={`cart-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-white mb-1" data-testid={`cart-item-name-${item.id}`}>
                    {item.name}
                  </h3>
                  <p className="text-[#D4AF37] text-lg font-semibold mb-2" data-testid={`cart-item-price-${item.id}`}>
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 rounded-full bg-[#0B0B0B] text-white border border-white/10 active:scale-95 transition-transform"
                      data-testid={`decrease-qty-${item.id}`}
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="text-white font-medium min-w-[24px] text-center" data-testid={`cart-item-quantity-${item.id}`}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 rounded-full bg-[#0B0B0B] text-white border border-white/10 active:scale-95 transition-transform"
                      data-testid={`increase-qty-${item.id}`}
                    >
                      <Plus size={16} />
                    </button>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto p-1.5 rounded-full bg-red-500/20 text-red-400 active:scale-95 transition-transform"
                      data-testid={`remove-item-${item.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 w-full max-w-md p-6 glass-effect border-t border-white/10 z-40"
          data-testid="cart-footer"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-lg">Total</span>
            <span className="text-[#D4AF37] text-3xl font-bold font-serif" data-testid="cart-total">
              {getTotal().toFixed(2)} €
            </span>
          </div>
          
          <button
            onClick={handleCheckout}
            className="w-full py-4 px-6 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028] shadow-[0_4px_14px_rgba(212,175,55,0.35)] font-sans text-lg"
            data-testid="checkout-btn"
          >
            Commander
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
