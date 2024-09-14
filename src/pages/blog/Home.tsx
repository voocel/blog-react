import React, { useState, useEffect } from 'react';
import { getArticles } from '../../services/articles';
import { Article } from '../../types/article';
import ArticleList from '../../components/blog/ArticleList';
import { Pagination } from 'antd';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { data, total } = await getArticles(page, pageSize);
        setArticles(data);
        setTotal(total);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h1>最新文章</h1>
      <ArticleList articles={articles} />
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        onChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Home;
