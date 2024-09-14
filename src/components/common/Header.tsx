import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useAuth } from '../../contexts/AuthContext';  // 修改这一行

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 'home',
      label: <Link to="/">首页</Link>,
    },
    user
      ? [
          {
            key: 'dashboard',
            label: <Link to="/admin/dashboard">仪表板</Link>,
          },
          {
            key: 'logout',
            label: '登出',
            onClick: handleLogout,
          },
        ]
      : {
          key: 'login',
          label: <Link to="/login">登录</Link>,
        },
  ].flat();

  return <Menu mode="horizontal" items={items} />;
};

export default Header;
