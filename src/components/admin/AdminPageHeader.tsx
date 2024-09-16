import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from '../../styles/AdminPageHeader.module.css';

interface AdminPageHeaderProps {
  title: string;
  collapsed: boolean;
  toggle: () => void;
}

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({ title, collapsed, toggle }) => {
  return (
    <div className={styles.adminPageHeader}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: styles.trigger,
        onClick: toggle,
      })}
      <h1>{title}</h1>
    </div>
  );
};

export default AdminPageHeader;
