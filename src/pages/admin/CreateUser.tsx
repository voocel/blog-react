import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/CreateUser.module.css';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // 这里添加创建用户的逻辑
  };

  return (
    <div className={styles.createUserContainer}>
      <div className={styles.header}>
        <h1>创建用户</h1>
        <Button onClick={() => navigate('/admin/users')}>返回</Button>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.formWrapper}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱地址' }]}>
            <Input placeholder="邮箱" />
          </Form.Item>
          <Form.Item name="nickname" label="昵称">
            <Input placeholder="昵称" />
          </Form.Item>
          <Form.Item name="website" label="网站地址">
            <Input placeholder="网站地址" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="描述" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不匹配'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="确认密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              创建
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateUser;
