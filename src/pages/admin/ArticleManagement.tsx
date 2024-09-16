import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Pagination, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getArticles, deleteArticle } from '../../services/articles';
import { Article } from '../../types/article';
import styles from '../../styles/ArticleManagement.module.css';
import { TablePaginationConfig } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';

const ArticleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, total } = await getArticles(pagination.current, pagination.pageSize);
      setArticles(data);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [pagination.current, pagination.pageSize]);

  const handleDelete = async (id: number) => {
    try {
      await deleteArticle(id);
      message.success('文章删除成功');
      fetchArticles();
    } catch (error) {
      console.error('Failed to delete article:', error);
      message.error('文章删除失败');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/articles/edit/${id}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
      key: 'subtitle',
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Article) => (
        <Space size="middle">
          <Link to={`/admin/articles/edit/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small">编辑</Button>
          </Link>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  const handleCreateArticle = () => {
    navigate('/admin/articles/create');
  };

  return (
    <div className={styles.articleManagement}>
      <div className={styles.header}>
        <h1>文章列表</h1>
        <Button onClick={handleCreateArticle} type="primary" style={{ marginBottom: 16 }}>
          创建文章
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={articles}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page, pageSize) => {
          setPagination(prev => ({ ...prev, current: page, pageSize: pageSize || 10 }));
        }}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `共 ${total} 条`}
      />
    </div>
  );
};

export default ArticleManagement;
