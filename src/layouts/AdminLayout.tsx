import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { useSidebar } from '../contexts/SidebarContext';
import styles from '../styles/AdminLayout.module.css';

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <Layout className={styles.adminLayout}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <AdminHeader collapsed={collapsed} onToggle={toggleSidebar} />
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
