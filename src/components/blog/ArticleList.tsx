import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Blog.module.css';
import { Article } from '../../types/article';
import { getArticles } from '../../services/articles';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.articleList}>
      {articles.map((article) => (
        <div key={article.id} className={styles.articleItem}>
          <img src={article.image} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <Link to={`/article/${article.id}`}>阅读更多</Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
