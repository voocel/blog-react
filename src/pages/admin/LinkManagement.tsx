import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space } from 'antd';  // 添加 Space 导入
import { useNavigate } from 'react-router-dom';
import { getLinks, deleteLink } from '../../services/links';  // 确保已经创建了这些函数
import { LinkItem } from '../../types/link';  // 确保已经定义了这个类型
import { TablePaginationConfig } from 'antd/es/table';
import { ColumnsType } from 'antd/es/table';
import styles from '../../styles/LinkManagement.module.css';
import { useSidebar } from '../../contexts/SidebarContext';

interface ContextType {
  collapsed: boolean;
  toggle: () => void;
}

const LinkManagement: React.FC = () => {
  const navigate = useNavigate();
  const { collapsed, toggleSidebar } = useSidebar();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchLinks();
  }, [pagination.current, pagination.pageSize]);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const { data, total } = await getLinks(pagination.current || 1, pagination.pageSize || 10);
      setLinks(data);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      message.error('获取友链列表失败');
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<LinkItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="链接图片" className={styles.linkImage} />,
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '链接',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '显示顺序',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record.id)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (id: number) => {
    navigate(`/admin/links/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLink(id);
      message.success('友链删除成功');
      fetchLinks();
    } catch (error) {
      message.error('删除友链失败');
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
      total: pagination.total,
    });
  };

  const handleCreate = () => {
    navigate('/admin/links/create');
  };

  return (
    <div className={styles.linkManagement}>
      <div className={styles.pageHeader}>
        <h1>友链列表</h1>
        <Button type="primary" onClick={handleCreate}>创建</Button>
      </div>
      <Table
        columns={columns}
        dataSource={links}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default LinkManagement;
