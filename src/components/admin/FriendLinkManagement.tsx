import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import FriendLinkCreate from './FriendLinkCreate';
import FriendLinkEdit from './FriendLinkEdit';
import ConfirmDialog from '../ui/ConfirmDialog';
import LoadingSpinner from '../ui/LoadingSpinner';
import { FriendLink } from '../../types/api';
import { FriendLinkService } from '../../services/friendLinkService';
import { useManagement } from '../../hooks/useManagement';

const FriendLinkManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedFriendLink, setSelectedFriendLink] = useState<FriendLink | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    friendLink: FriendLink | null;
  }>({
    isOpen: false,
    friendLink: null
  });

  const {
    data: friendLinks,
    loading,
    error,
    currentPage,
    totalPages,
    deleteItem,
    handlePageChange,
    refreshData
  } = useManagement<FriendLink>({
    fetchData: FriendLinkService.getFriendLinks,
    deleteData: FriendLinkService.deleteFriendLink,
    errorMessage: '获取友链列表失败',
    deleteErrorMessage: '删除友链失败'
  });

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (friendLink: FriendLink) => {
    setSelectedFriendLink(friendLink);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedFriendLink(null);
    refreshData();
  };

  const handleDeleteClick = (friendLink: FriendLink) => {
    setDeleteDialog({
      isOpen: true,
      friendLink: friendLink
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.friendLink) {
      await deleteItem(deleteDialog.friendLink);
      setDeleteDialog({ isOpen: false, friendLink: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, friendLink: null });
  };

  // 如果是创建页面，显示创建组件
  if (currentView === 'create') {
    return <FriendLinkCreate onBack={handleBackToList} />;
  }

  // 如果是编辑页面，显示编辑组件
  if (currentView === 'edit' && selectedFriendLink) {
    return <FriendLinkEdit friendLink={selectedFriendLink} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">友链列表</h2>
        <button 
          onClick={handleCreateClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>创建</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">图片</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名字</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">链接</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">是否启用</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {friendLinks.map((friendLink) => (
              <tr key={friendLink.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {friendLink.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={friendLink.logo} 
                    alt={friendLink.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {friendLink.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <a href={friendLink.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                    {friendLink.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${friendLink.isActive ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-900">
                      {friendLink.isActive ? '是' : '否'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {friendLink.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditClick(friendLink)}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(friendLink)}
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

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          ←
        </button>
        {[1].map((page) => (
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
        <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          →
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="删除友链"
        message={`确定要删除友链 "${deleteDialog.friendLink?.name}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
};

export default FriendLinkManagement;