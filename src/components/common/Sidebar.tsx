import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  CommentOutlined,
  FileOutlined,
  TagOutlined,
  FolderOutlined,
  LinkOutlined,
  SettingOutlined
} from '@ant-design/icons';
import styles from '../../styles/Sidebar.module.css';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Home icon clicked'); // 调试日志
    window.location.href = '/';
  };

  return (
    <Sider 
      width={240}
      collapsedWidth={80} 
      collapsed={collapsed} 
      className={`${styles.sidebar} custom-sidebar`}
      trigger={null}
    >
      {/* 移除这里多余的 logo div */}
      <div className={styles.userInfo}>
        <img src="/path-to-avatar.jpg" alt="User Avatar" className={styles.avatar} />
        {!collapsed && (
          <>
            <div className={styles.userName}>voocel</div>
            <div className={styles.userEmail}>voocel@163.com</div>
          </>
        )}
      </div>
      <div className={styles.userLinks}>
        <a href="/" onClick={handleHomeClick}><HomeOutlined /></a>
        <a href="#"><UserOutlined /></a>
        <a href="#"><SettingOutlined /></a>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/admin">面板</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/admin/users">用户管理</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileTextOutlined />}>
          <Link to="/admin/articles">文章管理</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CommentOutlined />}>
          <Link to="/admin/comments">评论管理</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileOutlined />}>
          <Link to="/admin/files">文件管理</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TagOutlined />}>
          <Link to="/admin/tags">标签管理</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<FolderOutlined />}>
          <Link to="/admin/categories">分类管理</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<LinkOutlined />}>
          <Link to="/admin/links">友链管理</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<SettingOutlined />}>
          <Link to="/admin/settings">系统设置</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
