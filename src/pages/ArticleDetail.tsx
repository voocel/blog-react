import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Eye, Clock, MessageCircle, Tag } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import RelatedArticles from '../components/common/RelatedArticles';
import { usePageEngagement } from '../hooks/useAnalytics';
import { trackArticleView } from '../utils/analytics';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  
  // 跟踪页面停留时间
  usePageEngagement();

  // 模拟文章数据
  const article = {
    id: parseInt(id || '1'),
    title: '如何使用Ollama本地部署运行大语言模型',
    subtitle: 'Ollama 本地运行大模型',
    description: 'Ollama是一个强大的本地LLM部署工具，让你能够在本地运行各类大语言模型，保护数据隐私的同时获得AI能力。本文将详细介绍安装配置和使用方法。',
    content: `Ollama——个开源的命令行工具，它让用户能够在本地运行各种大语言模型（LLMs）的开源工具。Ollama 的设计目标是简化本地部署的过程，让用户能够轻松地在自己的计算机上运行大语言模型，而无需依赖云服务。这对于需要保护数据隐私、降低成本或在离线环境中工作的用户来说非常有用。`,
    author: 'voocel',
    publishedAt: '2024-07-16T21:17:00Z',
    updatedAt: '2024-07-16T21:17:00Z',
    tags: ['Ollama', 'LLM', 'AI', '本地部署'],
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: '6.7万',
    timeAgo: '6个月前'
  };

  // 相关文章数据
  const relatedArticles = [
    {
      id: '2',
      title: 'ComfyUI人工智能图像生成完整指南',
      excerpt: 'ComfyUI是基于节点流的界面，用于创建和运行AI图像生成工作流程。',
      url: '/articles/2'
    },
    {
      id: '3',
      title: 'Stable Diffusion本地部署教程',
      excerpt: '详细介绍如何在本地环境中部署和使用Stable Diffusion模型。',
      url: '/articles/3'
    }
  ];

  // 面包屑导航
  const breadcrumbItems = [
    { name: '首页', url: '/' },
    { name: '文章', url: '/articles' },
    { name: article.title, url: `/articles/${id}` }
  ];

  useEffect(() => {
    // 跟踪文章浏览
    if (id) {
      trackArticleView(id, article.title);
    }
  }, [id, article.title]);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={article.title}
        description={article.description}
        keywords={`${article.tags.join(', ')}, ${article.author}, Voocel Blog`}
        image={article.coverImage}
        url={`${import.meta.env.VITE_SITE_URL || 'https://voocel.com'}/articles/${id}`}
        type="article"
        author={article.author}
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        tags={article.tags}
      />
      
      <Header />
      
      {/* Hero Section with Article Title */}
      <section style={{ backgroundColor: '#597289' }} className="text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-normal mb-2">{article.title}</h1>
            <p className="text-slate-300 mb-4">{article.subtitle}</p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-300">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                {article.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.timeAgo}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.views}阅读</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          <article className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {article.content}
              </p>

              <h2 className="text-lg font-medium text-gray-900 mb-4">
                一、安装Ollama 官网地址：
                <a 
                  href="https://ollama.com" 
                  className="text-blue-500 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ollama.com
                </a>
              </h2>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">
                  1. macOS：
                  <span className="text-red-500">https://ollama.com/download/Ollama-darwin.zip</span>
                </h3>
                <h3 className="font-medium text-gray-900 mb-3">
                  2. Windows：
                  <span className="text-red-500">https://ollama.com/download/OllamaSetup.exe</span>
                </h3>
                <h3 className="font-medium text-gray-900 mb-3">
                  3. linux：
                  <span className="text-red-500">curl -fsSL https://ollama.com/install.sh | sh</span>
                </h3>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <RelatedArticles 
            articles={relatedArticles} 
            currentArticleId={id || '1'} 
          />

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">评论</h3>
            <p className="text-gray-500 text-sm mb-6">Nothing</p>

            {/* Comment Form */}
            <div className="flex space-x-4">
              <img 
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100" 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Markdown</span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  rows={4}
                  placeholder="写下你的评论..."
                />
                <div className="flex justify-end mt-3">
                  <button className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                    发布评论
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;