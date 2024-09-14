import React from 'react';
import { Layout, Menu } from 'antd';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  FileOutlined,
  TagOutlined,
  CommentOutlined,
  DashboardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Dashboard from '../pages/admin/Dashboard';
import ArticleManagement from '../pages/admin/ArticleManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import TagManagement from '../pages/admin/TagManagement';
import UserManagement from '../pages/admin/UserManagement';
import { useAuth } from '../contexts/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
          <Menu.Item key="/admin" icon={<DashboardOutlined />}>
            <Link to="/admin">仪表盘</Link>
          </Menu.Item>
          <Menu.Item key="/admin/articles" icon={<FileOutlined />}>
            <Link to="/admin/articles">文章管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/categories" icon={<TagOutlined />}>
            <Link to="/admin/categories">分类管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/tags" icon={<TagOutlined />}>
            <Link to="/admin/tags">标签管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/users" icon={<UserOutlined />}>
            <Link to="/admin/users">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            退出登录
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/articles" element={<ArticleManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/tags" element={<TagManagement />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Blog Admin ©2023 Created by Your Name</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
