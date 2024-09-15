import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import styles from '../styles/AdminLayout.module.css';

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout className={styles.adminLayout}>
      <Sidebar />
      <Layout className={styles.mainLayout}>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
