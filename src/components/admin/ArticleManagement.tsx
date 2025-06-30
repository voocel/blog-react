import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../ui/ConfirmDialog';
import ArticleCreate from './ArticleCreate';
import ArticleEdit from './ArticleEdit';

interface Article {
  id: number;
  title: string;
  subtitle: string;
  publishTime: string;
  category?: string;
  coverImage?: string;
  content?: string;
  tags?: string[];
  description?: string;
  isDraft?: boolean;
  isOriginal?: boolean;
}

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

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 31,
      title: '如何使用Ollama本地部署运行大语言模型',
      subtitle: 'Ollama 本地运行大模型',
      publishTime: '4个月前',
      category: 'AI',
      coverImage: 'https://voocei.com/storage/cover/2024/09/01/AMXxNNaKSbYAGqx2Hu',
      content: 'Ollama是一个强大的本地LLM部署工具...',
      tags: ['Ollama', 'LLM'],
      description: 'Ollama本地部署大语言模型的完整指南',
      isDraft: false,
      isOriginal: true
    },
    {
      id: 30,
      title: 'ComfyUI人工智能',
      subtitle: 'ComfyUI基本使用',
      publishTime: '1个月前',
      category: 'AI',
      coverImage: 'https://voocei.com/storage/cover/2024/09/01/AMXxNNaKSbYAGqx2Hu',
      content: 'ComfyUI是基于节点流的界面...',
      tags: ['ComfyUI', 'StableDiffusion'],
      description: 'ComfyUI人工智能图像生成工具使用指南',
      isDraft: false,
      isOriginal: true
    },
    {
      id: 29,
      title: '用Golang实现一个轻量级的HTTP客户端',
      subtitle: 'golang实现http client实持中间件方式',
      publishTime: '5个月前'
    },
    {
      id: 28,
      title: 'OpenAI的ChatGPT人工智能',
      subtitle: 'ChatGPT API接入门',
      publishTime: '1年前'
    },
    {
      id: 27,
      title: '免费https证书生成',
      subtitle: '使用acme.sh申请免费的https证书,自动化续签证书',
      publishTime: '1年前'
    },
    {
      id: 26,
      title: 'Golang中的gRPC人工智能',
      subtitle: '如何在go中使用grpc',
      publishTime: '1年前'
    },
    {
      id: 25,
      title: 'Protobuf硬编码系列(一)',
      subtitle: 'Protocol Buffer 入门指南：高效的数据序列化格式 - Base128 Varints',
      publishTime: '1年前'
    },
    {
      id: 24,
      title: 'Golang优雅组织代码(Graceful Reader)',
      subtitle: 'Golang中的优雅重启 (Graceful Restart)',
      publishTime: '2年前'
    },
    {
      id: 23,
      title: '又一款数据新来源的Golang本套管理工具来了',
      subtitle: 'Golang本套管理工具,Golang多版本管理神器',
      publishTime: '2年前'
    },
    {
      id: 22,
      title: 'Golang prometheus metrics',
      subtitle: 'Golang prometheus metrics',
      publishTime: '3年前'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
  };

  const handleDeleteClick = (article: Article) => {
    setDeleteDialog({
      isOpen: true,
      article: article
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.article) {
      setArticles(articles.filter(article => article.id !== deleteDialog.article!.id));
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
            {articles.map((article) => (
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          ←
        </button>
        {[1, 2, 3, 4].map((page) => (
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