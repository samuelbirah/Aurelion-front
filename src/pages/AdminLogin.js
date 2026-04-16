import React from 'react';
import { motion } from 'framer-motion';
import { Shield, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AdminLogin = () => {
  const { login } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
            <Shield size={32} className="text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl font-light tracking-tight text-white font-serif mb-2">
            Administration
          </h1>
          <p className="text-2xl font-light tracking-[0.3em] text-[#D4AF37] font-serif mb-6">
            AURÉLION
          </p>
          <p className="text-gray-400 text-sm">
            Accès réservé aux administrateurs autorisés
          </p>
        </div>

        <div className="bg-[#1A1A1A] rounded-[24px] p-8 border border-white/5">
          <button
            onClick={login}
            className="w-full py-4 px-6 bg-[#D4AF37] text-black font-medium rounded-full transition-all duration-300 active:scale-95 hover:bg-[#C5A028] shadow-[0_4px_14px_rgba(212,175,55,0.35)] flex items-center justify-center gap-3 font-sans text-lg"
            data-testid="google-login-btn"
          >
            <LogIn size={20} />
            Se connecter avec Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Seuls les administrateurs autorisés peuvent accéder à cette section
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
          >
            ← Retour à la boutique
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
