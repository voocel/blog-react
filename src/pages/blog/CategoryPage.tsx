import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { List, Spin, message, Pagination } from 'antd';
import { getArticlesByCategory } from '../../services/articles';
import { Article } from '../../types/article';
import styles from '../../styles/CategoryPage.module.css';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchArticles = async (page: number = 1) => {
    if (!categoryId) {
      message.error('无效的分类 ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const id = parseInt(categoryId);
      if (isNaN(id)) {
        message.error('无效的分类 ID');
        setLoading(false);
        return;
      }

      const { data, total } = await getArticlesByCategory(id, page, pagination.pageSize);
      setArticles(data);
      setPagination(prev => ({ ...prev, current: page, total }));
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [categoryId]);

  const handlePageChange = (page: number) => {
    fetchArticles(page);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className={styles.categoryPage}>
      <h1>分类文章列表</h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={articles}
        renderItem={(article) => (
          <List.Item
            key={article.id}
            extra={
              article.coverImage && (
                <img
                  width={272}
                  alt="cover"
                  src={article.coverImage}
                />
              )
            }
          >
            <List.Item.Meta
              title={<Link to={`/article/${article.id}`}>{article.title}</Link>}
              description={`作者: ${article.author} | 发布时间: ${new Date(article.publishTime).toLocaleString()}`}
            />
            {article.summary}
          </List.Item>
        )}
      />
      <Pagination
        current={pagination.current}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={handlePageChange}
        className={styles.pagination}
      />
    </div>
  );
};

export default CategoryPage;
