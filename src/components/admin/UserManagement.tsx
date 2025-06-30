import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import ConfirmDialog from '../ui/ConfirmDialog';

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  createdAt: string;
  nickname?: string;
  website?: string;
  description?: string;
}

const UserManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null
  });
  
  const [users, setUsers] = useState<User[]>([
    {
      id: 4670,
      username: 'IoASgprabVHuFSc',
      email: 'dorothyvi_hartgo@outlook.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'active',
      createdAt: '2024-09-12 12:48:29',
      nickname: 'Dorothy',
      website: 'https://example.com',
      description: '这是一个用户描述'
    },
    // ... 更多用户数据
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-purple-500',
      'bg-pink-500', 
      'bg-green-500',
      'bg-indigo-500',
      'bg-gray-700',
      'bg-purple-400',
      'bg-yellow-400',
      'bg-purple-600',
      'bg-teal-500',
      'bg-pink-400'
    ];
    return colors[index % colors.length];
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setCurrentView('edit');
  };

  const handleDeleteClick = (user: User) => {
    setDeleteDialog({
      isOpen: true,
      user: user
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.user) {
      setUsers(users.filter(user => user.id !== deleteDialog.user!.id));
      setDeleteDialog({ isOpen: false, user: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, user: null });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUser(null);
  };

  if (currentView === 'create') {
    return <UserCreate onBack={handleBackToList} />;
  }

  if (currentView === 'edit' && selectedUser) {
    return <UserEdit user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">用户列表</h2>
        <button 
          onClick={handleCreateClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>创建</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">头像</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱地址</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-lg ${getAvatarColor(index)} flex items-center justify-center`}>
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                      <div className={`w-4 h-4 ${getAvatarColor(index)} rounded-sm`}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                    {user.status === 'active' ? '活跃' : '非活跃'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditClick(user)}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(user)}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="删除用户"
        message={`确定要删除用户 "${deleteDialog.user?.username}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
};

export default UserManagement;