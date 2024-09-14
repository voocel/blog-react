import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space } from 'antd';
import { getLinks, createLink, updateLink, deleteLink } from '../../services/links';
import { LinkItem } from '../../types/link';
import { Link } from 'react-router-dom';
import { TablePaginationConfig } from 'antd/es/table';
import { ColumnsType } from 'antd/es/table';
import styles from '../../styles/LinkManagement.module.css';

const LinkManagement: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [form] = Form.useForm();
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
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    // ... 其他列
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Button onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: LinkItem) => {
    setEditingLink(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLink(id);
      message.success('友链删除成功');
      fetchLinks(); // 重新获取友链列表
    } catch (error) {
      message.error('删除友链失败');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingLink) {
        // 更新现有友链
        await updateLink(editingLink.id, values);
        message.success('友链更新成功');
      } else {
        // 创建新友链
        await createLink(values);
        message.success('友链创建成功');
      }
      setIsModalVisible(false);
      setEditingLink(null);
      form.resetFields();
      fetchLinks(); // 重新获取友链列表
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
      total: pagination.total,
    });
  };

  return (
    <div className={styles.linkManagement}>
      <div className={styles.header}>
        <h1>友链列表</h1>
        <Link to="/admin/links/create">
          <Button type="primary">创建</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={links}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title={editingLink ? "编辑友链" : "创建友链"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingLink(null);
        }}
      >
        {/* ... 表单内容保持不变 ... */}
      </Modal>
    </div>
  );
};

export default LinkManagement;
