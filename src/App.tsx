import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Home from './pages/blog/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Routes>
      {/* 博客首页路由 */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 管理后台路由 */}
      <Route path="/admin" element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* 在这里添加其他管理后台页面的路由 */}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
