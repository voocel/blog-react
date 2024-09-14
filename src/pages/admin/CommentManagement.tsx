import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getComments, deleteComment } from '../../services/comments';
import { Comment } from '../../types/comment';
import styles from '../../styles/CommentManagement.module.css';
import { TablePaginationConfig } from 'antd/lib/table';

const CommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const fetchComments = async (page: number = 1, pageSize: number = 10) => {
    setLoading(true);
    try {
      const { data, total } = await getComments(page, pageSize);
      setComments(data);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      message.error('获取评论列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchComments(newPagination.current, newPagination.pageSize);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteComment(id);
      message.success('评论删除成功');
      fetchComments(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('删除评论失败');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Comment) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => {/* 实现编辑功能 */}}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条评论吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.commentManagement}>
      <h1>评论管理</h1>
      <Table
        columns={columns}
        dataSource={comments}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default CommentManagement;
