import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const menuItems = [
    {
      title: 'Produits',
      description: 'Gérer les parfums',
      icon: Package,
      path: '/admin/products',
      testId: 'admin-products-link',
    },
    {
      title: 'Commandes',
      description: 'Voir les commandes',
      icon: ShoppingBag,
      path: '/admin/orders',
      testId: 'admin-orders-link',
    },
    {
      title: 'Statistiques',
      description: 'Analyses et rapports',
      icon: BarChart3,
      path: '/admin/stats',
      testId: 'admin-stats-link',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B]" data-testid="admin-page">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="px-6 py-8"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-white font-serif mb-2" data-testid="admin-title">
              Administration
            </h1>
            <p className="text-gray-400 font-sans">AURÉLION</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-3 rounded-full bg-[#1A1A1A] text-gray-400 hover:text-white border border-white/10 active:scale-95 transition-all flex items-center gap-2"
            data-testid="logout-btn"
          >
            <LogOut size={20} />
          </button>
        </div>
        {user && (
          <div className="mt-4 text-sm text-gray-400">
            Connecté en tant que : <span className="text-[#D4AF37]">{user.email}</span>
          </div>
        )}
      </motion.header>

      <div className="px-6 space-y-4">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(item.path)}
            className="w-full bg-[#1A1A1A] rounded-[20px] p-6 border border-white/5 flex items-center gap-4 active:scale-[0.98] transition-transform text-left"
            data-testid={item.testId}
          >
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <item.icon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-serif text-white mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          </motion.button>
        ))}
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/')}
          className="w-full py-4 px-6 bg-transparent text-white border border-white/20 rounded-full transition-all duration-300 active:scale-95 hover:border-[#D4AF37] font-sans text-lg mt-6"
          data-testid="back-to-store-btn"
        >
          Retour à la boutique
        </motion.button>
      </div>
    </div>
  );
};

export default Admin;
