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
          <img src={article.image} alt={article.title} className={styles.articleImage} />
          <div className={styles.articleContent}>
            <div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <div className={styles.articleMeta}>
                {/* 添加文章元数据，如阅读量、评论数等 */}
              </div>
            </div>
            <Link to={`/article/${article.id}`} className={styles.readMore}>阅读更多</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
