import React, { useState } from 'react';
import { Edit, Trash2, Plus, Folder } from 'lucide-react';
import ConfirmDialog from '../ui/ConfirmDialog';
import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';
import { CategoryService } from '../../services/categoryService';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useManagement } from '../../hooks/useManagement';
import { Category } from '../../types/api';

const CategoryManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    category: Category | null;
  }>({
    isOpen: false,
    category: null
  });

  // 创建适配器函数以匹配useManagement的参数类型
  const fetchCategories = async (params: { page: number; pageSize: number }) => {
    return await CategoryService.getCategories(params);
  };

  const {
    data: categories,
    loading,
    error,
    currentPage,
    totalPages,
    deleteItem,
    handlePageChange,
    refreshData
  } = useManagement<Category>({
    fetchData: fetchCategories,
    deleteData: CategoryService.deleteCategory,
    errorMessage: '获取分类列表失败',
    deleteErrorMessage: '删除分类失败'
  });

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('edit');
  };

  const handleDeleteClick = (category: Category) => {
    setDeleteDialog({
      isOpen: true,
      category: category
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.category) {
      await deleteItem(deleteDialog.category);
      setDeleteDialog({ isOpen: false, category: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, category: null });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCategory(null);
    refreshData();
  };

  if (currentView === 'create') {
    return <CategoryCreate onBack={handleBackToList} />;
  }

  if (currentView === 'edit' && selectedCategory) {
    return <CategoryEdit category={selectedCategory} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">分类列表</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <Folder className="w-12 h-12 text-gray-300" />
                    <p>暂无分类数据</p>
                    <p className="text-sm">点击上方"创建"按钮开始创建第一个分类</p>
                  </div>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {category.description || '暂无描述'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditClick(category)}
                        className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(category)}
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
        title="删除分类"
        message={`确定要删除分类 "${deleteDialog.category?.name}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
};

export default CategoryManagement;