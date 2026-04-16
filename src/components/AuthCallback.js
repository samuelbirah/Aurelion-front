import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSessionToken } = useAuth();

  useEffect(() => {
    const hash = location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('session_token');

    if (token) {
      setSessionToken(token);
      navigate('/admin', { replace: true });
    } else {
      navigate('/admin-login', { replace: true });
    }
  }, [location, navigate, setSessionToken]);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#0B0B0B] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37] mx-auto mb-4"></div>
        <p className="text-white text-lg">Finalisation de la connexion...</p>
      </div>
    </div>
  );
};

export default AuthCallback;