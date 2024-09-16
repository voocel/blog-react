import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {publicRoutes}
      <Route element={<PrivateRoute />}>{adminRoutes}</Route>
    </Routes>
  );
};

export default AppRoutes;
