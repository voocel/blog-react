import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../services/categories';
import { Category } from '../../types/category';
import styles from '../../styles/CreateCategory.module.css';

const CreateCategory: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { name: string }) => {
    setLoading(true);
    try {
      await createCategory({ name: values.name });
      message.success('分类创建成功');
      navigate('/admin/categories');
    } catch (error) {
      message.error('创建分类失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createCategoryContainer}>
      <h1>创建新分类</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;
