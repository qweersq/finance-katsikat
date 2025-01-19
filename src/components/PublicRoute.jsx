import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = localStorage.getItem('token'); // Check if the token exists
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
