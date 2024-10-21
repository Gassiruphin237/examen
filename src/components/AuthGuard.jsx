import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthGuard;
