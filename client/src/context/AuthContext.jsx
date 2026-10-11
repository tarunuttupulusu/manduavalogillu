import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ml_token') || null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  useEffect(() => {
    async function checkAuth() {
      if (token) {
        try {
          const res = await api.getProfile();
          setUser(res.user);
        } catch (err) {
          console.warn('Session expired or invalid token:', err.message);
          logout();
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    localStorage.setItem('ml_token', res.token);
    setToken(res.token);
    setUser(res.user);
    closeAuthModal();
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    localStorage.setItem('ml_token', res.token);
    setToken(res.token);
    setUser(res.user);
    closeAuthModal();
    return res;
  };

  const logout = () => {
    localStorage.removeItem('ml_token');
    setToken(null);
    setUser(null);
  };

  const demoLogin = async (role = 'admin') => {
    if (role === 'admin') {
      return login('admin@manduvalogillu.com', 'password123');
    } else {
      return login('priya@example.com', 'password123');
    }
  };

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    demoLogin,
    isAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    openAuthModal,
    closeAuthModal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
