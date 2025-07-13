import React, { useState, useEffect } from 'react';
import MarkdownEditor from '../common/MarkdownEditor';
import ImageUpload from '../common/ImageUpload';
import DateTimePicker from './DateTimePicker';
import CustomDropdown from './CustomDropdown';
import { CategoryService } from '../../services/categoryService';
import { TagService } from '../../services/tagService';
import { useToast } from '../../contexts/ToastContext';
import { Category, Tag } from '../../types/api';

interface ArticleCreateProps {
  onBack: () => void;
}

const ArticleCreate: React.FC<ArticleCreateProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    subtitle: '',
    coverImage: '',
    content: 'Please input the article content.',
    tags: [] as string[],
    description: '',
    publishTime: 'Published At?',
    isDraft: false,
    isOriginal: false
  });

  const [categories, setCategories] = useState<{ value: string; label: string }[]>([
    { value: '', label: 'Select option' }
  ]);
  
  const [availableTags, setAvailableTags] = useState<{ value: string; label: string }[]>([
    { value: '', label: '选择标签' }
  ]);
  
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  // 加载分类和标签数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取分类数据
        const categoriesResponse = await CategoryService.getAllCategories();
        const categoryOptions = [
          { value: '', label: 'Select option' },
          ...categoriesResponse.map(cat => ({ value: cat.id.toString(), label: cat.name }))
        ];
        setCategories(categoryOptions);

        // 获取标签数据
        const tagsResponse = await TagService.getAllTags();
        const tagOptions = [
          { value: '', label: '选择标签' },
          ...tagsResponse.map(tag => ({ value: tag.id.toString(), label: tag.name }))
        ];
        setAvailableTags(tagOptions);
      } catch (error) {
        console.error('加载数据失败:', error);
        showError('加载分类和标签数据失败');
      }
    };

    fetchData();
  }, [showError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      coverImage: imageUrl
    }));
  };

  const handleDateTimeChange = (dateTime: string) => {
    setFormData(prev => ({
      ...prev,
      publishTime: dateTime
    }));
  };

  const handleToggleChange = (field: 'isDraft' | 'isOriginal') => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!formData.category) {
      showError('请选择分类');
      return;
    }
    
    if (!formData.title.trim()) {
      showError('请填写文章标题');
      return;
    }
    
    if (!formData.content.trim()) {
      showError('请填写文章内容');
      return;
    }

    setLoading(true);
    try {
      const { ArticleService } = await import('../../services/articleService');
      
      const articleData = {
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content,
        excerpt: formData.description || formData.content.substring(0, 200),
        coverImage: formData.coverImage,
        categoryId: parseInt(formData.category),
        tagIds: formData.tags.map(tag => parseInt(tag)),
        status: formData.isDraft ? 'draft' as const : 'published' as const,
        isOriginal: formData.isOriginal,
        publishedAt: formData.publishTime !== 'Published At?' ? formData.publishTime : undefined
      };

      await ArticleService.createArticle(articleData);
      showSuccess('文章创建成功！');
      
      // 重置表单
      setFormData({
        category: '',
        title: '',
        subtitle: '',
        coverImage: '',
        content: 'Please input the article content.',
        tags: [] as string[],
        description: '',
        publishTime: 'Published At?',
        isDraft: false,
        isOriginal: false
      });
      
      // 返回列表页面
      setTimeout(() => {
        onBack();
      }, 1500);
      
    } catch (error) {
      console.error('创建文章失败:', error);
      showError('创建文章失败，请重试');
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
                <h2 className="text-xl font-medium text-gray-600">创建文章</h2>
                <button 
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  返回
                </button>
              </div>
              <div className="w-full h-px bg-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right">
                  分类
                </label>
                <div className="col-span-10">
                  <CustomDropdown
                    options={categories}
                    value={formData.category}
                    onChange={handleCategoryChange}
                    placeholder="Select option"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right">
                  标题
                </label>
                <div className="col-span-10">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="请输入文章标题"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right">
                  副标题
                </label>
                <div className="col-span-10">
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="请输入文章副标题"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-start">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right pt-2">
                  页面图像
                </label>
                <div className="col-span-10">
                  <ImageUpload
                    value={formData.coverImage}
                    onChange={handleImageChange}
                    placeholder="点击或拖拽上传封面图片"
                    previewSize="lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right pt-2">
                  内容
                </label>
                <div className="col-span-10">
                  <MarkdownEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="请输入文章内容，支持Markdown语法..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right">
                  标签
                </label>
                <div className="col-span-10">
                  <TagsDropdown
                    selectedTags={formData.tags}
                    availableTags={availableTags}
                    onTagAdd={handleTagAdd}
                    onTagRemove={handleTagRemove}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right pt-2">
                  主要描述
                </label>
                <div className="col-span-10">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-none"
                    rows={3}
                    placeholder="请输入文章的主要描述，简要概括文章内容..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right">
                  发布时间
                </label>
                <div className="col-span-10">
                  <DateTimePicker
                    value={formData.publishTime}
                    onChange={handleDateTimeChange}
                    placeholder="Published At?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2"></div>
                <div className="col-span-10 flex items-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">是否草稿?</span>
                    <button
                      type="button"
                      onClick={() => handleToggleChange('isDraft')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        formData.isDraft ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isDraft ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">是否原创?</span>
                    <button
                      type="button"
                      onClick={() => handleToggleChange('isOriginal')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        formData.isOriginal ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isOriginal ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2"></div>
                <div className="col-span-10">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm font-medium"
                  >
                    创建
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// 标签下拉组件
interface TagsDropdownProps {
  selectedTags: string[];
  availableTags: { value: string; label: string }[];
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

const TagsDropdown: React.FC<TagsDropdownProps> = ({
  selectedTags,
  availableTags,
  onTagAdd,
  onTagRemove
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = availableTags.filter(option =>
    option.value && 
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedTags.includes(option.value)
  );

  const handleTagSelect = (tag: string) => {
    onTagAdd(tag);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[42px] px-3 py-2 border rounded-lg bg-white cursor-pointer transition-all duration-200 flex flex-wrap items-center gap-2 ${
          isOpen ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-gray-300 hover:border-blue-300'
        }`}
      >
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-green-500 text-white"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTagRemove(tag);
              }}
              className="ml-1 text-green-200 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        
        {selectedTags.length === 0 && (
          <span className="text-gray-500">选择标签</span>
        )}
        
        <div className="ml-auto">
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索标签..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTagSelect(option.value)}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 text-gray-700 font-medium ${
                    index === 0 ? '' : 'border-t border-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                {searchTerm ? '没有找到匹配的标签' : '没有更多标签可选择'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCreate;