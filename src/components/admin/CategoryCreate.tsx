import React, { useState } from 'react';
import { CategoryService } from '../../services/categoryService';
import { useToast } from '../../contexts/ToastContext';
import { CreateCategoryRequest } from '../../types/api';

interface CategoryCreateProps {
  onBack: () => void;
}

const CategoryCreate: React.FC<CategoryCreateProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!formData.name.trim()) {
      showError('请填写分类名称');
      return;
    }
    
    if (!formData.path.trim()) {
      showError('请填写分类路径');
      return;
    }

    setLoading(true);
    try {
      const categoryData: CreateCategoryRequest = {
        name: formData.name.trim(),
        path: formData.path.trim(),
        description: formData.description.trim() || undefined
      };

      await CategoryService.createCategory(categoryData);
      showSuccess('分类创建成功！');
      
      // 重置表单
      setFormData({
        name: '',
        path: '',
        description: ''
      });
      
      // 可以选择自动返回列表页面
      setTimeout(() => {
        onBack();
      }, 1500);
      
    } catch (error) {
      console.error('创建分类失败:', error);
      showError('创建分类失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-16px)]">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-600">创建分类</h2>
                <button 
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  返回
                </button>
              </div>
              <div className="w-full h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      分类名字
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="分类名字"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="path" className="block text-sm font-medium text-gray-700 mb-2">
                      路径
                    </label>
                    <input
                      type="text"
                      id="path"
                      name="path"
                      value={formData.path}
                      onChange={handleInputChange}
                      placeholder="路径"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      描述
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Please Input Category's Description"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-2 rounded-md transition-colors ${
                        loading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      } text-white`}
                    >
                      {loading ? '创建中...' : '创建'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;