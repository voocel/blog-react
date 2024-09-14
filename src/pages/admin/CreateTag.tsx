import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createTag } from '../../services/tags';
import styles from '../../styles/CreateTag.module.css';

const CreateTag: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string }) => {
    setLoading(true);
    try {
      await createTag({ name: values.name });
      message.success('标签创建成功');
      navigate('/admin/tags');
    } catch (error) {
      message.error('创建标签失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createTagContainer}>
      <h1>创建新标签</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="标签名称"
          rules={[{ required: true, message: '请输入标签名称' }]}
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

export default CreateTag;
