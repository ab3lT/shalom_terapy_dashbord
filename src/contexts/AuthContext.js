import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { authApi } from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      
      // Decode token to get authority and ensure it's a string
      const decodedToken = jwtDecode(token);
      const authority = (decodedToken.authorities && decodedToken.authorities[0]?.authority || 'USER').toString();
      
      setUser({ 
        ...decodedToken,
        authority,
        isAuthenticated: true
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const changePassword = async (data) => {
    try {
      await authApi.changePassword(data);
      return true;
    } catch (error) {
      console.error('Password change error:', error);
      return false;
    }
  };

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      changePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
