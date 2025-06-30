import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, Eye } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/layout/HeroSection';
import Pagination from '../components/common/Pagination';
import SEOHead from '../components/common/SEOHead';
import { useAuthStore } from '../stores/authStore';
import { usePageEngagement } from '../hooks/useAnalytics';
import { trackArticleView } from '../utils/analytics';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  
  // 跟踪页面停留时间
  usePageEngagement();

  // 模拟更多文章数据
  const allArticles = [
    {
      id: 1,
      title: '一文弄懂用Go实现MCP服务：从STDIO到Streamable HTTP的完整实现',
      description: '如何在go中使用mcp',
      content: 'MCP的核心是客户端-服务器架构，其中MCP客户端通过以连接到个服务器。客户端提供用户界面和MCP功能的应用程序，如CLT具、IDE插件或AI应用。',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['MCP', 'LLM'],
      author: 'voocel',
      timeAgo: '1个月前',
      views: '103'
    },
    {
      id: 2,
      title: '如何监控 LLM 产品的质量',
      description: '你建LLM产品质量监控体系：从原型到生产的实践指南',
      content: '本文将完成LLM产品质量监控到端体系，一从评估早期模型到生产环境持续的质量监控，我们将深入了高效方法和最佳实践，同时也会涉及具体的实现环节。',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['LLM'],
      author: 'voocel',
      timeAgo: '2个月前',
      views: '100'
    },
    {
      id: 3,
      title: 'ComfyUI入门使用',
      description: 'ComfyUI基本使用',
      content: 'ComfyUI是基于节点流的界面，用于创建和运行AI图像生成工作流程。它提供了一个直观的可视化编程环境。',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['ComfyUI', 'StableDiffusion'],
      author: 'voocel',
      timeAgo: '11个月前',
      views: '1420'
    },
    {
      id: 4,
      title: '如何使用Ollama本地部署运行大语言模型',
      description: 'Ollama 本地运行大模型',
      content: 'Ollama是一个强大的本地LLM部署工具，让你能够在本地运行各类大语言模型，保护数据隐私的同时获得AI能力。',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Ollama', 'LLM'],
      author: 'voocel',
      timeAgo: '6个月前',
      views: '6.7万'
    },
    {
      id: 5,
      title: 'Golang中的gRPC入门指南',
      description: '如何在Go中使用gRPC',
      content: 'gRPC是一个高性能、开源和通用的RPC框架，它基于HTTP/2协议标准。本文将详细介绍如何在Go中使用gRPC。',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Golang', 'gRPC'],
      author: 'voocel',
      timeAgo: '8个月前',
      views: '2.3万'
    },
    {
      id: 6,
      title: 'React TypeScript最佳实践',
      description: '从入门到精通的完整指南',
      content: 'React与TypeScript的结合为前端开发带来了类型安全和更好的开发体验。本文将分享最佳实践。',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['React', 'TypeScript'],
      author: 'voocel',
      timeAgo: '3个月前',
      views: '1.8万'
    },
    {
      id: 7,
      title: 'Docker容器化部署实战',
      description: '从开发到生产的完整流程',
      content: 'Docker已经成为现代应用部署的标准工具。本文将介绍从开发环境到生产环境的完整容器化部署流程。',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Docker', 'DevOps'],
      author: 'voocel',
      timeAgo: '4个月前',
      views: '1.5万'
    },
    {
      id: 8,
      title: 'Kubernetes集群管理指南',
      description: 'K8s生产环境最佳实践',
      content: 'Kubernetes是容器编排的事实标准。本文将分享在生产环境中管理K8s集群的最佳实践和经验。',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Kubernetes', 'DevOps'],
      author: 'voocel',
      timeAgo: '5个月前',
      views: '1.2万'
    },
    {
      id: 9,
      title: 'MySQL性能优化实战',
      description: '数据库性能调优技巧',
      content: 'MySQL是最流行的关系型数据库之一。本文将分享MySQL性能优化的实用技巧和最佳实践。',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['MySQL', 'Database'],
      author: 'voocel',
      timeAgo: '7个月前',
      views: '9800'
    },
    {
      id: 10,
      title: 'Redis缓存设计模式',
      description: '高性能缓存架构设计',
      content: 'Redis是高性能的内存数据库，广泛用于缓存场景。本文将介绍Redis缓存的设计模式和最佳实践。',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Redis', 'Cache'],
      author: 'voocel',
      timeAgo: '9个月前',
      views: '8500'
    },
    {
      id: 11,
      title: 'Vue.js 3.0 Composition API详解',
      description: 'Vue3新特性完全指南',
      content: 'Vue 3.0引入了Composition API，为组件逻辑复用提供了更好的方案。本文将详细介绍其使用方法。',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Vue.js', 'JavaScript'],
      author: 'voocel',
      timeAgo: '6个月前',
      views: '7200'
    },
    {
      id: 12,
      title: 'Node.js微服务架构实践',
      description: '构建可扩展的后端服务',
      content: 'Node.js在微服务架构中有着重要地位。本文将分享如何使用Node.js构建可扩展的微服务系统。',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Node.js', 'Microservices'],
      author: 'voocel',
      timeAgo: '10个月前',
      views: '6800'
    }
  ];

  // 分页配置
  const ARTICLES_PER_PAGE = 5;
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  
  // 计算当前页的文章
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = allArticles.slice(startIndex, endIndex);

  const handleArticleClick = (article: any) => {
    // 跟踪文章点击
    trackArticleView(article.id.toString(), article.title);
    navigate(`/articles/${article.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Voocel Blog - 技术分享与交流平台"
        description="Voocel Blog专注于技术分享，提供前端开发、后端技术、人工智能、DevOps等领域的优质内容和技术讨论。"
        keywords="Voocel, 技术博客, 前端开发, React, TypeScript, Go, AI, 人工智能, 技术分享"
        url={`${import.meta.env.VITE_SITE_URL || 'https://voocel.com'}`}
        type="website"
      />
      
      <Header />
      
      {/* Hero Section - 始终显示 */}
      <HeroSection />
      
      {/* Articles Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 文章列表 */}
          <div className="space-y-8">
            {currentArticles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleArticleClick(article)}
              >
                <div className="flex items-center">
                  {/* Image */}
                  <div className="w-64 h-48 flex-shrink-0">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-medium text-gray-700 mb-3 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      
                      <p className="text-gray-500 text-sm mb-3">
                        {article.description}
                      </p>

                      {article.content && (
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {article.content}
                        </p>
                      )}

                      <div className="flex items-center space-x-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span className="username">{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.timeAgo}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      
                      <button className="read-more-button font-medium">
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 分页组件 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;