import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';;
const API = `${BACKEND_URL}/api`;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionToken, setSessionTokenState] = useState(() => {
    return localStorage.getItem('session_token');
  });

  const setSessionToken = (token) => {
    if (token) {
      localStorage.setItem('session_token', token);
      setSessionTokenState(token);
    } else {
      localStorage.removeItem('session_token');
      setSessionTokenState(null);
    }
  };

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('session_token');
      setSessionTokenState(null);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${sessionToken}` }
      });
    } catch (e) {}
    localStorage.removeItem('session_token');
    setSessionTokenState(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Appel checkAuth au montage
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Mettre à jour l'intercepteur Axios pour inclure le token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('session_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login: () => {
          window.location.href = `${BACKEND_URL}/api/auth/google/login`;
        },
        logout,
        checkAuth,
        setSessionToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
