import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DiscussionCreate from './DiscussionCreate';
import DiscussionEdit from './DiscussionEdit';
import ConfirmDialog from '../ui/ConfirmDialog';

interface Discussion {
  id: number;
  username: string;
  title: string;
  status: 'active' | 'inactive';
  createdAt: string;
  content?: string;
  category?: string;
}

const DiscussionManagement: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    discussion: Discussion | null;
  }>({
    isOpen: false,
    discussion: null
  });

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 2,
      username: 'Faye',
      title: '斗地主是否与外观实际服务器?',
      status: 'active',
      createdAt: '2年前'
    },
    {
      id: 1,
      username: 'Ezhil',
      title: 'Modular kitchen Chennai',
      status: 'active',
      createdAt: '7年前',
      content: 'http://blueprintfordesigns.com/modular-kitchen-design-chennai.html',
      category: 'cURL'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    setCurrentView('edit');
  };

  const handleViewClick = (discussion: Discussion) => {
    // 跳转到讨论详情页
    navigate(`/discussions/${discussion.id}`);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDiscussion(null);
  };

  const handleDeleteClick = (discussion: Discussion) => {
    setDeleteDialog({
      isOpen: true,
      discussion: discussion
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.discussion) {
      setDiscussions(discussions.filter(discussion => discussion.id !== deleteDialog.discussion!.id));
      setDeleteDialog({ isOpen: false, discussion: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, discussion: null });
  };

  // 如果是创建页面，显示创建组件
  if (currentView === 'create') {
    return <DiscussionCreate onBack={handleBackToList} />;
  }

  // 如果是编辑页面，显示编辑组件
  if (currentView === 'edit' && selectedDiscussion) {
    return <DiscussionEdit discussion={selectedDiscussion} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">讨论列表</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {discussions.map((discussion) => (
              <tr key={discussion.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {discussion.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {discussion.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-md">
                    {discussion.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-900">
                      {discussion.status === 'active' ? '活跃' : '非活跃'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {discussion.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewClick(discussion)}
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                      title="查看讨论"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditClick(discussion)}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                      title="编辑讨论"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(discussion)}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="删除讨论"
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
        title="删除讨论"
        message={`确定要删除讨论 "${deleteDialog.discussion?.title}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
};

export default DiscussionManagement;