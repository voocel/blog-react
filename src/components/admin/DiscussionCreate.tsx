import React, { useState } from 'react';
import MarkdownEditor from '../common/MarkdownEditor';

interface DiscussionCreateProps {
  onBack: () => void;
}

const DiscussionCreate: React.FC<DiscussionCreateProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    tags: [] as string[],
    content: '',
    status: false
  });

  const availableTags = [
    { value: 'cURL', label: 'cURL' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Go', label: 'Go' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Kubernetes', label: 'Kubernetes' },
    { value: 'AI', label: 'AI' },
    { value: 'ComfyUI', label: 'ComfyUI' },
    { value: 'StableDiffusion', label: 'StableDiffusion' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleToggleChange = () => {
    setFormData(prev => ({
      ...prev,
      status: !prev.status
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
    if (!formData.title.trim()) {
      alert('请填写讨论标题');
      return;
    }
    
    if (!formData.content.trim()) {
      alert('请填写讨论内容');
      return;
    }

    try {
      const { DiscussionService } = await import('../../services/discussionService');
      
      const discussionData = {
        title: formData.title,
        content: formData.content,
        tagIds: formData.tags.map(tag => parseInt(tag)),
        status: formData.status ? 'active' as const : 'inactive' as const
      };

      await DiscussionService.createDiscussion(discussionData);
      alert('讨论创建成功！');

      setTimeout(() => {
        onBack();
      }, 1000);
      
    } catch (error) {
      console.error('创建讨论失败:', error);
      alert('创建讨论失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-16px)]">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-600">创建讨论</h2>
                <button 
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  返回
                </button>
              </div>
              <div className="w-full h-px bg-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
              {/* 标题 */}
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
                    placeholder="请输入讨论标题"
                  />
                </div>
              </div>

              {/* 标签 */}
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

              {/* 内容 */}
              <div className="grid grid-cols-12 gap-4">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right pt-2">
                  内容
                </label>
                <div className="col-span-10">
                  <MarkdownEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="Please input the discussion content."
                  />
                </div>
              </div>

              {/* 状态 */}
              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-2 text-sm font-medium text-gray-700 text-right">
                  状态
                </label>
                <div className="col-span-10">
                  <button
                    type="button"
                    onClick={handleToggleChange}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.status ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.status ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 提交按钮 */}
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

export default DiscussionCreate;