import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getTags, createTag, updateTag, deleteTag } from '../../services/tags';
import { Tag } from '../../types/tag';
import styles from '../../styles/TagManagement.module.css';
import { Link } from 'react-router-dom';
import { TablePaginationConfig } from 'antd/es/table';

const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchTags();
  }, [pagination.current, pagination.pageSize]);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const { data, total } = await getTags(pagination.current || 1, pagination.pageSize || 10);
      setTags(data);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      message.error('获取标签列表失败');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (tag?: Tag) => {
    setEditingTag(tag || null);
    setIsModalVisible(true);
    if (tag) {
      form.setFieldsValue(tag);
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTag) {
        await updateTag(editingTag.id, values);
        message.success('标签更新成功');
      } else {
        await createTag(values);
        message.success('标签创建成功');
      }
      setIsModalVisible(false);
      fetchTags();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTag(id);
      message.success('标签删除成功');
      fetchTags();
    } catch (error) {
      message.error('标签删除失败');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标签',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
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
      render: (_: any, record: Tag) => (
        <div className={styles.actionButtons}>
          <Link to={`/admin/tags/edit/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small" />
          </Link>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.tagManagement}>
      <div className={styles.header}>
        <h1>标签列表</h1>
        <Link to="/admin/tags/create">
          <Button type="primary">创建</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={tags}
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
      <Modal
        title={editingTag ? "编辑标签" : "创建标签"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="标签"
            rules={[{ required: true, message: '请输入标签名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagManagement;
