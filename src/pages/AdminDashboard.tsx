import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverview from '../components/admin/AdminOverview';
import UserManagement from '../components/admin/UserManagement';
import ArticleManagement from '../components/admin/ArticleManagement';
import DiscussionManagement from '../components/admin/DiscussionManagement';
import CommentManagement from '../components/admin/CommentManagement';
import TagManagement from '../components/admin/TagManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import FriendLinkManagement from '../components/admin/FriendLinkManagement';
import VisitorStatistics from '../components/admin/VisitorStatistics';
import SystemConfiguration from '../components/admin/SystemConfiguration';
import FileManagement from '../components/admin/FileManagement';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 检查是否在编辑页面
  const isInEditMode = () => {
    const editPaths = ['/create', '/edit'];
    return editPaths.some(path => location.pathname.includes(path));
  };

  // 如果在编辑模式，强制显示侧边栏
  React.useEffect(() => {
    if (isInEditMode()) {
      setSidebarOpen(true);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <AdminHeader onToggleSidebar={toggleSidebar} />
        
        {/* Dashboard Content */}
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/users/*" element={<UserManagement />} />
          <Route path="/articles/*" element={<ArticleManagement />} />
          <Route path="/discussions/*" element={<DiscussionManagement />} />
          <Route path="/comments/*" element={<CommentManagement />} />
          <Route path="/files/*" element={<FileManagement />} />
          <Route path="/tags/*" element={<TagManagement />} />
          <Route path="/categories/*" element={<CategoryManagement />} />
          <Route path="/friendlinks/*" element={<FriendLinkManagement />} />
          <Route path="/statistics" element={<VisitorStatistics />} />
          <Route path="/settings" element={<SystemConfiguration />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;