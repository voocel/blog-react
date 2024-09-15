import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/auth/Login';
import Home from './pages/blog/Home';  // 假设你有一个主页组件

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        {/* 其他管理页面路由 */}
      </Route>
      {/* 添加一个捕获所有的路由，用于处理 404 情况 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
