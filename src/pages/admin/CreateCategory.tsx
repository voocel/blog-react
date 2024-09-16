import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/CreateCategory.module.css';

const { TextArea } = Input;

const CreateCategory: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // 这里应该调用API来创建分类
      console.log('创建分类:', values);
      message.success('分类创建成功');
      navigate('/admin/categories');
    } catch (error) {
      message.error('创建分类失败');
    }
  };

  return (
    <div className={styles.createCategory}>
      <h1>创建分类</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <Form.Item
          name="name"
          label="分类名字"
          rules={[{ required: true, message: '请输入分类名字' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="slug"
          label="别名"
          rules={[{ required: true, message: '请输入别名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
        >
          <TextArea rows={4} placeholder="Please Input Category's Description" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
          <Button onClick={() => navigate('/admin/categories')} style={{ marginLeft: 8 }}>
            返回
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;
