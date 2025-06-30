import React, { useState } from 'react';
import MarkdownEditor from '../common/MarkdownEditor';
import ImageUpload from '../common/ImageUpload';
import DateTimePicker from './DateTimePicker';
import CustomDropdown from './CustomDropdown';

interface Article {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  content: string;
  tags: string[];
  description: string;
  publishTime: string;
  isDraft: boolean;
  isOriginal: boolean;
}

interface ArticleEditProps {
  article: Article;
  onBack: () => void;
}

const ArticleEdit: React.FC<ArticleEditProps> = ({ article, onBack }) => {
  const [formData, setFormData] = useState({
    category: article.category || 'AI',
    title: article.title || 'ComfyUI人工智能',
    subtitle: article.subtitle || 'ComfyUI基本使用',
    coverImage: article.coverImage || 'https://voocei.com/storage/cover/2024/09/01/AMXxNNaKSbYAGqx2Hu',
    content: article.content || `> ComfyUI 是一个基于节点的图形用户界面工具，主要用于构建和运行AI 模型，特别是在图像生成和处理方面非常强大。它支持多种模型，如 Stable Diffusion 等，使用户可以可视化地构建复杂的AI 工作流程。

1. 环境准备
Python 3.7 或更高版本
PyTorch：ComfyUI 需要 PyTorch 库，根据你的系统配置（CPU 或 GPU）选择合适的版本安装。例如，在 Linux 上安装 GPU 版本的 PyTorch 可以使用以下命令：

pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu116

虚拟环境

pip install numpy pillow torch requests

2. 获取 ComfyUI

git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
...

3. 启动

python comfyui.py`,
    tags: ['ComfyUI', 'StableDiffusion'],
    description: '',
    publishTime: '2024-07-16 21:17:00',
    isDraft: false,
    isOriginal: true
  });

  const categories = [
    { value: '', label: 'Select option' },
    { value: 'AI', label: 'AI' },
    { value: 'tech', label: '技术分享' },
    { value: 'life', label: '生活随笔' },
    { value: 'study', label: '学习笔记' },
    { value: 'project', label: '项目经验' },
    { value: 'tools', label: '工具推荐' },
    { value: 'frontend', label: '前端开发' },
    { value: 'backend', label: '后端开发' },
    { value: 'devops', label: 'DevOps' }
  ];

  const availableTags = [
    { value: '', label: '选择标签' },
    { value: 'ComfyUI', label: 'ComfyUI' },
    { value: 'StableDiffusion', label: 'StableDiffusion' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'golang', label: 'Go' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'ai', label: 'AI' },
    { value: 'ml', label: 'Machine Learning' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'typescript', label: 'TypeScript' }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('修改文章:', formData);
    alert('文章修改成功！');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-16px)]">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-600">修改文章</h2>
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
                    placeholder="选择发布时间"
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
                        formData.isOriginal ? 'bg-green-600' : 'bg-gray-200'
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
                    修改
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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
        className={`w-full min-h-[42px] px-4 py-3 border rounded-lg bg-white cursor-pointer transition-all duration-200 flex flex-wrap items-center gap-2 shadow-sm ${
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

export default ArticleEdit;