import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Switch, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUsers, deleteUser, updateUserStatus } from '../../services/users';
import { User } from '../../types/user';
import styles from '../../styles/UserManagement.module.css';
import { Link } from 'react-router-dom';
import { TablePaginationConfig } from 'antd/es/table';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, total } = await getUsers(pagination.current || 1, pagination.pageSize || 10);
      setUsers(data);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      message.success('用户删除成功');
      fetchUsers();
    } catch (error) {
      message.error('用户删除失败');
    }
  };

  const handleStatusChange = async (id: number, status: boolean) => {
    try {
      await updateUserStatus(id, status);
      message.success('用户状态更新成功');
      fetchUsers(); // 重新获取用户列表以更新状态
    } catch (error) {
      console.error('Failed to update user status:', error);
      message.error('更新用户状态失败');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱地址',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: User) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
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
      render: (_: any, record: User) => (
        <div className={styles.actionButtons}>
          <Link to={`/admin/users/edit/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small" />
          </Link>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.userManagement}>
      <div className={styles.header}>
        <h1>用户列表</h1>
        <Link to="/admin/users/create">
          <Button type="primary">创建</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={users}
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

export default UserManagement;
