import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types/article';

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h2><Link to={`/article/${article.id}`}>{article.title}</Link></h2>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
