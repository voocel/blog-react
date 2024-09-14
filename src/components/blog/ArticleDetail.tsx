import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, message } from 'antd'; // 假设你使用 Ant Design
import { getArticle } from '../../services/articles'; // 更新导入
import { Article } from '../../types/article'; // 导入 Article 类型

const { Title, Paragraph } = Typography;

const ArticleDetail: React.FC = () => {
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
    <div>
      <Title>{article.title}</Title>
      <Paragraph>作者: {article.author}</Paragraph>
      <Paragraph>发布时间: {new Date(article.publishTime || '').toLocaleDateString()}</Paragraph>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default ArticleDetail;
