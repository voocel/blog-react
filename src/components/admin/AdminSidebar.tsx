import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  MessageCircle, 
  Settings, 
  Tag, 
  BarChart3, 
  Shield, 
  Globe,
  Layers,
  MessageSquare,
  FolderOpen,
  Folder
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: BarChart3, label: '面板', path: '/admin' },
    { icon: Users, label: '用户管理', path: '/admin/users' },
    { icon: FileText, label: '文章管理', path: '/admin/articles' },
    { icon: MessageSquare, label: '讨论管理', path: '/admin/discussions' },
    { icon: MessageCircle, label: '评论管理', path: '/admin/comments' },
    { icon: FolderOpen, label: '文件管理', path: '/admin/files' },
    { icon: Tag, label: '标签管理', path: '/admin/tags' },
    { icon: Folder, label: '分类管理', path: '/admin/categories' },
    { icon: Shield, label: '友链管理', path: '/admin/friendlinks' },
    { icon: Globe, label: '访问统计', path: '/admin/statistics' },
    { icon: Layers, label: '系统配置', path: '/admin/settings' }
  ];

  // 改进路由匹配逻辑，支持子路由
  const isActiveRoute = (itemPath: string) => {
    if (itemPath === '/admin') {
      // 对于面板路由，只有完全匹配才算激活
      return location.pathname === '/admin';
    }
    // 对于其他路由，支持子路径匹配
    return location.pathname.startsWith(itemPath);
  };

  // 直接导航到目标路径，不管当前在什么页面
  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleProfileCenterClick = () => {
    navigate('/profile');
  };

  const handleProfileSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-700 text-white transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-0 overflow-hidden'
    }`}>
      <div className="p-6 border-b border-slate-600">
        <div className="flex justify-center mb-3">
          <div className="avatar-container">
            <img 
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100" 
              alt="Admin Avatar" 
              className="w-16 h-16 rounded-full object-cover avatar-image"
            />
          </div>
        </div>
        
        <div className="text-center mb-2">
          <h3 className="font-medium text-white">voocel</h3>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-sm text-slate-300">admin@163.com</p>
        </div>
        
        <div className="flex justify-center items-center space-x-6 text-slate-300">
          <Home 
            className="w-5 h-5 cursor-pointer hover:text-white transition-colors" 
            onClick={handleHomeClick}
            title="返回首页"
          />
          <Users 
            className="w-5 h-5 cursor-pointer hover:text-white transition-colors" 
            onClick={handleProfileCenterClick}
            title="个人中心"
          />
          <Settings 
            className="w-5 h-5 cursor-pointer hover:text-white transition-colors" 
            onClick={handleProfileSettingsClick}
            title="个人设置"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="py-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.path);
          
          return (
            <button
              key={index}
              onClick={() => handleItemClick(item.path)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                isActive 
                  ? 'bg-slate-600 text-white border-r-2 border-blue-400' 
                  : 'text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;