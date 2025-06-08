import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { authApi } from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authority, setAuthority] = useState(sessionStorage.getItem('authority'));
  const isAuthenticated = !!user;
  const hasRole = (role) =>{
    return user?.authority === role;
  }
  

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      sessionStorage.setItem('authority',response.data.authority);
      setToken(token);
      setAuthority(response.data.authority);
      
      // Decode token to get authority and ensure it's a string
      const decodedToken = jwtDecode(token);
      const authority = (response.data.authority || 'USER').toString();
      
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

  // useEffect(() => {
  //   if (token) {
  //     setUser(jwtDecode(token));
  //   }
  // }, [token]);

  useEffect(() => {
  if (token) {
    try {
      console.log("this is authority :", authority);
      console.log("this is token :", token);
      const decoded = jwtDecode(token);
      setUser({
        ...decoded,
        authority,
        isAuthenticated: true
      });
    } catch (err) {
      console.error('Token decoding failed:', err);
      setUser(null);
    }
  } else {
    setUser(null);
  }
}, [token]);


  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      changePassword,
      isAuthenticated,
      hasRole,
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
