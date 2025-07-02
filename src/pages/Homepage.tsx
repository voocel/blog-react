import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, Eye } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/layout/HeroSection';
import Pagination from '../components/common/Pagination';
import SEOHead from '../components/common/SEOHead';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { usePageEngagement } from '../hooks/useAnalytics';
import { trackArticleView } from '../utils/analytics';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../types/api';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  
  // 跟踪页面停留时间
  usePageEngagement();

  // 稳定的参数对象，避免无限循环
  const articlesParams = useMemo(() => ({
    page: 1,
    pageSize: 5,
    status: 'published'
  }), []);

  // 使用真实API获取文章数据
  const {
    data: articles,
    loading,
    error,
    page: currentPage,
    totalPages,
    setPage
  } = useArticles(articlesParams);

  const handleArticleClick = (article: Article) => {
    // 跟踪文章点击
    trackArticleView(article.id.toString(), article.title);
    navigate(`/articles/${article.id}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
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
          
          {/* 加载状态 */}
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* 错误状态 */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">😔 加载文章时出现错误</p>
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          )}

          {/* 文章列表 */}
          {!loading && !error && articles && (
            <>
              <div className="space-y-8">
                {articles.map((article) => (
                  <article 
                    key={article.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="flex items-center">
                      {/* Image */}
                      <div className="w-64 h-48 flex-shrink-0">
                        <img 
                          src={article.coverImage || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'} 
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
                            {article.subtitle || article.excerpt}
                          </p>

                          {article.excerpt && (
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>
                          )}

                          <div className="flex items-center space-x-2 mb-4">
                            {article.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded"
                              >
                                {typeof tag === 'string' ? tag : tag.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span className="username">{article.author?.username || 'Anonymous'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.viewCount || 0}</span>
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
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {/* 无文章状态 */}
          {!loading && !error && (!articles || articles.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">📝 暂无文章</p>
              <p className="text-sm text-gray-400">请稍后再来查看最新内容</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;