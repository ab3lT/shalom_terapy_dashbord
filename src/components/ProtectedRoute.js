import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  // Check if we have a valid token and user
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (requiredRole) {
    // Convert to uppercase strings for comparison
    const normalizedRole = String(requiredRole).toUpperCase();
    const normalizedAuthority = String(user.authority).toUpperCase();
    
    if (normalizedAuthority !== normalizedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;