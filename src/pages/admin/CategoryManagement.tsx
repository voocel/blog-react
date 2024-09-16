import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categories';
import { Category } from '../../types/category';
import styles from '../../styles/CategoryManagement.module.css';
import { useNavigate } from 'react-router-dom';

const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories(pagination.current || 1, pagination.pageSize || 10);
      setCategories(response.data);
      setPagination(prev => ({ ...prev, total: response.total }));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      message.error('获取分类列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [pagination.current, pagination.pageSize]);

  const showModal = (category?: Category) => {
    setEditingCategory(category || null);
    setModalVisible(true);
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await updateCategory(editingCategory.id, values);
        message.success('分类更新成功');
      } else {
        await createCategory(values);
        message.success('分类创建成功');
      }
      setModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      message.success('分类删除成功');
      fetchCategories();
    } catch (error) {
      message.error('分类删除失败');
    }
  };

  const handleCreate = () => {
    navigate('/admin/categories/create');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
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
      render: (_: any, record: Category) => (
        <div className={styles.actionButtons}>
          <Link to={`/admin/categories/edit/${record.id}`}>
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
    <div className={styles.categoryManagement}>
      <div className={styles.header}>
        <h1>分类管理</h1>
        <Button type="primary" onClick={handleCreate}>创建分类</Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
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
        title={editingCategory ? "编辑分类" : "创建分类"}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="名字"
            rules={[{ required: true, message: '请输入分类名' }]}
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

export default CategoryManagement;
