import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import { getArticle } from '../../services/articles';
import { Article } from '../../types/article';
import CommentSection from '../../components/blog/CommentSection';
import styles from '../../styles/ArticlePage.module.css';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        message.error('无效的文章 ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const articleId = parseInt(id);
        if (isNaN(articleId)) {
          message.error('无效的文章 ID');
          setLoading(false);
          return;
        }

        const data = await getArticle(articleId);
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
        message.error('获取文章失败');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!article) {
    return <div>文章不存在</div>;
  }

  return (
    <div className={styles.articlePage}>
      <h1>{article.title}</h1>
      <div className={styles.metadata}>
        <span>作者: {article.author}</span>
        <span>发布时间: {article.publishTime ? new Date(article.publishTime).toLocaleString() : '未知'}</span>
      </div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />
      <CommentSection articleId={article.id} />
    </div>
  );
};

export default ArticlePage;
