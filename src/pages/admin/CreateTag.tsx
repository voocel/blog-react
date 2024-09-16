import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/CreateTag.module.css';

const CreateTag: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // 这里添加创建标签的逻辑
  };

  const handleReturn = () => {
    navigate('/admin/tags');
  };

  return (
    <div className={styles.createTagContainer}>
      <div className={styles.header}>
        <h1>创建标签</h1>
        <Button onClick={handleReturn}>返回</Button>
      </div>
      <Divider />
      <div className={styles.formWrapper}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item
            name="name"
            label="标签"
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input placeholder="标签" />
          </Form.Item>
          <Form.Item
            name="slug"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="标题" />
          </Form.Item>
          <Form.Item name="description" label="主要描述">
            <Input.TextArea placeholder="主要描述" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateTag;
