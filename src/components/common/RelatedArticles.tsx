import React from 'react';
import { Link } from 'react-router-dom';

interface RelatedArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  currentArticleId: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ 
  articles, 
  currentArticleId 
}) => {
  const filteredArticles = articles.filter(
    article => article.id !== currentArticleId
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4">相关阅读</h3>
      <div className="space-y-3">
        {filteredArticles.slice(0, 5).map(article => (
          <Link
            key={article.id}
            to={article.url}
            className="block p-3 bg-white rounded hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-900 mb-1">
              {article.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;