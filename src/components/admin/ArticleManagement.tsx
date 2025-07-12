import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../ui/ConfirmDialog';
import ArticleCreate from './ArticleCreate';
import ArticleEdit from './ArticleEdit';
import { ArticleService } from '../../services/articleService';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useManagement } from '../../hooks/useManagement';
import { Article } from '../../types/api';

const ArticleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    article: Article | null;
  }>({
    isOpen: false,
    article: null
  });

  const {
    data: articles,
    loading,
    error,
    currentPage,
    totalPages,
    deleteItem,
    handlePageChange,
    refreshData
  } = useManagement<Article>({
    fetchData: ArticleService.getArticles,
    deleteData: ArticleService.deleteArticle,
    errorMessage: '获取文章列表失败',
    deleteErrorMessage: '删除文章失败'
  });

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('edit');
  };

  const handleViewClick = (article: Article) => {
    // 跳转到文章详情页
    navigate(`/articles/${article.id}`);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedArticle(null);
    refreshData();
  };

  const handleDeleteClick = (article: Article) => {
    setDeleteDialog({
      isOpen: true,
      article: article
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.article) {
      await deleteItem(deleteDialog.article);
      setDeleteDialog({ isOpen: false, article: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, article: null });
  };

  // 如果是创建页面，显示创建组件
  if (currentView === 'create') {
    return <ArticleCreate onBack={handleBackToList} />;
  }

  // 如果是编辑页面，显示编辑组件
  if (currentView === 'edit' && selectedArticle) {
    return <ArticleEdit article={selectedArticle} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">文章列表</h2>
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">副标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">发布时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <FileText className="w-12 h-12 text-gray-300" />
                    <p>暂无文章数据</p>
                    <p className="text-sm">点击上方"创建"按钮开始创建第一篇文章</p>
                  </div>
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {article.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs">
                      {article.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="max-w-md">
                      {article.subtitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.publishTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewClick(article)}
                        className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                        title="查看文章"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditClick(article)}
                        className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                        title="编辑文章"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(article)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="删除文章"
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
        title="删除文章"
        message={`确定要删除文章 "${deleteDialog.article?.title}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
};

export default ArticleManagement;