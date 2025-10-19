// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';
import { saveToken, getToken, removeToken } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // { id, name, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // try to load existing token & user (optional backend /auth/me)
    const init = async () => {
      const token = await getToken();
      if (!token) { setLoading(false); return; }
      try {
        // optional: call backend to get user info if you have /auth/me
        // we'll decode minimal info from backend responses during login/register
        setLoading(false);
      } catch (err) {
        await removeToken();
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data?.token) {
      await saveToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } else {
      return { success: false, error: res.data?.error || 'Login failed' };
    }
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
  };

  const register = async (name, email, password, role='PLAYER') => {
    const res = await api.post('/auth/register', { name, email, password, role });
    // register returns message (verification email); do not auto-login until verified
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
