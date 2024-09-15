import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar'; 

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
