import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || 'f91c70d8-1472-4343-a292-8fa2aeec0db4';
const WEB3FORMS_API_URL = process.env.REACT_APP_WEB3FORMS_API_URL || 'https://api.web3forms.com/submit';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    setLoading(true);

    try {
      // 1. Save order to backend
      const orderData = {
        client_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        products: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: getTotal(),
      };

      await axios.post(`${API}/orders`, orderData);

      // 2. Send email via Web3Forms
      const productsText = cart
        .map(item => `• ${item.name} x${item.quantity}`)
        .join('\n');

      const emailMessage = `Nouvelle commande AURÉLION\n\nNom : ${formData.name}\nEmail : ${formData.email}\nTéléphone : ${formData.phone}\nAdresse : ${formData.address}\nVille : ${formData.city}\n\nProduits :\n${productsText}\n\nTotal : ${getTotal().toFixed(2)} €`;

      const web3formsData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Nouvelle commande AURÉLION',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        message: emailMessage,
      };

      const emailResponse = await axios.post(WEB3FORMS_API_URL, web3formsData);

      if (emailResponse.data.success) {
        toast.success('Commande envoyée avec succès');
        clearCart();
        
        // Redirect to home after success
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Échec de l\'envoi de l\'email');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Erreur lors de l\'envoi de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B] pb-32" data-testid="checkout-page">
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
        <h1 className="text-2xl font-light tracking-tight text-white font-serif" data-testid="checkout-title">
          Finaliser la commande
        </h1>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 px-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="checkout-form">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-sans">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans text-base"
              data-testid="name-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-sans">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans text-base"
              data-testid="email-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-sans">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+243 xxx xxx xxx"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans text-base"
              data-testid="phone-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-sans">
              Adresse
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Votre adresse complète"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans text-base"
              data-testid="address-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-sans">
              Ville
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Votre ville"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-sans text-base"
              data-testid="city-input"
            />
          </div>

          <div className="bg-[#1A1A1A] rounded-[20px] p-6 border border-white/5 mt-6">
            <h3 className="text-xl font-serif text-white mb-4">Résumé de la commande</h3>
            <div className="space-y-2 mb-4" data-testid="order-summary">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-300">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-lg text-gray-400">Total</span>
              <span className="text-2xl font-bold text-[#D4AF37] font-serif" data-testid="order-total">
                {getTotal().toFixed(2)} €
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(212,175,55,0.35)] font-sans text-lg mt-6"
            data-testid="submit-order-btn"
          >
            {loading ? 'Envoi en cours...' : 'Valider la commande'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Checkout;
