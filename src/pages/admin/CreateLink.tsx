import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createLink } from '../../services/links';
import styles from '../../styles/CreateLink.module.css';

const CreateLink: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createLink(values);
      message.success('友情链接创建成功');
      navigate('/admin/links');
    } catch (error) {
      message.error('创建友情链接失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createLinkContainer}>
      <h1>创建新友情链接</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="网站名称"
          rules={[{ required: true, message: '请输入网站名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="网站链接"
          rules={[
            { required: true, message: '请输入网站链接' },
            { type: 'url', message: '请输入有效的URL' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="logo" label="Logo">
          <Upload>
            <Button icon={<UploadOutlined />}>上传Logo</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="active" label="是否激活" valuePropName="checked">
          <Switch />
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

export default CreateLink;
