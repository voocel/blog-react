import React from 'react';
import { Menu } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">管理员后台</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">欢迎回来，管理员</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;