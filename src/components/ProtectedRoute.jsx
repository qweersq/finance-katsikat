import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Check if the token exists
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
