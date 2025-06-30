import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/layout/HeroSection';
import ArticleCard from '../components/common/ArticleCard';
import Pagination from '../components/common/Pagination';

const articles = [
  {
    id: 1,
    title: 'ComfyUI人工智能',
    description: 'ComfyUI是基于节点流的界面，用于创建和运行AI图像生成工作流程。它提供了一个直观的可视化编程环境，让用户能够轻松构建复杂的AI图像处理管道。',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['ComfyUI', 'AI'],
    timeAgo: '2周前',
    views: '1.2k',
    author: 'voocel'
  },
  {
    id: 2,
    title: '如何使用Ollama本地部署运行大语言模型',
    description: 'Ollama是一个强大的本地LLM部署工具，让你能够在本地运行各类大语言模型，保护数据隐私的同时获得AI能力。本文将详细介绍安装配置和使用方法。',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Golang', 'LLM'],
    timeAgo: '3周前',
    views: '856',
    author: 'voocel'
  },
  // ... 更多文章数据
];

const ARTICLES_PER_PAGE = 10;

const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (id: number) => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {currentArticles.map((article, index) => (
              <div 
                key={startIndex + index} 
                onClick={() => handleArticleClick(article.id)} 
                className="cursor-pointer"
              >
                <ArticleCard
                  title={article.title}
                  description={article.description}
                  image={article.image}
                  tags={article.tags}
                  timeAgo={article.timeAgo}
                  views={article.views}
                  author={article.author}
                />
              </div>
            ))}
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleList;