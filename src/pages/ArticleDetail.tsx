import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Eye, Clock, MessageCircle, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import RelatedArticles from '../components/common/RelatedArticles';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { usePageEngagement } from '../hooks/useAnalytics';
import { trackArticleView } from '../utils/analytics';
import { useArticle, useRelatedArticles } from '../hooks/useArticles';
import { useAuth } from '../hooks/useAuth';
import { resolveImageUrl, formatUsername } from '../utils/apiHelpers';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  
  // 获取用户认证信息
  const { isLoggedIn, user } = useAuth();
  
  // 跟踪页面停留时间
  usePageEngagement();

  // 获取文章数据
  const { data: article, loading: articleLoading, error: articleError } = useArticle(id || '');
  
  // 获取相关文章数据
  const { data: relatedArticles, loading: relatedLoading } = useRelatedArticles(id || '', 5);

  // 面包屑导航
  const breadcrumbItems = [
    { name: '首页', url: '/' },
    { name: '文章', url: '/articles' },
    { name: article?.title || '文章详情', url: `/articles/${id}` }
  ];

  useEffect(() => {
    // 跟踪文章浏览
    if (id && article?.title) {
      trackArticleView(id, article.title);
    }
  }, [id, article?.title]);

  // 格式化时间
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return `${diffDays}天前`;
    } else if (diffDays <= 30) {
      return `${Math.ceil(diffDays / 7)}周前`;
    } else if (diffDays <= 365) {
      return `${Math.ceil(diffDays / 30)}个月前`;
    } else {
      return `${Math.ceil(diffDays / 365)}年前`;
    }
  };

  // 返回首页函数
  const handleBackToHome = () => {
    navigate('/');
  };

  // 处理评论提交
  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (!comment.trim()) {
      return;
    }
    
    // TODO: 实现评论提交逻辑
    console.log('提交评论:', comment);
    setComment('');
  };

  // 如果正在加载，显示加载状态
  if (articleLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // 如果出错或文章不存在，显示错误页面
  if (articleError || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">文章不存在</h1>
            <p className="text-gray-600 mb-6">抱歉，您访问的文章不存在或已被删除。</p>
            <button
              onClick={handleBackToHome}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        keywords={`${article.tags.map(tag => tag.name).join(', ')}, ${article.author.username}, Voocel Blog`}
        image={article.coverImage}
        url={`${import.meta.env.VITE_SITE_URL || 'https://voocel.com'}/articles/${id}`}
        type="article"
        author={article.author.username}
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        tags={article.tags.map(tag => tag.name)}
      />
      
      <Header />
      
      {/* Hero Section with Article Title */}
      <section style={{ backgroundColor: '#597289' }} className="text-white py-8 hero-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-2 drop-shadow-lg">{article.title}</h1>
            {article.subtitle && (
              <p className="text-gray-100 mb-4 text-lg">{article.subtitle}</p>
            )}
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-200">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>
                  {formatUsername(article.author?.username)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                {article.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    {tag.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.viewCount.toLocaleString()}阅读</span>
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
            <div className="prose prose-lg max-w-none article-content">
              <div className="text-gray-700 leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    // 自定义代码块样式
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                        {children}
                      </pre>
                    ),
                    // 自定义行内代码样式
                    code: ({ children, ...props }) => {
                      const isInline = !props.className;
                      return isInline ? (
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                          {children}
                        </code>
                      ) : (
                        <code className="block">{children}</code>
                      );
                    },
                    // 自定义标题样式
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-200 pb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mt-6 mb-3 border-l-4 border-blue-500 pl-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-base font-medium mt-3 mb-2">
                        {children}
                      </h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="text-sm font-medium mt-3 mb-2">
                        {children}
                      </h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="text-xs font-medium mt-3 mb-2">
                        {children}
                      </h6>
                    ),
                    // 自定义链接样式
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    // 自定义表格样式
                    table: ({ children }) => (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {children}
                      </td>
                    ),
                    // 自定义引用样式
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-600">
                        {children}
                      </blockquote>
                    ),
                    // 自定义列表样式
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1 mb-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-1 mb-4">
                        {children}
                      </ol>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <RelatedArticles 
              articles={relatedArticles.map(article => ({
                id: article.id.toString(),
                title: article.title,
                excerpt: article.excerpt,
                url: `/articles/${article.id}`
              }))} 
              currentArticleId={id || '1'} 
            />
          )}

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">评论</h3>
            <p className="text-gray-500 text-sm mb-6">Nothing</p>

            {/* Comment Form */}
            {isLoggedIn ? (
              <div className="flex space-x-4">
                <img 
                  src={resolveImageUrl(user?.avatar) || '/default-avatar.png'} 
                  alt="用户头像" 
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">
                      {user?.nickname || user?.username} · Markdown
                    </span>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    rows={4}
                    placeholder="写下你的评论..."
                  />
                  <div className="flex justify-end mt-3">
                    <button 
                      onClick={handleCommentSubmit}
                      className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      发布评论
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <User className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-gray-600 mb-2">登录后即可发表评论</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      立即登录
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;