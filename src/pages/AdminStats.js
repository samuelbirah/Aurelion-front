import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminStats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_orders: 0,
    total_revenue: 0,
    popular_products: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/admin/stats`, {
        withCredentials: true
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/admin-login');
      } else {
        toast.error('Erreur lors du chargement des statistiques');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B] pb-24" data-testid="admin-stats-page">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full max-w-md z-50 flex items-center gap-4 px-6 py-4 glass-effect border-b border-white/5"
      >
        <button
          onClick={() => navigate('/admin')}
          className="p-2 rounded-full bg-[#1A1A1A] text-white border border-white/10 active:scale-95 transition-transform"
          data-testid="back-btn"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-light tracking-tight text-white font-serif">
          Statistiques
        </h1>
      </motion.header>

      <div className="pt-24 px-6">
        {loading ? (
          <div className="flex justify-center items-center py-20" data-testid="loading-indicator">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/5"
              data-testid="total-orders-card"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-full bg-[#D4AF37]/10">
                  <ShoppingBag size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">Total commandes</p>
                  <p className="text-3xl font-bold text-white font-serif" data-testid="total-orders">
                    {stats.total_orders}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/5"
              data-testid="total-revenue-card"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-full bg-[#D4AF37]/10">
                  <TrendingUp size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">Chiffre d'affaires</p>
                  <p className="text-3xl font-bold text-[#D4AF37] font-serif" data-testid="total-revenue">
                    {stats.total_revenue.toFixed(2)} €
                  </p>
                </div>
              </div>
            </motion.div>

            {stats.popular_products.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/5"
                data-testid="popular-products-card"
              >
                <h3 className="text-xl font-serif text-white mb-4">Produits populaires</h3>
                <div className="space-y-3">
                  {stats.popular_products.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#0B0B0B] rounded-lg p-3"
                      data-testid={`popular-product-${index}`}
                    >
                      <span className="text-white">{product.name}</span>
                      <span className="text-[#D4AF37] font-semibold">
                        {product.quantity} ventes
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
