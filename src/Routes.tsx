import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import UserManagement from './pages/admin/UserManagement';
import ArticleManagement from './pages/admin/ArticleManagement';

// 导入其他需要的组件

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 其他路由 */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="articles" element={<ArticleManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;