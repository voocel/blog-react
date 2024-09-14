import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/blog/Home';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
// 导入其他需要的页面组件

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      {/* 添加其他路由 */}
    </Routes>
  );
};

export default AppRoutes;