import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <nav className={styles.sidebar}>
      <h2>管理菜单</h2>
      <ul>
        <li><Link to="/admin">仪表盘</Link></li>
        <li><Link to="/admin/users">用户管理</Link></li>
        <li><Link to="/admin/articles">文章管理</Link></li>
        <li><Link to="/admin/categories">分类管理</Link></li>
        <li><Link to="/admin/tags">标签管理</Link></li>
        <li><Link to="/admin/comments">评论管理</Link></li>
        <li><Link to="/admin/files">文件管理</Link></li>
        <li><Link to="/admin/links">链接管理</Link></li>
        <li><Link to="/admin/settings">系统设置</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
