import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getArticles, deleteArticle } from '../../services/articles';
import { Article } from '../../types/article';
import styles from '../../styles/ArticleManagement.module.css';
import { TablePaginationConfig } from 'antd/lib/table';

const ArticleManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchArticles();
  }, [pagination.current, pagination.pageSize]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, total } = await getArticles(pagination.current || 1, pagination.pageSize || 10);
      setArticles(data);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteArticle(id);
      message.success('文章删除成功');
      fetchArticles();
    } catch (error) {
      message.error('文章删除失败');
    }
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

  return (
    <div className={styles.articleManagement}>
      <div className={styles.header}>
        <h1>文章列表</h1>
        <Link to="/admin/articles/create">
          <Button type="primary">创建</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={articles}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={(newPagination: TablePaginationConfig) => {
          setPagination({
            current: newPagination.current || 1,
            pageSize: newPagination.pageSize || 10,
            total: pagination.total, // 保持总数不变，因为它通常来自服务器响应
          });
        }}
      />
    </div>
  );
};

export default ArticleManagement;
