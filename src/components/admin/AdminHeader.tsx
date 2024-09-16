import React from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from '../../styles/AdminHeader.module.css';

const { Header } = Layout;

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ collapsed, onToggle }) => {
  return (
    <Header className={styles.adminHeader}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        className={styles.trigger}
      />
      {/* 可以在这里添加其他头部内容，如标题、用户信息等 */}
    </Header>
  );
};

export default AdminHeader;
