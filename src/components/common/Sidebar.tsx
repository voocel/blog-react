import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  DashboardOutlined,
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

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={`${styles.sidebar} ${className || ''}`}>
      <div className={styles.userInfo}>
        <img src="/path-to-avatar.jpg" alt="User Avatar" className={styles.avatar} />
        <div className={styles.userName}>voocel</div>
        <div className={styles.userEmail}>voocel@163.com</div>
      </div>
      <div className={styles.userLinks}>
        <a href="#"><HomeOutlined /></a>
        <a href="#"><UserOutlined /></a>
        <a href="#"><SettingOutlined /></a>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
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
    </div>
  );
};

export default Sidebar;
