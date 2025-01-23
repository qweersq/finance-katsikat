import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGeneral } from '../hooks/useGeneral';

const ProtectedRoute = () => {
  const { isAuthenticated } = useGeneral();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
