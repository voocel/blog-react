import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  console.log('PrivateRoute: isAuthenticated =', isAuthenticated, 'user =', user); // 添加这行来调试

  if (!isAuthenticated || !user || user.role !== 1) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
