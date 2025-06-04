import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // make sure to install: npm install jwt-decode
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateSession = () => {
      const token = localStorage.getItem('token');
      const authority = localStorage.getItem('authority');

      if (token && authority) {
        try {
          const decoded = jwtDecode(token);
          const userData = {
            ...decoded,
            token,
            authority,
          };
          setUser(userData);
        } catch (err) {
          console.error('Invalid token', err);
          localStorage.removeItem('token');
          localStorage.removeItem('authority');
        }
      }

      setLoading(false);
    };

    validateSession();
  }, []);

  const login = async (credentials) => {
    try {
      const { token, authority } = await authService.login(credentials);
      const decoded = jwtDecode(token);
      const user = {
        ...decoded,
        token,
        authority,
      };
      setUser(user);
      setError(null);
      localStorage.setItem('token', token);
      localStorage.setItem('authority', authority);
      if (authority === 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (authority === 'user') {
        window.location.href = '/user/home';
      } else {
        window.location.href = '/';
      }
      return user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    authService.logout(); // optional: you can clear token server-side if needed
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('authority');
  };

  const hasRole = (role) => {
    return user?.authority === role;
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
