import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import TagCreate from './TagCreate';
import TagEdit from './TagEdit';
import ConfirmDialog from '../ui/ConfirmDialog';

interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

const TagManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    tag: Tag | null;
  }>({
    isOpen: false,
    tag: null
  });

  const [tags, setTags] = useState<Tag[]>([
    {
      id: 28,
      name: 'ComfyUI',
      slug: 'ComfyUI',
      description: 'ComfyUI.',
      createdAt: '2024-08-16 00:16:51'
    },
    {
      id: 27,
      name: 'StableDiffusion',
      slug: 'Stable Diffusion',
      description: 'Stable Diffusion.',
      createdAt: '2024-08-16 00:16:20'
    },
    {
      id: 26,
      name: 'LLM',
      slug: 'llm',
      description: 'llm',
      createdAt: '2024-08-16 00:15:55'
    },
    {
      id: 25,
      name: 'https',
      slug: 'https',
      description: 'https',
      createdAt: '2024-08-13 20:11:47'
    },
    {
      id: 24,
      name: 'TLS',
      slug: 'tls',
      description: 'tls',
      createdAt: '2024-08-13 20:11:35'
    },
    {
      id: 23,
      name: 'gRPC',
      slug: 'grpc',
      description: 'gRPC 是一个高性能、开源和通用的 RPC 框架，它基于 HTTP/2 协议标准。gRPC 支持多种语言，包括 Go、Java、PHP、Python、C# 等，使用它可以轻松地构建分布式系统',
      createdAt: '2024-08-13 16:59:03'
    },
    {
      id: 22,
      name: 'HTTP',
      slug: 'http',
      description: 'HTTP (Hypertext Transfer Protocol) 是一种用于从万维网服务器传输超文本到本地浏览器的应用层协议。',
      createdAt: '2024-08-13 16:35:49'
    },
    {
      id: 21,
      name: 'protobuf',
      slug: 'Protobuf',
      description: 'Protocol Buffers (Protobuf) 是一种由 Google 开发的数据序列化协议，它使用高效的二进制格式，支持多种编程语言和平台。',
      createdAt: '2024-08-12 20:44:45'
    },
    {
      id: 20,
      name: 'Prometheus',
      slug: 'Prometheus',
      description: 'Prometheus监控',
      createdAt: '2022-04-05 18:44:53'
    },
    {
      id: 19,
      name: 'Gin',
      slug: 'Gin',
      description: 'Golang的Web框架',
      createdAt: '2021-04-13 04:20:23'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleEditClick = (tag: Tag) => {
    setSelectedTag(tag);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedTag(null);
  };

  const handleDeleteClick = (tag: Tag) => {
    setDeleteDialog({
      isOpen: true,
      tag: tag
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.tag) {
      setTags(tags.filter(tag => tag.id !== deleteDialog.tag!.id));
      setDeleteDialog({ isOpen: false, tag: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, tag: null });
  };

  // 如果是创建页面，显示创建组件
  if (currentView === 'create') {
    return <TagCreate onBack={handleBackToList} />;
  }

  // 如果是编辑页面，显示编辑组件
  if (currentView === 'edit' && selectedTag) {
    return <TagEdit tag={selectedTag} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">标签列表</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标签</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tag.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tag.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tag.slug}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-md">
                    {tag.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tag.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditClick(tag)}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(tag)}
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
        {[1, 2, 3].map((page) => (
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
        title="删除标签"
        message={`确定要删除标签 "${deleteDialog.tag?.name}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
};

export default TagManagement;