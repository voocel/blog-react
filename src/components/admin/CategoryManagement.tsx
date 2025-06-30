import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';
import ConfirmDialog from '../ui/ConfirmDialog';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

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

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 12,
      name: 'AI',
      slug: 'ai',
      description: '',
      createdAt: '2024-08-16 00:14:09'
    },
    {
      id: 11,
      name: 'Algorithm',
      slug: 'algorithm',
      description: '',
      createdAt: '2024-08-16 00:13:31'
    },
    {
      id: 10,
      name: 'Protobuf',
      slug: 'protobuf',
      description: '',
      createdAt: '2023-04-12 16:47:59'
    },
    {
      id: 9,
      name: 'ELK',
      slug: 'elk',
      description: '',
      createdAt: '2021-04-13 01:22:13'
    },
    {
      id: 8,
      name: 'Golang',
      slug: 'golang',
      description: '',
      createdAt: '2021-04-12 16:51:23'
    },
    {
      id: 7,
      name: 'MongoDB',
      slug: 'MongoDB',
      description: '',
      createdAt: '2017-09-15 22:46:33'
    },
    {
      id: 6,
      name: 'MySQL',
      slug: 'mysql',
      description: '',
      createdAt: '2017-08-10 10:59:36'
    },
    {
      id: 5,
      name: 'JavaScript',
      slug: 'js',
      description: '',
      createdAt: '2017-08-10 10:56:10'
    },
    {
      id: 4,
      name: 'Node.js',
      slug: 'nodejs',
      description: '',
      createdAt: '2017-08-10 10:53:50'
    },
    {
      id: 3,
      name: 'Docker',
      slug: 'docker',
      description: '',
      createdAt: '2017-06-13 14:24:07'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCategory(null);
  };

  const handleDeleteClick = (category: Category) => {
    setDeleteDialog({
      isOpen: true,
      category: category
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.category) {
      setCategories(categories.filter(category => category.id !== deleteDialog.category!.id));
      setDeleteDialog({ isOpen: false, category: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, category: null });
  };

  // 如果是创建页面，显示创建组件
  if (currentView === 'create') {
    return <CategoryCreate onBack={handleBackToList} />;
  }

  // 如果是编辑页面，显示编辑组件
  if (currentView === 'edit' && selectedCategory) {
    return <CategoryEdit category={selectedCategory} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6">
      {/* Header */}
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名字</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">路径</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {category.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.createdAt}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          ←
        </button>
        {[1, 2].map((page) => (
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