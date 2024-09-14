import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      await register(values.username, values.email, values.password);
      message.success('注册成功');
      navigate('/login');
    } catch (error) {
      message.error('注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]} >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]} >
        <Input placeholder="邮箱" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
