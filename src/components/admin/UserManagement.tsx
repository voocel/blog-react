import React, { useState } from 'react';
import { Edit, Trash2, Plus, Users } from 'lucide-react';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import ConfirmDialog from '../ui/ConfirmDialog';
import { UserService } from '../../services/userService';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useManagement } from '../../hooks/useManagement';
import { User } from '../../types/api';

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

  const {
    data: users,
    loading,
    error,
    currentPage,
    totalPages,
    deleteItem,
    handlePageChange,
    refreshData
  } = useManagement<User>({
    fetchData: UserService.getUsers,
    deleteData: UserService.deleteUser,
    errorMessage: '获取用户列表失败',
    deleteErrorMessage: '删除用户失败'
  });

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

  const handleDeleteConfirm = async () => {
    if (deleteDialog.user) {
      await deleteItem(deleteDialog.user);
      setDeleteDialog({ isOpen: false, user: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, user: null });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUser(null);
    refreshData();
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

      {/* 错误提示 */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={refreshData}
            className="text-red-700 underline hover:no-underline mt-2"
          >
            重试
          </button>
        </div>
      )}

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
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <Users className="w-12 h-12 text-gray-300" />
                    <p>暂无用户数据</p>
                    <p className="text-sm">点击上方"创建"按钮开始创建第一个用户</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button 
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-slate-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          →
        </button>
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